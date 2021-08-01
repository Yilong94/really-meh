export const POLL_QUESTION = "To what extent is this piece of news true?";
export const POLL_VIEW_RESULT_ANSWER = "I just want to view the results";
export const POLL_VIEW_RESULT_KEY = "na";

export enum ReactQueryKey {
  OFFICIAL_STATEMENTS = "OFFICIAL_STATEMENTS",
  POST = "POST",
  RATE_POSTS = "RATE_POST",
}

export const fakeNewsPollLabelMap: { [key: string]: string } = {
  true: "True",
  "sw true": "Somewhat True",
  "sw false": "Somewhat False",
  false: "False",
};
