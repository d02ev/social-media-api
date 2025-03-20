import { decodeAccessToken } from "../util/auth.util";

const authHandler = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({
			statusCode: 401,
			message: "Token invalid or not present",
		});
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = decodeAccessToken(token);
		req.user = decoded;
		next();
	// eslint-disable-next-line no-unused-vars
	} catch (err) {
		return res.status(401).json({
			statusCode: 401,
			message: "Invalid token",
		});
	}
};

export default authHandler;
