import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

import { commentPost } from "../../api";
import { ReactQueryKey, SortBy } from "../../constants";
import { Comment } from "../../entities/Comment";
import CommentsListItem from "../CommentsListItem";
import { BottomSheet } from "./components/BottomSheet";
interface Props {
  comments: Comment[];
}

const CommentsList: FC<Props> = ({ comments }) => {
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.TOP);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const { id: postId } = useParams<{ id: string }>();
  const { mutate, isLoading, data } = useMutation(
    ReactQueryKey.VOTE_COMMENT,
    commentPost
  );

  const numComments = comments.length;

  const handleSortByClick = () => {
    if (sortBy === SortBy.TOP) {
      setSortBy(SortBy.BOTTOM);
    } else {
      setSortBy(SortBy.TOP);
    }
  };

  const handleAddComment = () => {
    setOpen(true);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const handlePostComment = () => {
    mutate({
      userId: "f9cb1ec8-9d4b-479d-afe6-2146cacb92ce",
      postId,
      comment,
    });
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
        <BottomSheet
          handleCommentChange={handleCommentChange}
          handlePostComment={handlePostComment}
          isOpen={isOpen}
          setOpen={setOpen}
          comment={comment}
        />
        <button
          onClick={handleAddComment}
          className="p-1 my-2 text-base font-bold bg-yellow-300 rounded-full"
        >
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
