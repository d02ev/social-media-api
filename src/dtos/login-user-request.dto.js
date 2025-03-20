export default class LoginUserRequest {
  constructor(req) {
    this.username = req.body.username;
    this.password = req.body.password;
  }
}