import { FC } from "react";

import { Post } from "../../entities/Post";
import CurrentPostsListItem from "../CurrentPostsListItem";

interface Props {
  currentPosts: Post[];
}

const CurrentPostsList: FC<Props> = ({ currentPosts }) => {
  return (
    <div>
      {currentPosts.map((currentPost, index) => {
        return (
          <div key={index} className="border-b border-gray-400 last:border-b-0">
            <CurrentPostsListItem {...currentPost} />
          </div>
        );
      })}
    </div>
  );
};

export default CurrentPostsList;
