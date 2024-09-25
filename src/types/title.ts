export interface Title {
  sections: PlainNode[];
}

export interface PlainNode {
  spans: Span[];
  indent: number;
  quoted: boolean;
  type: "plain";
  is_rtl: boolean;
}

export interface Span {
  text: string;
  modifiers: Modifiers;
}

export interface Modifiers {
  math?: boolean;
}

export function isPlainNode(node: PlainNode): node is PlainNode {
  return node.type === "plain";
}
