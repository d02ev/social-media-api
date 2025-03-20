/* eslint-disable no-unused-vars */
import { asyncHandler } from "../util/async-handler.util";
import { followUser, unfollowUser } from "../services/connection.service";

export const follow = asyncHandler(async (req, res, next) => {
  const loggedInUserId = req.user["sub"];
  const userToFollowId = req.params["id"];
  const followUserResponse = await followUser(loggedInUserId, userToFollowId);

  return res.status(followUserResponse.statusCode).json(followUserResponse);
});

export const unfollow = asyncHandler(async (req, res, next) => {
  const loggedInUserId = req.user["sub"];
  const userToUnfollowId = req.params["id"];
  const unfollowUserResponse = await unfollowUser(loggedInUserId, userToUnfollowId);

  return res.status(unfollowUserResponse.statusCode).json(unfollowUserResponse);
});