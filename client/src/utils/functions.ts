import { SESSION_TOKEN_KEY } from "../constants";
import { SessionToken } from "../entities/SessionToken";

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const setSessionToken = (sessionToken: SessionToken): void => {
  sessionStorage.setItem(SESSION_TOKEN_KEY, JSON.stringify(sessionToken));
};

export const getSessionToken = (): SessionToken => {
  const sessionToken = sessionStorage.getItem(SESSION_TOKEN_KEY);
  return sessionToken ? JSON.parse(sessionToken) : null;
};
