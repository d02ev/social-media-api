/* eslint-disable no-unused-vars */
import { asyncHandler } from "../util/async-handler.util";
import {
	loginUser,
	refreshAccessToken,
	registerUser,
} from "../services/auth.service";
import { validationResult } from "express-validator";
import RegisterUserRequest from "../dtos/register-user-request.dto";
import LoginUserRequest from "../dtos/login-user-request.dto";

const cookieOptions = {
	httpOnly: true,
	secure: false,
};

export const register = asyncHandler(async (req, res, next) => {
	const validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		return res.status(400).json({
			statusCode: 400,
			error: validationErrors.array(),
		});
	}

	const registerUserRequest = new RegisterUserRequest(req);
	const registerUserResponse = await registerUser(registerUserRequest);
	return res.status(registerUserResponse.statusCode).json(registerUserResponse);
});

export const login = asyncHandler(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({
      statusCode: 400,
      error: validationErrors.array(),
    });
  }

  const loginUserRequest = new LoginUserRequest(req);
	const loginUserResponse = await loginUser(loginUserRequest);

	res.cookie("accessToken", loginUserResponse.accessToken, cookieOptions);
	res.cookie("refreshToken", loginUserResponse.refreshToken, cookieOptions);

	return res.status(loginUserResponse.statusCode).json(loginUserResponse);
});

export const refreshToken = asyncHandler(async (req, res, next) => {
	const { refreshToken } = req.cookies;
	const refreshAccessTokenResponse = await refreshAccessToken(refreshToken);

	res.cookie(
		"accessToken",
		refreshAccessTokenResponse.accessToken,
		cookieOptions
	);

	return res
		.status(refreshAccessTokenResponse.statusCode)
		.json(refreshAccessTokenResponse);
});

export const logout = (req, res, next) => {
	res.clearCookie("accessToken", cookieOptions);
	res.clearCookie("refreshToken", cookieOptions);

	return res.status(200).json({
		statusCode: 200,
		message: "User logged out successfully.",
	});
};
