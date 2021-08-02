export enum CommentVote {
  UP_VOTE = "up vote",
  DOWN_VOTE = "down vote",
}

export interface Comment {
  commentId: string;
  creator: string;
  createdAt: string;
  content: string;
  upVote: number;
  downVote: number;
  selfVote: CommentVote | null;
}
