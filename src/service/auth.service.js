import prismaClient from "../db/db";
import LoginUserResponse from "../dtos/login-user-response.dto";
import RegisterUserResponse from "../dtos/register-user-response.dto";
import BadRequestError from "../error/bad-request.error";
import InternalServerError from "../error/internal-server.error";
import NotFoundError from "../error/not-found.error";
import { comparePasswordHash, generateAccessToken, generatePasswordHash, generateRefreshToken } from "../util/auth.util";

export const registerUser = async (registerUserDto) => {
  const { fullname, dob, gender, email, username, password } = registerUserDto;

  // check the exitence of "email" and "username" separately
  const existingUser = await prismaClient.user.findFirst({
    where: {
      OR: [
        { email },
        { username },
      ]
    },
    select: { id: true }
  });
  if (existingUser) {
    throw new BadRequestError("User already exists.");
  }

  // generate a password hash
  const passwordHash = await generatePasswordHash(password);

  // register the new user
  const newUser = await prismaClient.user.create({
    data: {
      fullname,
      email,
      username,
      dob,
      gender: gender === "M" ? 1 : 0,
      credential: {
        create: {
          passwordHash,
          refreshToken: ""
        }
      }
    }
  });
  if (!newUser) {
    throw new InternalServerError("An internal error occurred while registering the user. Please try again later.");
  }

  return new RegisterUserResponse();
}

export const loginUser = async (loginUserDto) => {
  const { username, password } = loginUserDto;

  // check if the user exists
  const userExists = await prismaClient.user.findFirst({
    where: {
      username
    },
    include: {
      credential: true,
    }
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
}