import HttpStatusCodes from "../enums/http-status-codes.enum";

export default class FollowUserResponse {
  constructor(userToFollow) {
    this.statusCode = HttpStatusCodes.OK;
    this.message = `You are now following ${userToFollow}`;
  }
};