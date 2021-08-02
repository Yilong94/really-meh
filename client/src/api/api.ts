import axios from "axios";

import { CurrentPost } from "../entities/CurrentPost";
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

// export const fetchRecentPosts = async (limit: number, offset: number) => {
//   try {
//     const res = await axios.post(
//       routes.POSTS,
//       {
//         limit,
//         offset,
//       },
//       {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return res.data;
//   } catch (err) {
//     throw err;
//   }
// };

// export const fetchSimilarPosts = async (searchValue: string) => {
//   try {
//     const res = await axios.post(
//       routes.POSTS,
//       {
//         search: searchValue,
//       },
//       {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return res.data;
//   } catch (err) {
//     throw err;
//   }
// };

export const fetchPosts = async (
  search?: string,
  page?: number
): Promise<CurrentPost[]> => {
  console.log("search", search);
  console.log("page", page);
  try {
    // const params = new URLSearchParams({
    //   ...(search && { search }),
    //   ...(limit && { limit }),
    //   ...(offset && { offset }),
    // });

    // const res = await axios.get(`${routes.POSTS}?${params.toString()}`, {
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // });

    // TODO: Remove mock data
    const res = {
      data: [
        {
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
          comments: [
            {
              commentId: "3449a397-71ea-4230-8bae-2b2563bcabd7",
              creator: "Gary Lim",
              createdAt: "2021-01-12T10:00:00",
              content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel orci ultrices sapien. Morbi malesuada nisi, id tincidunt morbi. Id nibh tincidunt lacinia a ut quis pretium urna elit. Feugiat dolor vitae facilisi scelerisque nec egestas sed ac, sit. Lectus sagittis congue in eu aliquet massa lobortis sed.",
              upVote: 213,
              downVote: 23,
              selfVote: "upVote",
            },
          ],
        },
        {
          postId: "3449a397-71ea-4230-8bae-2b2563bcabd7",
          creator: "Angelina Than Xiao Mei",
          createdAt: "2021-01-11T10:00:00",
          title: "Poll title",
          tags: ["COVID-19"],
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien odio vel tellus etiam vel pellentesque risus malesuada et. Ac feugiat tortor, at condimentum purus elit dui. Sit id in massa mattis at neque. Ultricies et nisl sit id viverra volutpat .....",
          poll: {
            data: {
              true: 0.2,
              "sw true": 0.3,
              "sw false": 0.4,
              false: 0.1,
            },
            hasVoted: true,
          },
          numComment: 123,
          comments: [
            {
              commentId: "3449a397-71ea-4230-8bae-2b2563bcabd7",
              creator: "Gary Lim",
              createdAt: "2021-01-12T10:00:00",
              content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel orci ultrices sapien. Morbi malesuada nisi, id tincidunt morbi. Id nibh tincidunt lacinia a ut quis pretium urna elit. Feugiat dolor vitae facilisi scelerisque nec egestas sed ac, sit. Lectus sagittis congue in eu aliquet massa lobortis sed.",
              upVote: 213,
              downVote: 23,
              selfVote: "upVote",
            },
          ],
        },
        {
          postId: "3449a397-71ea-4230-8bae-2b2563bcabd7",
          creator: "Angelina Than Xiao Mei",
          createdAt: "2021-01-11T10:00:00",
          title: "Poll title",
          tags: ["COVID-19"],
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien odio vel tellus etiam vel pellentesque risus malesuada et. Ac feugiat tortor, at condimentum purus elit dui. Sit id in massa mattis at neque. Ultricies et nisl sit id viverra volutpat .....",
          poll: {
            data: {
              true: 0.2,
              "sw true": 0.3,
              "sw false": 0.4,
              false: 0.1,
            },
            hasVoted: false,
          },
          numComment: 123,
          comments: [
            {
              commentId: "3449a397-71ea-4230-8bae-2b2563bcabd7",
              creator: "Gary Lim",
              createdAt: "2021-01-12T10:00:00",
              content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel orci ultrices sapien. Morbi malesuada nisi, id tincidunt morbi. Id nibh tincidunt lacinia a ut quis pretium urna elit. Feugiat dolor vitae facilisi scelerisque nec egestas sed ac, sit. Lectus sagittis congue in eu aliquet massa lobortis sed.",
              upVote: 213,
              downVote: 23,
              selfVote: "upVote",
            },
          ],
        },
      ],
    };

    await delay(3000);

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

    // TODO: Remove mock data
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

    // TODO: Remove mock data
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
