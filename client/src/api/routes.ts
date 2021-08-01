export const API_PREPEND = "/api";

export const OFFICIAL_STATEMENTS = API_PREPEND + "/official-statements";
export const POSTS = API_PREPEND + "/posts";
export const post = (id: string): string => API_PREPEND + `/post/${id}`;
export const ratePosts = (id: string): string =>
  API_PREPEND + `/posts/${id}/rating`;
