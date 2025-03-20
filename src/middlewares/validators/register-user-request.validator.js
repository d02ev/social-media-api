import { body } from "express-validator";

const registerUserRequestValidator = [
	body("fullname")
		.notEmpty()
		.withMessage("Full name is required.")
		.isString()
		.withMessage("Must contain only alphabets."),
	body("dob")
		.notEmpty()
		.withMessage("Date of birth is required.")
		.isDate()
		.withMessage("Must be a valid date.")
		.toDate(),
	body("gender")
		.notEmpty()
		.withMessage("Gender is required.")
		.isString()
		.withMessage("Must contain only 'M' for male or 'F' for female."),
	body("email")
		.notEmpty()
		.withMessage("Email is required.")
		.isEmail()
		.withMessage("Must be a valid email address."),
	body("username")
		.notEmpty()
		.withMessage("Username is required.")
		.isAlphanumeric()
		.withMessage("Must contain only alphabets and numbers."),
	body("password")
		.notEmpty()
		.withMessage("Password is required.")
		.isStrongPassword({
			minLength: 8,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 1,
		})
		.withMessage(
			"Must be min 8 characters long and contain min 1 lowercase, uppercase, number and symbol."
		),
];

export default registerUserRequestValidator;
