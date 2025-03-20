import prismaClient from "../configs/db/db";
import InternalServerError from "../errors/internal-server.error";

export const fetchUserDetails = async (loggedInUserId) => {
  const userDetails = await prismaClient.user.findUnique({
    where: { id: loggedInUserId },
    include: {
      followers: true,
      followings: true,
      posts: true,
      comments: true,
      reaction: true,
    }
  });
  if (!userDetails) {
    throw new InternalServerError("An internal error occurred while fetching user details. Please try again later.");
  }

  return userDetails;
};