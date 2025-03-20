import HttpStatusCodes from "../enums/http-status-codes.enum";

export default class InternalServerError extends Error {
	constructor(message) {
		super(message);
		this.statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
		this.message = message;
	}
}
