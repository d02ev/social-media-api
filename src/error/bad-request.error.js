import HttpStatusCodes from "../enums/http-status-codes.enum";

export default class BadRequestError extends Error {
	constructor(message) {
		super(message);
		this.statusCode = HttpStatusCodes.BAD_REQUEST;
		this.message = message;
	}
}
