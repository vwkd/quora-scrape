import { parseContent } from "./content.ts";
import { parseTitle } from "./title.ts";
import type { Node } from "../types/res.ts";

const formatter = new Intl.DateTimeFormat("de-DE", {
  dateStyle: "medium",
  timeStyle: "short",
});

/**
 * Parse response to markdown
 *
 * @param nodes nodes from response
 * @returns markdown string
 */
export function parse(nodes: Node[]): string {
  console.debug(`Parsing answers`);

  let markdown = "# Answers\n\n";

  for (const { url, content, question, creationTime, updatedTime } of nodes) {
    const question_url = question.url;
    const question_title = question.title;

    const title = parseTitle(question_title);
    const body = parseContent(content);

    const creationDate = new Date(creationTime / 1000);
    const updatedDate = new Date(updatedTime / 1000);

    markdown += `## [${title}](${question_url})\n\n`;
    markdown += `[Answered on ${formatter.format(creationDate)}${
      updatedTime ? `, last updated on ${formatter.format(updatedDate)}` : ""
    }](${url})\n\n`;
    markdown += `${body}`;
  }

  return markdown;
}
