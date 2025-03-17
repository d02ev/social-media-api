import HttpStatusCodes from "../enums/http-status-codes.enum";

export default class LoginUserResponse {
  constructor(accessToken, refreshToken) {
    this.statusCode = HttpStatusCodes.OK;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

  }
};