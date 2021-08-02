export const API_PREPEND = "/api";

export const OFFICIAL_STATEMENTS = API_PREPEND + "/official-statements";
export const POSTS = API_PREPEND + "/posts";
export const postRoute = (id: string): string => API_PREPEND + `/post/${id}`;
export const ratePostRoute = (id: string): string =>
  API_PREPEND + `/posts/${id}/rating`;
export const commentPostRoute = (id: string): string =>
  API_PREPEND + `/posts/${id}/comment`;
