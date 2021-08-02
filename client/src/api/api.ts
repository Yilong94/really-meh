import axios from "axios";

import { delay } from "../utils";
import * as routes from "./routes";

export const fetchOfficialStatements = async () => {
  try {
    const res = await axios.get(routes.OFFICIAL_STATEMENTS, {
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

export const fetchRecentPosts = async (limit: number, offset: number) => {
  try {
    const res = await axios.post(
      routes.POSTS,
      {
        limit,
        offset,
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

export const fetchSimilarPosts = async (searchValue: string) => {
  try {
    const res = await axios.post(
      routes.POSTS,
      {
        search: searchValue,
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

export const fetchPost = async (postId: string) => {
  try {
    // const res = await axios.get(routes.postRoute(postId), {
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // });

    const res = {
      data: {
        postId: "3449a397-71ea-4230-8bae-2b2563bcabd7",
        creator: "Angelina Than Xiao Mei",
        createdAt: "2021-01-11T10:00:00",
        title: "Poll title",
        tags: ["COVID-19"],
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien odio vel tellus etiam vel pellentesque risus malesuada et. Ac feugiat tortor, at condimentum purus elit dui. Sit id in massa mattis at neque. Ultricies et nisl sit id viverra volutpat .....",
        poll: {
          data: {
            true: 0.0,
            "sw true": 0.3,
            "sw false": 0.4,
            false: 1.0,
          },
          hasVoted: true,
        },
        numComment: 123,
      },
    };

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const ratePost = async ({
  userId,
  postId,
  labelKey,
}: {
  userId: string;
  postId: string;
  labelKey: string;
}): Promise<{ rating: { [label: string]: number } }> => {
  try {
    // const res = await axios.post(
    //   routes.ratePost(postId),
    //   {
    //     user: userId,
    //     label: labelKey,
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
        rating: {
          true: 0.0,
          "sw true": 0.3,
          "sw false": 0.4,
          false: 1.0,
        },
      },
    };

    await delay(3000);

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
      routes.commentPostRoute(postId),
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
