/* eslint-disable no-unused-vars */
import { asyncHandler } from "../util/async-handler.util";
import { followUser, unfollowUser } from "../services/connection.service";

export const follow = asyncHandler(async (req, res, next) => {
  const followerId = req.user["sub"];
  const followingId = req.params["id"];
  const followUserResponse = await followUser(followerId, followingId);

  return res.status(followUserResponse.statusCode).json(followUserResponse);
});

export const unfollow = asyncHandler(async (req, res, next) => {
  const followerId = req.user["sub"];
  const followingId = req.params["id"];
  const unfollowUserResponse = await unfollowUser(followerId, followingId);

  return res.status(unfollowUserResponse.statusCode).json(unfollowUserResponse);
});