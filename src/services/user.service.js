import prismaClient from "../configs/db/db";
import InternalServerError from "../errors/internal-server.error";

export const fetchUserDetails = async (userId) => {
  const userDetails = await prismaClient.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
      followers: {
        select: {
          followers: {
            select: {
              username: true,
            }
          }
        }
      },
      followings: {
        select: {
          following: {
            select: {
              username: true,
            }
          }
        }
      },
      posts: {
        select: {
          title: true,
          createdAt: true,
          description: true,
        }
      },
      comments: {
        select: {
          comment: true,
        }
      },
      reactions: {
        select: {
          postId: true,
          reaction: true,
        }
      },
    }
  });
  if (!userDetails) {
    throw new InternalServerError("An internal error occurred while fetching user details. Please try again later.");
  }

  return userDetails;
};