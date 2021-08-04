export const POLL_QUESTION = "To what extent is this piece of news true?";
export const POLL_VIEW_RESULT_ANSWER = "I just want to view the results";
export const POLL_VIEW_RESULT_KEY = "na";

export enum ReactQueryKey {
  OFFICIAL_STATEMENTS = "OFFICIAL_STATEMENTS",
  POST = "POST",
  POSTS = "POSTS",
  COMMENTS = "COMMENTS",

  CREATE_POST = "CREATE_POST",
  RATE_POST = "RATE_POST",
  COMMENT_POST = "COMMENT_POST",
  VOTE_COMMENT = "VOTE_COMMENT",
}

export enum SortBy {
  TOP = "Top",
  BOTTOM = "Bottom",
}

export const fakeNewsPollLabelMap: { [key: string]: string } = {
  TR: "True",
  SW_TR: "Somewhat True",
  SW_FSE: "Somewhat False",
  FSE: "False",
};

export const initialRating = {
  TR: 0,
  SW_TR: 0,
  SW_FSE: 0,
  FSE: 0,
};

export const categoriesKeyValueMap: { [key: string]: string } = {
  "covid-19": "COVID-19",
  "ministry of health": "MINISTRY OF HEALTH",
};
