export const API_PREPEND = "/api";

export const officialStatementsRoute = API_PREPEND + "/official-statements";
export const postsRoute = API_PREPEND + "/posts";
export const postRoute = (postId: string): string =>
  API_PREPEND + `/posts/${postId}`;
export const ratePostRoute = (postId: string): string =>
  API_PREPEND + `/posts/${postId}/rating`;
export const commentsRoute = (postId: string): string =>
  API_PREPEND + `/posts/${postId}/comments`;
export const voteCommentRoute = (postId: string, commentId: string): string =>
  API_PREPEND + `/posts/${postId}/comments/${commentId}/vote`;
