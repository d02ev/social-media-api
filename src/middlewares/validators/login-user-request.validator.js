import { body } from "express-validator";

const loginUserRequestValidator = [
	body("username")
		.notEmpty()
		.withMessage("Username is required.")
		.isAlphanumeric()
		.withMessage("Must contain only alphabets and numbers"),
	body("password").notEmpty().withMessage("Password is required."),
];

export default loginUserRequestValidator;
