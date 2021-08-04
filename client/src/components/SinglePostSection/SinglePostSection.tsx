import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";
import { useEffect, useRef, useState } from "react";
import { FC } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { fetchComments, fetchPosts } from "../../api";
import { ReactQueryKey } from "../../constants";
import { Comment } from "../../entities/Comment";
import { Post } from "../../entities/Post";
import { useOnScreen } from "../../utils/hooks";
import CommentsList from "../CommentsList";
import CurrentPostsListItem from "../CurrentPostsListItem";
import ResponsiveContainer from "../ResponsiveContainer";

const SinglePostSection: FC = () => {
  const { id: postId } = useParams<{ id: string }>();
  const [maxPage, setMaxPage] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const isEndOfPage = useOnScreen(ref);

  const { isLoading: isFetchPostLoading, data: singlePost } = useQuery(
    ReactQueryKey.POST,
    // TODO: hardcoded user id
    async () => await fetchPosts(1, +postId)
  );
  const { isFetching: isFetchCommentsLoading, refetch } = useQuery(
    ReactQueryKey.COMMENTS,
    // TODO: hardcoded user id
    async () => await fetchComments(1, +postId, maxPage),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setComments([...comments, ...data.results]);
      },
    }
  );
  const isLoading = useMemo(() => {
    return isFetchPostLoading || isFetchCommentsLoading;
  }, [isFetchPostLoading, isFetchCommentsLoading]);

  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    refetch();
  }, [maxPage]);
  useEffect(() => {
    if (isEndOfPage && !isFetchCommentsLoading) {
      setMaxPage(maxPage + 1);
    }
  }, [isEndOfPage, isFetchCommentsLoading]);

  return (
    <ResponsiveContainer>
      {isLoading ? (
        <div className="flex justify-center bg-white py-36">
          <FontAwesomeIcon icon={faSpinner} className="w-5 h-5 animate-spin" />
        </div>
      ) : (
        <>
          <CurrentPostsListItem {...(singlePost?.results[0] as Post)} />
          <CommentsList comments={comments} />
        </>
      )}
    </ResponsiveContainer>
  );
};

export default SinglePostSection;
