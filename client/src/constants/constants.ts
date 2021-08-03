export const POLL_QUESTION = "To what extent is this piece of news true?";
export const POLL_VIEW_RESULT_ANSWER = "I just want to view the results";
export const POLL_VIEW_RESULT_KEY = "na";

export enum ReactQueryKey {
  OFFICIAL_STATEMENTS = "OFFICIAL_STATEMENTS",
  POST = "POST",
  RATE_POST = "RATE_POST",
  COMMENT_POST = "COMMENT_POST",
  POSTS = "POSTS",
  COMMENTS = "COMMENTS",
  VOTE_COMMENT = "VOTE_COMMENT",
}

export enum SortBy {
  TOP = "Top",
  BOTTOM = "Bottom",
}

export const fakeNewsPollLabelMap: { [key: string]: string } = {
  true: "True",
  "sw true": "Somewhat True",
  "sw false": "Somewhat False",
  false: "False",
};

export const categoriesKeyValueMap: { [key: string]: string } = {
  "covid-19": "COVID-19",
  "ministry of health": "MINISTRY OF HEALTH",
};
