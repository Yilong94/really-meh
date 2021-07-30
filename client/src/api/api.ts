import * as routes from "./routes";

export const fetchOfficialStatements = async () => {
  try {
    const res = await fetch(routes.officialStatements);

    return await res.json();
  } catch (err) {
    throw err;
  }
};
