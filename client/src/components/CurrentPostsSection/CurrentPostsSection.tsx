import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import debounce from "lodash.debounce";
import { useCallback } from "react";
import { useRef } from "react";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { fetchPosts } from "../../api";
import { ReactQueryKey } from "../../constants";
import { Post } from "../../entities/Post";
import { getUserId } from "../../utils";
import { useOnScreen, usePrevious } from "../../utils/hooks";
import CurrentPostsList from "../CurrentPostsList";
import ResponsiveContainer from "../ResponsiveContainer";
import SearchBar from "../SearchBar";

const CurrentPostsSection: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [maxPage, setMaxPage] = useState(0);
  const [currentPosts, setCurrentPosts] = useState<Post[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const isEndOfPage = useOnScreen(ref);

  const { isFetching, refetch } = useQuery(
    ReactQueryKey.POSTS,
    async () => await fetchPosts(getUserId(), undefined, searchValue, maxPage),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        const newPosts = data.results.reverse();
        console.log("newposts", newPosts);
        setCurrentPosts([...newPosts]);
      },
    }
  );

  const debouncedRefetch = useCallback(
    debounce(() => {
      setCurrentPosts([]);
      setMaxPage(0);
      refetch();
    }, 1000),
    []
  );

  const previousIsEndOfPage = usePrevious(isEndOfPage);

  // useEffect(() => {
  //   refetch();
  // }, []);
  // useEffect(() => {
  //   refetch();
  // }, [maxPage]);
  // useEffect(() => {
  //   if (!!previousIsEndOfPage && isEndOfPage && !isFetching) {
  //     setMaxPage(maxPage + 1);
  //   }
  // }, [previousIsEndOfPage, isEndOfPage, isFetching]);
  useEffect(() => {
    debouncedRefetch();
  }, [searchValue]);

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <ResponsiveContainer className="flex-grow mt-2">
      <div className="px-4 py-2 bg-white">
        <SearchBar
          searchValue={searchValue}
          onSearchValueChange={handleSearchValueChange}
        />
      </div>

      <CurrentPostsList currentPosts={currentPosts} />

      {isFetching ? (
        <div className="flex justify-center mt-4">
          <FontAwesomeIcon icon={faSpinner} className="w-5 h-5 animate-spin" />
        </div>
      ) : (
        <div ref={ref}></div>
      )}
    </ResponsiveContainer>
  );
};

export default CurrentPostsSection;
