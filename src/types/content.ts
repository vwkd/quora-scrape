export interface Content {
  sections: Node[];
}

export type Node =
  | PlainNode
  | ImageNode
  | HyperlinkEmbedNode
  | UnorderedListNode
  | OrderedListNode
  | HorizontalRuleNode
  | TweetNode
  | YtEmbedNode
  | VideoNode;

export interface PlainNode {
  spans: PlainSpan[];
  indent: number;
  quoted: boolean;
  type: "plain";
  is_rtl: boolean;
}

export interface UnorderedListNode {
  spans: PlainSpan[];
  indent: number;
  quoted: boolean;
  type: "unordered-list";
  is_rtl: boolean;
}

export interface OrderedListNode {
  spans: PlainSpan[];
  indent: number;
  quoted: boolean;
  type: "ordered-list";
  is_rtl: boolean;
}

export interface PlainSpan {
  text: string;
  modifiers: {
    bold?: boolean;
    italic?: boolean;
    link?: {
      type: "url" | "answer";
      url?: string;
      aid?: number;
      should_show_outbound_modal?: boolean;
    };
    citation?: {
      target: {
        type: "url";
        url: string;
      };
      title: string;
      index: number;
      unique_id: string;
    };
  };
}

export interface ImageNode {
  spans: ImageSpan[];
  indent: number;
  quoted: boolean;
  type: "image";
  is_rtl: boolean;
}

export interface ImageSpan {
  text: "";
  modifiers: {
    image: string;
    height: number;
    width: number;
    master_url: string;
    is_deleted: boolean;
    is_sensitive: boolean;
    is_uploaded_by_bot: boolean;
    dominant_color: string;
    zoomable?: boolean;
    animated_url?: string;
    should_autoplay?: boolean;
  };
}

export interface HyperlinkEmbedNode {
  spans: EmbedSpan[];
  indent: number;
  quoted: boolean;
  type: "hyperlink_embed";
  is_rtl: boolean;
}

export interface TweetNode {
  spans: EmbedSpan[];
  indent: number;
  quoted: boolean;
  type: "tweet";
  is_rtl: boolean;
}

export interface YtEmbedNode {
  spans: EmbedSpan[];
  indent: number;
  quoted: boolean;
  type: "yt-embed";
  is_rtl: boolean;
}

export interface EmbedSpan {
  text: "";
  modifiers: {
    embed: {
      url: string;
      title: string | null;
      snippet: string | null;
      image_url: string;
      type: string;
      quora_content_type: number | null;
      quora_oid: number | null;
    };
  };
}

export interface HorizontalRuleNode {
  spans: { text: ""; modifiers: {} }[];
  indent: number;
  quoted: boolean;
  type: "horizontal-rule";
  is_rtl: boolean;
}

export interface VideoNode {
  spans: {
    text: "";
    modifiers: {
      video: {
        uuid: string;
        version: number;
        jwplayer_id: string;
        is_web_upload: boolean;
        library_video: boolean;
        is_creator: boolean;
        thumb: unknown | null;
      };
    };
  }[];
  indent: number;
  quoted: boolean;
  type: "video";
  is_rtl: boolean;
}

export function isPlainNode(node: Node): node is PlainNode {
  return node.type === "plain";
}

export function isImageNode(node: Node): node is ImageNode {
  return node.type === "image";
}

export function isHyperlinkEmbedNode(node: Node): node is HyperlinkEmbedNode {
  return node.type === "hyperlink_embed";
}

export function isUnorderedListNode(node: Node): node is UnorderedListNode {
  return node.type === "unordered-list";
}

export function isOrderedListNode(node: Node): node is OrderedListNode {
  return node.type === "ordered-list";
}

export function isHorizontalRuleNode(node: Node): node is HorizontalRuleNode {
  return node.type === "horizontal-rule";
}

export function isTweetNode(node: Node): node is TweetNode {
  return node.type === "tweet";
}

export function isYtEmbedNode(node: Node): node is YtEmbedNode {
  return node.type === "yt-embed";
}

export function isVideoNode(node: Node): node is VideoNode {
  return node.type === "video";
}
