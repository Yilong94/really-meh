import { FC } from "react";

import { Post } from "../../entities/Post";
import CurrentPostsListItem from "../CurrentPostsListItem";

interface Props {
  currentPosts: Post[];
}

const CurrentPostsList: FC<Props> = ({ currentPosts }) => {
  return (
    <div className="mt-2">
      {currentPosts.map((currentPost, index) => {
        return <CurrentPostsListItem key={index} {...currentPost} />;
      })}
    </div>
  );
};

export default CurrentPostsList;
