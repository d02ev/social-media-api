import HttpStatusCodes from "../enums/http-status-codes.enum";

export default class RefreshAccessTokenResponse {
  constructor(newAccessToken) {
    this.statusCode = HttpStatusCodes.OK;
    this.accessToken = newAccessToken;
  }
};