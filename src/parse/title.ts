import {
  isPlainNode,
  type PlainNode,
  type Span,
  type Title,
} from "../types/title.ts";

/**
 * Parse question title to markdown
 *
 * @param titleString question title as JSON string
 * @returns question title as markdown
 */
export function parseTitle(titleString: string): string {
  const title: Title = JSON.parse(titleString);

  let markdown = "";

  for (const node of title.sections) {
    const md = parseNode(node);

    markdown += md;
  }

  return markdown;
}

/**
 * Parse question title node to markdown
 *
 * @param node question title node
 * @returns question title node as markdown
 */
function parseNode(node: PlainNode): string {
  if (isPlainNode(node)) {
    let markdown = "";

    for (const span of node.spans) {
      markdown += parseSpan(span);
    }

    return markdown;
  } else {
    throw new Error(`Unknown question title node type: ${node.type}`);
  }
}

/**
 * Parse question title span to markdown
 *
 * @param span question title span
 * @returns question title span as markdown
 */
function parseSpan(span: Span): string {
  const text = span.text;
  const modifiers = span.modifiers;

  let markdown = text;

  if (modifiers.math) {
    markdown = `$${markdown}$`;
  }

  return markdown;
}
