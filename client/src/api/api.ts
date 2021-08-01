import { delay } from "../utils";
import * as routes from "./routes";

export const fetchOfficialStatements = async () => {
  try {
    const res = await fetch(routes.OFFICIAL_STATEMENTS, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const fetchRecentPosts = async (limit: number, offset: number) => {
  try {
    const res = await fetch(routes.POSTS, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        limit,
        offset,
      }),
    });

    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const fetchSimilarPosts = async (searchValue: string) => {
  try {
    const res = await fetch(routes.POSTS, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: searchValue,
      }),
    });

    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const fetchPost = async (postId: string) => {
  try {
    // const res = await fetch(routes.post(postId), {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // });

    const res = {
      json: () => ({
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
      }),
    };

    return await res.json();
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
}) => {
  try {
    // const res = await fetch(routes.ratePosts(postId), {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     user: userId,
    //     label: labelKey,
    //   }),
    // });

    const res = {
      json: () => ({
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
      }),
    };

    await delay(3000);

    return await res.json();
  } catch (err) {
    throw err;
  }
};
