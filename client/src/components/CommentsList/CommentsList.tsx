import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";

import { SortBy } from "../../constants";
import { Comment } from "../../entities/Comment";
import CommentsListItem from "../CommentsListItem";

interface Props {
  comments: Comment[];
}

const CommentsList: FC<Props> = ({ comments }) => {
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.TOP);

  const numComments = comments.length;

  const handleSortByClick = () => {
    if (sortBy === SortBy.TOP) {
      setSortBy(SortBy.BOTTOM);
    } else {
      setSortBy(SortBy.TOP);
    }
  };

  return (
    <div className="mt-2 space-y-2">
      <div className="flex flex-col p-4 bg-white">
        <div className="text-xs">
          {numComments} comments sorted by <b>{sortBy}</b>
          <button onClick={handleSortByClick}>
            <FontAwesomeIcon
              icon={sortBy === SortBy.TOP ? faChevronDown : faChevronUp}
            />
          </button>
        </div>
        <button className="p-1 my-2 text-base font-bold bg-yellow-300 rounded-full">
          Add a comment
        </button>
      </div>
      <div className="bg-white">
        {comments.map((comment, index) => {
          return <CommentsListItem key={index} {...comment} />;
        })}
      </div>
    </div>
  );
};

export default CommentsList;