import {
  faCommentAlt,
  faShareSquare,
} from "@fortawesome/free-regular-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { FC } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";

import { ratePost } from "../../api";
import { POST } from "../../app/routes";
import {
  fakeNewsPollLabelMap,
  initialRating,
  POLL_QUESTION,
  ReactQueryKey,
} from "../../constants";
import { Post } from "../../entities/Post";
import { Rating } from "../../entities/Rating";
import BarGraph from "../BarGraph";
import BarPoll from "../BarPoll";
import Pill from "../Pill";

type Props = Post;

const CurrentPostsListItem: FC<Props> = ({
  id,
  creatorUser,
  publishedAt,
  title,
  tags,
  content,
  userRatings,
  numberOfUserComments,
  userHasRated,
}) => {
  const {
    isLoading: isRatePostLoading,
    mutate,
    data: { data: newUserRatings } = {},
  } = useMutation(ReactQueryKey.RATE_POST, ratePost);

  const [userRatingsState, setUserRatingsState] =
    useState<Post["userRatings"]>(initialRating);
  const [userHasRatedState, setUserHasRatedState] =
    useState<Post["userHasRated"]>(null);

  useEffect(() => {
    setUserRatingsState({
      ...userRatingsState,
      ...userRatings,
    });
  }, [userRatings]);
  useEffect(() => {
    setUserHasRatedState(userHasRated);
  }, [userHasRated]);
  useEffect(() => {
    newUserRatings &&
      setUserRatingsState({
        ...userRatingsState,
        ...newUserRatings,
      });
  }, [newUserRatings]);

  const history = useHistory();

  const publishedAtFormatted = moment(publishedAt).fromNow();
  const dataFormatted = useMemo(
    () =>
      Object.keys(userRatingsState).reduce((acc, val) => {
        return {
          ...acc,
          [fakeNewsPollLabelMap[val]]: (
            userRatingsState as { [key: string]: number }
          )[val],
        };
      }, {}),
    [userRatingsState]
  );
  const labelFormatted = useMemo(
    () =>
      Object.keys(userRatingsState).reduce((acc, val) => {
        return { ...acc, [val]: fakeNewsPollLabelMap[val] };
      }, {}),
    [userRatingsState]
  );

  const handlePollClick = useMemo(() => {
    return (key: string) => {
      setUserHasRatedState(key as Rating);
      // TODO: hardcoded user id
      mutate({
        user: 1,
        poll: id,
        rating: key as Rating,
      });
    };
  }, [id]);

  const redirectToPost = () => {
    history.push(POST + `/${id}`);
  };

  return (
    <div className="p-4 bg-white">
      <div className="text-xs">{`Posted by ${
        creatorUser.name || "Unknown"
      }`}</div>
      <div className="text-xs">{publishedAtFormatted}</div>
      <div className="text-base font-bold" onClick={redirectToPost}>
        {title}
      </div>
      {tags.map((tag, index) => {
        return <Pill key={index} text={tag}></Pill>;
      })}
      <div className="py-2 text-sm" onClick={redirectToPost}>
        {content}
      </div>

      {isRatePostLoading ? (
        <div className="flex justify-center">
          <FontAwesomeIcon icon={faSpinner} className="w-5 h-5 animate-spin" />
        </div>
      ) : userHasRatedState ? (
        <BarGraph data={dataFormatted} question={POLL_QUESTION} />
      ) : (
        <BarPoll
          label={labelFormatted}
          question={POLL_QUESTION}
          onClick={handlePollClick}
        />
      )}

      <div className="flex mt-4 space-x-2">
        <button
          className="flex items-center space-x-1"
          onClick={redirectToPost}
        >
          <FontAwesomeIcon className="text-gray-400" icon={faCommentAlt} />
          <div className="text-xs">{numberOfUserComments} Comments</div>
        </button>
        <button className="flex items-center space-x-1">
          <FontAwesomeIcon className="text-gray-400" icon={faShareSquare} />
          <div className="text-xs">Share</div>
        </button>
      </div>
    </div>
  );
};

export default CurrentPostsListItem;
