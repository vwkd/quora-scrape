export interface Res {
  data: Data;
  broadcastId: string;
  tchannelData: TchannelData;
  extensions: Extensions;
}

export interface Extensions {
  is_final: boolean;
}

export interface TchannelData {
  minSeq: string;
  channel: string;
  channelHash: string;
  boxName: string;
  baseHost: string;
  targetUrl: string;
  enableWebsocket: boolean;
}

export interface Data {
  user: User;
}

export interface User {
  recentPublicAndPinnedAnswersConnection?:
    RecentPublicAndPinnedAnswersConnection;
  id: string;
  __typename: "User";
  uid: number;
  isEmployee?: boolean;
}

export interface RecentPublicAndPinnedAnswersConnection {
  id: string;
  __typename: string;
  pageInfo: PageInfo;
  edges: Edge[];
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

export interface Edge {
  node: Node;
  id: string;
  __typename: "AnswerEdge";
  cursor: string;
}

export interface Node {
  id: string;
  __typename: "Answer";
  contentQtextDocument: NodeContentQtextDocument;
  aid: number;
  isPinned: boolean;
  viewerHasAccess: boolean;
  isSoftCollapsed: boolean;
  question: Question;
  viewHash: string;
  isMachineAnswer: boolean;
  isSelectedForDigestClickthroughSurvey: boolean;
  permaUrl: string;
  isVisibleToViewer: boolean;
  viewerIsAuthor: boolean;
  content: string;
  isShortContent: boolean;
  permaUrlOnOriginalQuestion: string;
  isDeleted: boolean;
  viewerCanRestoreAnswer: boolean;
  tribeItem: null;
  originalQuestionIfDifferent: OriginalQuestionIfDifferent | null;
  __isContentObject: "Answer";
  isSensitive: boolean;
  contentType: "answer";
  creationTime: number;
  hasSuicideTopics: boolean;
  updatedTime: number;
  author: Author;
  viewer: Viewer;
  __isCredentialContainer: "Answer";
  authorCredential: AuthorCredential;
  isTranslated: boolean;
  url: string;
  isOwnTranslation: boolean;
  businessCredential: null;
  businessAnswer: null;
  sourceNetwork: null;
  sourceQuestion: null;
  sourceAnswer: null;
  __isMonetizable: "Answer";
  oid: number;
  notForReproduction: boolean;
  numViews: number;
  __isVotable: "Answer";
  numUpvotes: number;
  __isQuoraShareable: "Answer";
  numShares: number;
  moderationCollapseType: null | string;
  numRequesters: number;
  requesters: Requester[];
  isCommentsDisabled: boolean;
  isCollapsedForViewer: boolean;
  isModerationLocked: boolean;
  moderationCollapseTypeUrl: null;
  network: NodeNetwork;
  collapseOperation: null;
  numDisplayComments: number;
}

export interface NodeContentQtextDocument {
  id: string;
}

export interface NodeNetwork {
  id: string;
  __typename: "Network";
  contentLanguageCode: string;
  appealsFormUrl: string;
}

export interface Question {
  viewerCanReviewAnswers: boolean;
  id: string;
  __typename: "Question";
  qid: number;
  title: string;
  isPartnerQuestion: boolean;
  isTrendyQuestion: boolean;
  asker: Asker;
  url: string;
  slug: string;
  network: QuestionNetwork;
  tribeItem: null;
  isDeleted: boolean;
  answerCount: number;
  suggestedReplies: any[];
}

export interface Asker {
  id: string;
  __typename: "User";
  isEmployee: boolean;
  uid: number;
}

export interface QuestionNetwork {
  nid: number;
  id: string;
}

export interface OriginalQuestionIfDifferent {
  id: string;
  originalQuestionText: string;
  isQuestionBannerRemoved: boolean;
  question: OriginalQuestionIfDifferentQuestion;
}

export interface OriginalQuestionIfDifferentQuestion {
  qid: number;
  url: string;
  title: string;
  id: string;
  __typename: "Question";
  isPartnerQuestion: boolean;
  isTrendyQuestion: boolean;
  asker: Asker;
  slug: string;
  network: QuestionNetwork;
  tribeItem: null;
  debugInfo: DebugInfo;
  viewer: QuestionViewer;
}

export type DebugInfo = "{}";

export interface QuestionViewer {
  user: null;
  id: string;
}

export interface Author {
  __typename: "User";
  isAnon: boolean;
  id: string;
  uid: number;
  useTranslatedName: boolean;
  isMachineAnswerBot: boolean;
  names: NameElement[];
  adminNames: any[];
  profileUrl: string;
  smallProfileImageUrl: string;
  profileImageUrl: string;
  isVerified: boolean;
  businessStatus: null;
  consumerBundleActive: boolean;
}

export interface NameElement {
  __typename: "UserName";
  id: string;
  reverseOrder: boolean;
  givenName: string;
  familyName: string;
  scriptCode: string;
}

export interface Viewer {
  staticContent: StaticContent;
  id: string;
}

export interface StaticContent {
  title: string;
  contentQtextDocument: StaticContentContentQtextDocument;
  staticContentType: string;
  internalUrl: string;
  id: string;
}

export interface StaticContentContentQtextDocument {
  legacyJson: string;
  id: string;
}

export interface AuthorCredential {
  id: string;
  __typename: string;
  __isCredential: string;
  translatedString: string;
  experience?: Experience;
  description?: string;
  isDefault: boolean;
  isBad: boolean;
  isEnqueued: boolean;
  credentialId: number;
  position?: string;
  endYear?: string;
  companyName?: null;
  company?: null;
  startYear?: null;
}

export interface Experience {
  id: string;
  __typename: "Topic";
  tid: number;
  name: string;
}

export interface Requester {
  id: string;
  __typename: "User";
  uid: number;
  isAnon: boolean;
  useTranslatedName: boolean;
  isMachineAnswerBot: boolean;
  names: NameElement[];
  adminNames: any[];
  profileUrl: string;
}
