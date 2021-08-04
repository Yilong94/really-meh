import { Vote } from "./Vote";

export interface Comment {
  id: number;
  content: string;
  creatorUser: {
    id: number;
    name: string;
  };
  poll: number;
  editedAt: string | null;
  publishedAt: string | null;
  userVotes: {
    UP?: number;
    DWN?: number;
  };
  userHasVoted: Vote.UP | Vote.DWN | null;
}
