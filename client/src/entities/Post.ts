import { Rating } from "./Rating";

export interface Post {
  id: number;
  title: string;
  tags: string[];
  content: string;
  creatorUser: {
    id: number;
    name: string;
  };
  archivedAt: string | null;
  publishedAt: string | null;
  editedAt: string | null;
  userRatings: {
    TR?: number;
    SW_TR?: number;
    SW_FSE?: number;
    FSE?: number;
  };
  numberOfUserComments: number;
  userHasRated: Rating | null;
}
