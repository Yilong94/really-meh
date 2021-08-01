export interface CurrentPost {
  postId: string;
  creator: string;
  createdAt: string;
  title: string;
  tags: string[];
  content: string;
  poll: {
    data: { [labe: string]: number };
    hasVoted: boolean;
  };
  numComment: number;
}
