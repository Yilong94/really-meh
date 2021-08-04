export const API_PREPEND = "http://localhost:8000/api";

export const officialStatementsRoute = API_PREPEND + "/official-statements";

// POLLS
export const fetchPostsRoute = (): string => API_PREPEND + "/poll/";
export const createPostRoute = (): string => API_PREPEND + `/poll/create/`;

// RATE
export const ratePostRoute = (): string => API_PREPEND + `/rating/rate/`;

// COMMENTS
export const commentsRoute = (): string => API_PREPEND + `/comment/`;

// VOTE
export const voteCommentRoute = (): string => API_PREPEND + `/vote/comment/`;
