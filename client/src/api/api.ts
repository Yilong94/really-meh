import axios from "axios";

import { Comment, CommentVote } from "../entities/Comment";
import { Post } from "../entities/Post";
import { Rating } from "../entities/Rating";
import { delay } from "../utils";
import * as routes from "./routes";

export const fetchOfficialStatements = async () => {
  try {
    const res = await axios.get(routes.officialStatementsRoute, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

interface FetchPostsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}

export const fetchPosts = async (
  userId: number,
  postId?: number,
  search?: string,
  page?: number
): Promise<FetchPostsResponse> => {
  console.log("search", search);
  console.log("page", page);
  try {
    const params = new URLSearchParams({
      "user-id": `${userId}`,
      ...(postId && { "post-id": `${postId}` }),
      ...(search && { search }),
      ...(page && { page: `${page}` }),
    });

    const res = await axios.get(
      `${routes.fetchPostsRoute()}?${params.toString()}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const { data } = res;
    const formattedData = {
      ...data,
      results: data.results.map((result: any) => {
        return {
          ...result,
          tags: JSON.parse(result.tags),
        };
      }),
    };

    return formattedData;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const fetchComments = async (
  postId: string,
  page?: number
): Promise<Comment[]> => {
  try {
    // const params = new URLSearchParams({
    //   ...(page && { page: `${page}` }),
    // });

    // const res = await axios.get(
    //   `${routes.commentsRoute(postId)}?${params.toString()}`,
    //   {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    const res = {
      data: [
        {
          commentId: "3449a397-71ea-4230-8bae-2b2563bcabd7",
          creator: "Gary Lim",
          createdAt: "2021-01-12T10:00:00",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel orci ultrices sapien. Morbi malesuada nisi, id tincidunt morbi. Id nibh tincidunt lacinia a ut quis pretium urna elit. Feugiat dolor vitae facilisi scelerisque nec egestas sed ac, sit. Lectus sagittis congue in eu aliquet massa lobortis sed.",
          upVote: 213,
          downVote: 23,
          selfVote: CommentVote.UP_VOTE,
        },
        {
          commentId: "3449a397-71ea-4230-8bae-2b2563bcabd7",
          creator: "Gary Lim",
          createdAt: "2021-01-12T10:00:00",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel orci ultrices sapien. Morbi malesuada nisi, id tincidunt morbi. Id nibh tincidunt lacinia a ut quis pretium urna elit. Feugiat dolor vitae facilisi scelerisque nec egestas sed ac, sit. Lectus sagittis congue in eu aliquet massa lobortis sed.",
          upVote: 213,
          downVote: 23,
          selfVote: CommentVote.DOWN_VOTE,
        },
        {
          commentId: "3449a397-71ea-4230-8bae-2b2563bcabd7",
          creator: "Gary Lim",
          createdAt: "2021-01-12T10:00:00",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel orci ultrices sapien. Morbi malesuada nisi, id tincidunt morbi. Id nibh tincidunt lacinia a ut quis pretium urna elit. Feugiat dolor vitae facilisi scelerisque nec egestas sed ac, sit. Lectus sagittis congue in eu aliquet massa lobortis sed.",
          upVote: 213,
          downVote: 23,
          selfVote: CommentVote.UP_VOTE,
        },
      ],
    };

    await delay(3000);

    return res.data;
  } catch (err) {
    throw err;
  }
};

interface RatePostRequest {
  user: number;
  poll: number;
  rating: Rating;
}

interface RatePostResponse {
  data: {
    TR: number;
    SW_TR: number;
    SW_FSE: number;
    FSE: number;
  };
}

export const ratePost = async ({
  user,
  poll,
  rating,
}: RatePostRequest): Promise<RatePostResponse> => {
  try {
    const res = await axios.post(
      routes.ratePostRoute(),
      {
        user,
        poll,
        rating,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const commentPost = async ({
  userId,
  postId,
  comment,
}: {
  userId: string;
  postId: string;
  comment: string;
}) => {
  try {
    const res = await axios.post(
      routes.commentsRoute(),
      {
        user: userId,
        comment: comment,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const voteComment = async ({
  userId,
  postId,
  commentId,
  vote,
}: {
  userId: string;
  postId: string;
  commentId: string;
  vote: CommentVote;
}): Promise<{ upVote: number; downVote: number; selfVote: CommentVote }> => {
  try {
    // const res = await axios.post(
    //   routes.voteCommentRoute(postId, commentId),
    //   {
    //     user: userId,
    //     vote: vote,
    //   },
    //   {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    const res = {
      data: {
        upVote: 213,
        downVote: 24,
        selfVote: CommentVote.DOWN_VOTE,
      },
    };

    await delay(3000);

    return res.data;
  } catch (err) {
    throw err;
  }
};

interface CreatePostRequest {
  creatorUser: number;
  title: string;
  content: string;
  tags: string[];
}

interface CreatePostResponse {
  title: string;
  content: string;
  creatorUser: string;
  publishedAt: string;
}

export const createPost = async ({
  creatorUser,
  title,
  content,
  tags,
}: CreatePostRequest): Promise<CreatePostResponse> => {
  try {
    const res = await axios.post(
      routes.createPostRoute(),
      {
        creatorUser,
        title,
        content,
        tags,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};
