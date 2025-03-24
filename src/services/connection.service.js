import prismaClient from "../configs/db/db";
import FollowUserResponse from "../dtos/follow-user-response.dto";
import UnfollowUserResponse from "../dtos/unfollow-user-response.dto";
import BadRequestError from "../errors/bad-request.error";
import InternalServerError from "../errors/internal-server.error";

export const followUser = async (followerId, followingId) => {
  // check if the logged in user already follows the given user
  const alreadyFollows = await prismaClient.connection.findUnique({
    where: {
      followerUserId_followingUserId: {
        followerUserId: followerId,
        followingUserId: followingId
      }
    }
  });
  if (alreadyFollows) {
    throw new BadRequestError("You already follow this user.");
  }

  const createFollowing = await prismaClient.connection.create({
    data: {
      followingUserId: followingId,
      followerUserId: followerId,
    }
  });
  if (!createFollowing) {
    throw new InternalServerError("An internal error occurred while following the user. Please try again later.");
  }

  // fetch the username of the user to be followed
  const userToFollowUsername = await prismaClient.user.findUnique({
    where: { id: followingId },
    select: {
      username: true
    }
  });
  if (!userToFollowUsername) {
    throw new InternalServerError("An internal error occurred while fetching the data of the user to follow. Please try again later.");
  }

  return new FollowUserResponse(userToFollowUsername.username);
};

export const unfollowUser = async (followerId, followingId) => {
  // check if the user follows the given user
  const doesFollow = await prismaClient.connection.findUnique({
    where: {
      followedUserId_followingUserId: {
        followingUserId: followingId,
        followerUserId: followerId,
      }
    }
  });
  if (!doesFollow) {
    throw new BadRequestError("Cannot unfollow a user you are not following.");
  }

  const removeFollowing = await prismaClient.connection.delete({
    where: {
      followedUserId_followingUserId: {
        followingUserId: followingId,
        followerUserId: followerId,
      }
    }
  });
  if (!removeFollowing) {
    throw new InternalServerError("An internal error occurred while unfollowing the user. Please try again later.");
  }

  const userToUnfollowUsername = await prismaClient.user.findUnique({
    where: { id: followingId },
    select: {
      username: true,
    }
  });
  if (!userToUnfollowUsername) {
    throw new InternalServerError("An internal error occurred while fetching the details of the user to unfollow. Please try again later.");
  }

  return new UnfollowUserResponse(userToUnfollowUsername.username);
}