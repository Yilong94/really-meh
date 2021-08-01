import {
  faCommentAlt,
  faShareSquare,
} from "@fortawesome/free-regular-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useMemo } from "react";
import { FC } from "react";
import { MutationFunction, useMutation, useQuery } from "react-query";

import { fetchPost, ratePost } from "../../api";
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
  poll: { data, hasVoted },
  numComment,
}) => {
  const { isLoading: isRatePostLoading, mutate } = useMutation(
    ReactQueryKey.RATE_POSTS,
    ratePost as MutationFunction,
    {
      onSuccess: () => {
        refetch();
      },
    }
  );
  const {
    data: { poll: { data: newData = {} } = {} } = {},
    isLoading: isFetchPostLoading,
    status,
    refetch,
  } = useQuery(
    [ReactQueryKey.POST, postId],
    async () => {
      return await fetchPost(postId);
    },
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );
  const isLoading = useMemo(() => {
    return isRatePostLoading || isFetchPostLoading;
  }, [isRatePostLoading, isFetchPostLoading]);

  const createdAtFormatted = moment(createdAt).fromNow();
  const dataFormatted = Object.keys(data).reduce((acc, val) => {
    return { ...acc, [fakeNewsPollLabelMap[val]]: data[val] };
  }, {});
  const labelFormatted = Object.keys(data).reduce((acc, val) => {
    return { ...acc, [val]: fakeNewsPollLabelMap[val] };
  }, {});
  const newDataFormatted = Object.keys(newData).reduce((acc, val) => {
    return { ...acc, [fakeNewsPollLabelMap[val]]: data[val] };
  }, {});

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

  const renderVisual = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex justify-center">
          <FontAwesomeIcon icon={faSpinner} className="w-5 h-5 animate-spin" />
        </div>
      );
    }

    switch (status) {
      case "success":
        return <BarGraph data={newDataFormatted} question={POLL_QUESTION} />;
      case "idle":
        if (hasVoted) {
          return <BarGraph data={dataFormatted} question={POLL_QUESTION} />;
        } else {
          return (
            <BarPoll
              label={labelFormatted}
              question={POLL_QUESTION}
              onClick={handlePollClick}
            />
          );
        }
    }
  }, [isLoading, status]);

  return (
    <div className="p-4 bg-white border-b border-gray-400 last:border-b-0">
      <div className="text-xs">{`Posted by ${creator}`}</div>
      <div className="text-xs">{createdAtFormatted}</div>
      <div className="text-base font-bold">{title}</div>
      {tags.map((tag, index) => {
        return <Pill key={index} text={tag}></Pill>;
      })}
      <div className="py-2 text-sm">{content}</div>

      {renderVisual}

      <div className="flex mt-4 space-x-2">
        <div className="flex items-center space-x-1">
          <FontAwesomeIcon className="text-gray-400" icon={faCommentAlt} />
          <div className="text-xs">{numComment} Comments</div>
        </div>
        <div className="flex items-center space-x-1">
          <FontAwesomeIcon className="text-gray-400" icon={faShareSquare} />
          <div className="text-xs">Share</div>
        </div>
      </div>
    </div>
  );
};

export default CurrentPostsListItem;
