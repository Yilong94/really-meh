export interface CurrentPost {
  creator: string;
  createdAt: string;
  title: string;
  tags: string[];
  content: string;
  poll: { [labe: string]: number };
  numComment: number;
}
