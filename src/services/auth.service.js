import prismaClient from "../configs/db/db";
import LoginUserResponse from "../dtos/login-user-response.dto";
import RefreshAccessTokenResponse from "../dtos/refresh-access-token-response.dto";
import RegisterUserResponse from "../dtos/register-user-response.dto";
import BadRequestError from "../errors/bad-request.error";
import InternalServerError from "../errors/internal-server.error";
import NotFoundError from "../errors/not-found.error";
import {
	comparePasswordHash,
	decodeRefreshToken,
	generateAccessToken,
	generatePasswordHash,
	generateRefreshToken,
} from "../util/auth.util";
import crypto from "crypto";

export const registerUser = async registerUserRequest => {
	let { fullname, dob, gender, email, username, password } =
		registerUserRequest;

	// check the exitence of "email" and "username" separately
	const existingUser = await prismaClient.user.findFirst({
		where: {
			OR: [{ email }, { username }],
		},
		select: { id: true },
	});
	if (existingUser) {
		throw new BadRequestError("User already exists.");
	}

	// generate a password hash
	const passwordHash = await generatePasswordHash(password);

	// generate a random refresh token string so that it does not violate
	// the unique constraint
	const buffer = crypto.randomBytes(32);
	const randomRefreshToken = buffer.toString("base64");

	// register the new user
	const newUser = await prismaClient.user.create({
		data: {
			fullname,
			email,
			username,
			dob,
			gender,
			credential: {
				create: {
					passwordHash,
					refreshToken: randomRefreshToken,
				},
			},
		},
	});
	if (!newUser) {
		throw new InternalServerError(
			"An internal error occurred while registering the user. Please try again later."
		);
	}

	return new RegisterUserResponse();
};

export const loginUser = async loginUserRequest => {
	const { username, password } = loginUserRequest;

	// check if the user exists
	const userExists = await prismaClient.user.findFirst({
		where: {
			username,
		},
		include: {
			credential: true,
		},
	});
	if (!userExists) {
		throw new NotFoundError("User not found.");
	}

	// check if the password match
	const passwordHash = userExists.credential?.passwordHash;
	const passwordMatch = await comparePasswordHash(password, passwordHash);
	if (!passwordMatch) {
		throw new BadRequestError("Invalid credentials.");
	}

	// generate refresh and access token
	const accessTokenPayload = {
		sub: userExists.id,
		email: userExists.email,
	};
	const refreshTokenPayload = {
		sub: userExists.id,
	};
	const accessToken = generateAccessToken(accessTokenPayload);
	const refreshToken = generateRefreshToken(refreshTokenPayload);

	return new LoginUserResponse(accessToken, refreshToken);
};

export const refreshAccessToken = async refreshToken => {
	const decodedToken = decodeRefreshToken(refreshToken);
	if (!decodedToken) {
		throw new BadRequestError("Invalid refresh token");
	}

	const userId = decodedToken["sub"];
	const user = await prismaClient.user.findUnique({
		where: { id: userId },
		select: { email: true },
	});
	const accessTokenPayload = {
		sub: userId,
		email: user?.email,
	};
	const newAccessToken = generateAccessToken(accessTokenPayload);

	return new RefreshAccessTokenResponse(newAccessToken);
};
