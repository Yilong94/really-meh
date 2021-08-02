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
  POLL_QUESTION,
  ReactQueryKey,
} from "../../constants";
import { CurrentPost } from "../../entities/CurrentPost";
import BarGraph from "../BarGraph";
import BarPoll from "../BarPoll";
import Pill from "../Pill";

type Props = CurrentPost;

const CurrentPostsListItem: FC<Props> = ({
  postId,
  creator,
  createdAt,
  title,
  tags,
  content,
  poll,
  numComment,
}) => {
  const {
    isLoading: isRatePostLoading,
    mutate,
    data: { rating } = {},
  } = useMutation(ReactQueryKey.RATE_POST, ratePost);

  const [pollData, setPollData] = useState(poll);
  useEffect(() => {
    setPollData(poll);
  }, [poll]);
  useEffect(() => {
    rating && setPollData({ data: rating, hasVoted: true });
  }, [rating]);
  const history = useHistory();

  const createdAtFormatted = moment(createdAt).fromNow();
  const dataFormatted = useMemo(
    () =>
      Object.keys(pollData.data).reduce((acc, val) => {
        return { ...acc, [fakeNewsPollLabelMap[val]]: pollData.data[val] };
      }, {}),
    [pollData.data]
  );
  const labelFormatted = useMemo(
    () =>
      Object.keys(pollData.data).reduce((acc, val) => {
        return { ...acc, [val]: fakeNewsPollLabelMap[val] };
      }, {}),
    [pollData.data]
  );

  const handlePollClick = useMemo(() => {
    return (key: string) => {
      // TODO: hardcoded user id
      mutate({
        userId: "f9cb1ec8-9d4b-479d-afe6-2146cacb92ce",
        postId,
        labelKey: key,
      });
    };
  }, [postId]);

  const redirectToPost = () => {
    history.push(POST + `/${postId}`);
  };

  return (
    <div className="p-4 bg-white">
      <div className="text-xs">{`Posted by ${creator}`}</div>
      <div className="text-xs">{createdAtFormatted}</div>
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
      ) : pollData.hasVoted ? (
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
          <div className="text-xs">{numComment} Comments</div>
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
