import { Res } from "../types/res.ts";

const M_B = Deno.env.get("M_B");
const QUORA_BROADCAST_ID = Deno.env.get("QUORA_BROADCAST_ID");
const QUORA_CANARY_REVISION = Deno.env.get("QUORA_CANARY_REVISION");
const QUORA_FORMKEY = Deno.env.get("QUORA_FORMKEY");
const QUORA_PAGE_CREATION_TIME = Deno.env.get("QUORA_PAGE_CREATION_TIME");
const QUORA_REVISION = Deno.env.get("QUORA_REVISION");
const QUORA_WINDOW_ID = Deno.env.get("QUORA_WINDOW_ID");
const USER_AGENT = Deno.env.get("USER_AGENT");

if (!M_B) {
  throw new Error("Missing env var 'M_B'");
} else if (!QUORA_BROADCAST_ID) {
  throw new Error("Missing env var 'QUORA_BROADCAST_ID'");
} else if (!QUORA_CANARY_REVISION) {
  throw new Error("Missing env var 'QUORA_CANARY_REVISION'");
} else if (!QUORA_FORMKEY) {
  throw new Error("Missing env var 'QUORA_FORMKEY'");
} else if (!QUORA_PAGE_CREATION_TIME) {
  throw new Error("Missing env var 'QUORA_PAGE_CREATION_TIME'");
} else if (!QUORA_REVISION) {
  throw new Error("Missing env var 'QUORA_REVISION'");
} else if (!QUORA_WINDOW_ID) {
  throw new Error("Missing env var 'QUORA_WINDOW_ID'");
} else if (!USER_AGENT) {
  throw new Error("Missing env var 'USER_AGENT'");
}

const headers = new Headers({
  "Accept": "*/*",
  "Accept-Language": "en-US,en;q=0.9",
  "Content-Type": "application/json",
  "Cookie": `m-b=${M_B}`,
  "Quora-Broadcast-Id": QUORA_BROADCAST_ID!,
  "Quora-Canary-Revision": QUORA_CANARY_REVISION!,
  "Quora-Formkey": QUORA_FORMKEY!,
  "Quora-Page-Creation-Time": QUORA_PAGE_CREATION_TIME!,
  "Quora-Revision": QUORA_REVISION!,
  "Quora-Window-Id": QUORA_WINDOW_ID!,
  "User-Agent": USER_AGENT!,
});

const ANSWERS_URL =
  "https://de.quora.com/graphql/gql_para_POST?q=UserProfileAnswersMostRecent_RecentAnswers_Query";

/**
 * Get answers of user from API
 *
 * @param uid user ID, e.g. `123456789`
 * @param first number of answers, max. 19??
 * @param after previous answer index, beware: number as string!
 * @returns answers
 */
export async function getAnswers(
  uid: number,
  first: number,
  after: string,
): Promise<Res> {
  const body = {
    queryName: "UserProfileAnswersMostRecent_RecentAnswers_Query",
    variables: {
      uid,
      first,
      after,
      answerFilterTid: null,
    },
    extensions: {
      hash: "6ce20512009fea73009aed1ade71c7263ed203d53ee456ef78a5cab65b9eb739",
    },
  };

  const res = await fetch(ANSWERS_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Got error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  return data;
}
