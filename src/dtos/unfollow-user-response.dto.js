import HttpStatusCodes from "../enums/http-status-codes.enum";

export default class UnfollowUserResponse {
  constructor(userToUnfollow) {
    this.statusCode = HttpStatusCodes.OK;
    this.message = `You have unfollowed ${userToUnfollow}`;
  }
};