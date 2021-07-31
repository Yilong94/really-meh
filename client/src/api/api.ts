import * as routes from "./routes";

export const fetchOfficialStatements = async () => {
  try {
    const res = await fetch(routes.OFFICIAL_STATEMENTS);

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
        searchValue,
      }),
    });

    return await res.json();
  } catch (err) {
    throw err;
  }
};
