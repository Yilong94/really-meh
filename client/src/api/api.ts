import axios from "axios";

import { Comment } from "../entities/Comment";
import { Post } from "../entities/Post";
import { Rating } from "../entities/Rating";
import { Vote } from "../entities/Vote";
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
////////////////////////////////
// POLLS
////////////////////////////////
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
      ...(postId && { "poll-id": `${postId}` }),
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

////////////////////////////////
// RATE
////////////////////////////////
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

////////////////////////////////
// COMMENTS
////////////////////////////////

interface FetchCommentsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Comment[];
}

export const fetchComments = async (
  userId: number,
  postId: number,
  page?: number
): Promise<FetchCommentsResponse> => {
  try {
    const params = new URLSearchParams({
      "user-id": `${userId}`,
      "poll-id": `${postId}`,
      ...(page && { page: `${page}` }),
    });

    const res = await axios.get(
      `${routes.fetchCommentsRoute()}?${params.toString()}`,
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

interface commentPollRequest {
  userId: number;
  pollId: string;
  content: string;
}

export const commentPoll = async ({
  userId,
  pollId,
  content,
}: commentPollRequest): Promise<void> => {
  try {
    const res = await axios.post(
      routes.createCommentRoute(),
      {
        user: userId,
        poll: pollId,
        content,
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

////////////////////////////////
// VOTE
////////////////////////////////

interface VoteCommentRequest {
  user: number;
  comment: number;
  direction: Vote;
}

interface VoteCommentResponse {
  data: {
    UP: number;
    DWN: number;
  };
}

export const voteComment = async ({
  user,
  comment,
  direction,
}: VoteCommentRequest): Promise<VoteCommentResponse> => {
  try {
    const res = await axios.post(
      routes.voteCommentRoute(),
      {
        user,
        comment,
        direction,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = res;
    const formattedData = {
      data: {
        UP: data.data["number_of_upvotes"],
        DWN: data.data["number_of_downvotes"],
      },
    };

    return formattedData;
  } catch (err) {
    throw err;
  }
};
