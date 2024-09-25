import { join } from "@std/path";
import { getAnswers } from "./answers.ts";
import type { Node, Res } from "../types/res.ts";

const MAX_ANSWERS = 10;

/**
 * Load answers of user
 *
 * - loads from disk if cached
 * - otherwise fetches from API and caches to disk
 *
 * @param uid user ID
 * @param cache_dir directory to cache answers
 * @returns list of nodes
 */
export async function load(uid: number, cache_dir: string): Promise<Node[]> {
  console.debug(`Loading answers`);

  await Deno.mkdir(cache_dir, { recursive: true });

  const nodes: Node[] = [];

  let cursor = "0";
  for (let i = 0;; i += 1) {
    const filename = `${MAX_ANSWERS}_part${i}.json`;

    const filepath = join(cache_dir, filename);

    let res: Res;

    try {
      const resString = await Deno.readTextFile(filepath);

      console.debug(`Skipping page ${i} since already cached`);

      res = JSON.parse(resString);
    } catch (e) {
      if (!(e instanceof Deno.errors.NotFound)) {
        throw new Error(`Can't reading cache file: ${filepath}`);
      }

      console.debug(`Fetching answers page ${i}`);

      res = await getAnswers(uid, MAX_ANSWERS, cursor);

      await Deno.writeTextFile(filepath, JSON.stringify(res));
    }

    const conn = res.data.user.recentPublicAndPinnedAnswersConnection!;

    const pageInfo = conn.pageInfo;
    cursor = pageInfo.endCursor;

    if (!pageInfo.hasNextPage) {
      break;
    }

    const edges = conn.edges;

    const nodesChunk = edges.map((edge) => edge.node);

    nodes.push(...nodesChunk);
  }

  return nodes;
}
