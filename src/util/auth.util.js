import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";

export const generatePasswordHash = async password => {
	const hashRounds = Number(process.env.HASH_ROUNDS) || 10;
	return await hash(password, hashRounds);
};

export const comparePasswordHash = async (password, hash) => {
	return await compare(password, hash);
};

export const generateAccessToken = payload => {
	const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
	const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY;

	return sign(payload, accessTokenSecret, {
		expiresIn: `${accessTokenExpiry}m`,
	});
};

export const generateRefreshToken = payload => {
	const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
	const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY;

	return sign(payload, refreshTokenSecret, {
		expiresIn: `${refreshTokenExpiry}D`,
	});
};

export const decodeAccessToken = token => {
	const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
	return verify(token, accessTokenSecret);
};

export const decodeRefreshToken = token => {
	const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
	return verify(token, refreshTokenSecret);
};
