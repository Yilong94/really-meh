export interface CurrentPost {
  postId: string;
  creator: string;
  createdAt: string;
  title: string;
  tags: string[];
  content: string;
  poll: {
    data: { [label: string]: number };
    hasVoted: boolean;
  };
  numComment: number;
  comments: {
    commentId: string;
    creator: string;
    createdAt: string;
    content: string;
    upVote: number;
    downVote: number;
    selfVote: string | null;
  }[];
}
