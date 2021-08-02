import {
  faCaretSquareUp,
  faCaretSquareDown,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import moment from "moment";
import { useEffect } from "react";
import { FC, MouseEventHandler, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

import { voteComment } from "../../api";
import { ReactQueryKey } from "../../constants";
import { Comment, CommentVote } from "../../entities/Comment";

type Props = Comment;

const CommentsListItem: FC<Props> = ({
  commentId,
  creator,
  createdAt,
  content,
  upVote,
  downVote,
  selfVote,
}) => {
  const { mutate, isLoading, data } = useMutation(
    ReactQueryKey.VOTE_COMMENT,
    voteComment
  );
  const [voteData, setVoteData] = useState({ upVote, downVote, selfVote });
  const { id: postId } = useParams<{ id: string }>();

  useEffect(() => {
    setVoteData({ ...voteData, upVote, downVote, selfVote });
  }, [upVote, downVote, selfVote]);
  useEffect(() => {
    console.log("data", data);
    data && setVoteData({ ...voteData, ...data });
  }, [data]);

  const createdAtFormatted = moment(createdAt).fromNow();

  const upVoteClass = classNames({
    "text-gray-400": voteData.selfVote === CommentVote.DOWN_VOTE,
    "text-yellow-300": voteData.selfVote === CommentVote.UP_VOTE,
  });
  const downVoteClass = classNames({
    "text-gray-400": voteData.selfVote === CommentVote.UP_VOTE,
    "text-yellow-300": voteData.selfVote === CommentVote.DOWN_VOTE,
  });

  const handleVoteClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const vote = (event.target as HTMLElement).id as CommentVote;
    // TODO: hardcoded user id
    mutate({
      userId: "f9cb1ec8-9d4b-479d-afe6-2146cacb92ce",
      postId,
      commentId: commentId,
      vote,
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between text-xs">
        <div>Commented by {creator}</div>
        <div>{createdAtFormatted}</div>
      </div>
      <div className="my-2 text-base">{content}</div>

      {isLoading ? (
        <div className="flex mt-4">
          <FontAwesomeIcon icon={faSpinner} className="w-5 h-5 animate-spin" />
        </div>
      ) : (
        <div className="flex mt-4 space-x-2">
          <button
            className="flex items-center space-x-1"
            id={CommentVote.UP_VOTE}
            onClick={handleVoteClick}
          >
            <FontAwesomeIcon className={upVoteClass} icon={faCaretSquareUp} />
            <div className="text-xs">{voteData.upVote}</div>
          </button>
          <button
            className="flex items-center space-x-1"
            id={CommentVote.DOWN_VOTE}
            onClick={handleVoteClick}
          >
            <FontAwesomeIcon
              className={downVoteClass}
              icon={faCaretSquareDown}
            />
          </button>
          <div className="text-xs">{voteData.downVote}</div>
        </div>
      )}
    </div>
  );
};

export default CommentsListItem;
