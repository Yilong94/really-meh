import {
  faCaretSquareUp,
  faCaretSquareDown,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import moment from "moment";
import { useEffect, useCallback, useMemo } from "react";
import { FC, MouseEventHandler, useState } from "react";
import { useMutation } from "react-query";

import { voteComment } from "../../api";
import { initialVote, ReactQueryKey } from "../../constants";
import { Comment } from "../../entities/Comment";
import { Vote } from "../../entities/Vote";

type Props = Comment;

const CommentsListItem: FC<Props> = ({
  id,
  creatorUser,
  publishedAt,
  content,
  userVotes,
  userHasVoted,
}) => {
  const {
    mutate,
    isLoading,
    data: newUserVotes,
  } = useMutation(ReactQueryKey.VOTE_COMMENT, voteComment);
  // const [voteData, setVoteData] = useState({ upVote, downVote, selfVote });

  const [userVotesState, setUserVotesState] =
    useState<Comment["userVotes"]>(initialVote);
  const [userHasVotedState, setUserHasVotedState] =
    useState<Comment["userHasVoted"]>(null);

  useEffect(() => {
    setUserVotesState({ ...userVotesState, ...userVotes });
  }, [userVotes]);
  useEffect(() => {
    setUserHasVotedState(userHasVoted);
  }, [userHasVoted]);
  useEffect(() => {
    newUserVotes &&
      setUserVotesState({ ...userVotesState, ...newUserVotes.data });
  }, [newUserVotes]);

  const publishedAtFormatted = moment(publishedAt).fromNow();

  const upVoteClass = useMemo(
    () =>
      classNames({
        "text-gray-400": userHasVotedState !== Vote.UP,
        "text-yellow-300": userHasVotedState === Vote.UP,
      }),
    [userHasVotedState]
  );
  const downVoteClass = useMemo(
    () =>
      classNames({
        "text-gray-400": userHasVotedState !== Vote.DWN,
        "text-yellow-300": userHasVotedState === Vote.DWN,
      }),
    [userHasVotedState]
  );

  const handleVoteClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event: any) => {
      const vote = (event.currentTarget as HTMLElement).id as Vote;

      if (
        (userHasVotedState === Vote.UP && vote === Vote.UP) ||
        (userHasVotedState === Vote.DWN && vote === Vote.DWN)
      ) {
        setUserHasVotedState(null);
      } else if (
        (userHasVotedState === Vote.UP || userHasVotedState === null) &&
        vote === Vote.DWN
      ) {
        setUserHasVotedState(Vote.DWN);
      } else if (
        (userHasVotedState === Vote.DWN || userHasVotedState === null) &&
        vote === Vote.UP
      ) {
        setUserHasVotedState(Vote.UP);
      }

      // TODO: hardcoded user id
      mutate({
        user: 1,
        comment: id,
        direction: vote,
      });
    },
    [userHasVotedState]
  );

  return (
    <div className="p-4">
      <div className="flex justify-between text-xs">
        <div>Commented by {creatorUser.name}</div>
        <div>{publishedAtFormatted}</div>
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
            id={Vote.UP}
            onClick={handleVoteClick}
          >
            <FontAwesomeIcon className={upVoteClass} icon={faCaretSquareUp} />
            <div className="text-xs">{userVotesState.UP}</div>
          </button>
          <button
            className="flex items-center space-x-1"
            id={Vote.DWN}
            onClick={handleVoteClick}
          >
            <FontAwesomeIcon
              className={downVoteClass}
              icon={faCaretSquareDown}
            />
          </button>
          <div className="text-xs">{userVotesState.DWN}</div>
        </div>
      )}
    </div>
  );
};

export default CommentsListItem;
