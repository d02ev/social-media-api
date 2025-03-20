/* eslint-disable no-unused-vars */
import { asyncHandler } from "../util/async-handler.util";
import { fetchUserDetails } from "../services/user.service";

export const me = asyncHandler(async (req, res, next) => {
  const loggedInUserId = req.user["sub"];
  const userDetails = await fetchUserDetails(loggedInUserId);

  return res.status(200).json({
    statusCode: 200,
    data: userDetails,
  });
});