export default class RegisterUserRequest {
	constructor(req) {
		this.fullname = req.body.fullname;
		this.dob = new Date(req.body.dob).toISOString();
		this.gender = req.body.gender === "M" ? 1 : 0;
		this.email = req.body.email;
		this.username = req.body.username;
		this.password = req.body.password;
	}
}
