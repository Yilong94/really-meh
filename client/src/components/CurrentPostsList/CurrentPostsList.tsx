import { FC } from "react";

import { CurrentPost } from "../../entities/CurrentPost";
import CurrentPostsListItem from "../CurrentPostsListItem";

interface Props {
  currentPosts: CurrentPost[];
}

const CurrentPostsList: FC<Props> = ({ currentPosts }) => {
  return (
    <div>
      {currentPosts.map((currentPost, index) => {
        return <CurrentPostsListItem key={index} {...currentPost} />;
      })}
    </div>
  );
};

export default CurrentPostsList;
