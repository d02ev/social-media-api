import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import BadRequestError from "../error/bad-request.error";
import InternalServerError from "../error/internal-server.error";
import logger from "../util/logger.util";


const logInternalUnknownError = (err) => {
  const stackLines = err.stack ? err.stack.split("\n") : [];
  const errorLocation = stackLines.length > 1 ? stackLines[1].trim() : "Unknown location";
  const match = errorLocation.match(/\/([^/]+):(\d+):(\d+)/);
  const filename = match ? match[1] : "Unknown file";
  const lineNumber = match ? match[2] : "Unknown line";
  const functionName = errorLocation.split("at ")[1]?.split(" ")[0] || "Unknown function";
  const logMessage = `${filename}/${functionName}:${lineNumber}`;

  logger.error(logMessage, err.message);
}

// eslint-disable-next-line no-unused-vars
const errorHandler = async (err, req, res, next) => {
  if (err instanceof BadRequestError || err instanceof InternalServerError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
    });
  }
  if (err instanceof PrismaClientKnownRequestError || err instanceof PrismaClientUnknownRequestError) {
    logInternalUnknownError(err);
    return res.status(500).json({
      statusCode: 500,
      message: "An unexpected error occurred. Please try again later."
    });
  }

  logInternalUnknownError(err);
  return res.status(500).json({
    statusCode: 500,
    message: "Something went wrong!",
  });
};

export default errorHandler;