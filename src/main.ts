import { join } from "@std/path";
import { parse } from "./parse/main.ts";
import { load } from "./api/main.ts";

const OUTPUT_DIRECTORY = "out";
const CACHE_DIRNAME = "cache";
const MARKDOWN_FILENAME = "answers.md";

const uidString = Deno.args[0];

if (!uidString) {
  throw new Error(`Expected user ID as argument`);
}

const uid = parseInt(uidString);

if (isNaN(uid) || uid < 0) {
  throw new Error(`Invalid user ID`);
}

const out_dir = join(OUTPUT_DIRECTORY, uidString);
const cache_dir = join(out_dir, CACHE_DIRNAME);

console.info(`Getting answers of user '${uid}'...`);

const nodes = await load(uid, cache_dir);

const markdown = parse(nodes);

const filepath = join(out_dir, MARKDOWN_FILENAME);

await Deno.writeTextFile(filepath, markdown);
