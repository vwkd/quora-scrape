import {
  type Content,
  isHorizontalRuleNode,
  isHyperlinkEmbedNode,
  isImageNode,
  isOrderedListNode,
  isPlainNode,
  isTweetNode,
  isUnorderedListNode,
  isVideoNode,
  isYtEmbedNode,
  type Node,
  type PlainSpan,
} from "../types/content.ts";

/**
 * Parse answer content to markdown
 *
 * @param contentString answer content as JSON string
 * @returns answer content as markdown
 */
// todo: handle `quoted: true`, possibly also for other node types
export function parseContent(contentString: string): string {
  const content: Content = JSON.parse(contentString);

  let markdown = "";

  for (const node of content.sections) {
    const md = parseNode(node);

    markdown += md + "\n\n";
  }

  return markdown;
}

/**
 * Parse answer content node to markdown
 *
 * @param node answer content node
 * @returns answer content node as markdown
 */
function parseNode(node: Node): string {
  if (isPlainNode(node)) {
    let markdown = "";

    for (const span of node.spans) {
      markdown += parseSpan(span);
    }

    return markdown;
  } else if (isUnorderedListNode(node)) {
    let markdown = "";

    for (const span of node.spans) {
      markdown += `- ${parseSpan(span)}\n`;
    }

    return markdown;
  } else if (isOrderedListNode(node)) {
    let markdown = "";

    for (const [index, span] of node.spans.entries()) {
      markdown += `${index + 1}. ${parseSpan(span)}\n`;
    }

    return markdown;
  } else if (isImageNode(node)) {
    let markdown = "";

    for (const span of node.spans) {
      const url = span.modifiers.image;

      // note: no alt text provided
      markdown += `![](${url})`;
    }

    return markdown;
  } else if (
    isHyperlinkEmbedNode(node) || isTweetNode(node) || isYtEmbedNode(node)
  ) {
    let markdown = "";

    for (const span of node.spans) {
      const { url, title } = span.modifiers.embed;

      // note: no alt text provided
      markdown += `![${title ?? ""}](${url})`;
    }

    return markdown;
  } else if (isHorizontalRuleNode(node)) {
    return `---\n\n`;
  } else if (isVideoNode(node)) {
    let markdown = "";

    for (const span of node.spans) {
      const jwplayer_id = span.modifiers.video.jwplayer_id;
      const url =
        `https://content.jwplatform.com/videos/${jwplayer_id}-720.mp4`;

      // note: no alt text provided
      markdown += `![](${url})`;
    }

    return markdown;
  } else {
    throw new Error(`Unknown answer content node type: ${node.type}`);
  }
}

/**
 * Parse answer content span to markdown
 *
 * @param span answer content span
 * @returns answer content span as markdown
 */
// todo: is link and citation indeed exclusive?
function parseSpan(span: PlainSpan): string {
  const text = span.text;
  const modifiers = span.modifiers;
  const link = modifiers.link;
  const link_url = link?.url;
  const citation = modifiers.citation;
  const citation_url = citation?.target.url;
  const citation_title = citation?.title;

  const space = text.trim() ? "" : text;

  let markdown = text.trim()
    ? text
    : link
    ? link_url!
    : citation
    ? citation_title!
    : text;

  if (modifiers.italic) {
    markdown = `_${markdown}_`;
  }

  if (modifiers.bold) {
    markdown = `**${markdown}**`;
  }

  if (link) {
    markdown = `[${markdown}](${link_url})`;
  } else if (citation) {
    // todo: maybe make quote instead of anchor?
    markdown = `[${markdown}](${citation_url})`;
  }

  return space + markdown;
}
