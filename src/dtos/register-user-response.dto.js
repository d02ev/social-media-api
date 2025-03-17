import HttpStatusCodes from "../enums/http-status-codes.enum";

export default class RegisterUserResponse {
  constructor() {
    this.statusCode = HttpStatusCodes.CREATED;
    this.message = "User registered successfully!";
  }
}