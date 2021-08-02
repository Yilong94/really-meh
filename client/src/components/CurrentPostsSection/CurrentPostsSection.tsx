import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { fetchPosts } from "../../api";
import { ReactQueryKey } from "../../constants";
import { CurrentPost } from "../../entities/CurrentPost";
import { useOnScreen } from "../../utils/hooks";
import CurrentPostsList from "../CurrentPostsList";
import ResponsiveContainer from "../ResponsiveContainer";
import SearchBar from "../SearchBar";

const CurrentPostsSection: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [maxPage, setMaxPage] = useState(0);
  const [currentPosts, setCurrentPosts] = useState<CurrentPost[]>([]);

  const handleQuerySuccess = (data: CurrentPost[]) => {
    setCurrentPosts([...currentPosts, ...data]);
  };

  const { isFetching, refetch } = useQuery(
    ReactQueryKey.POSTS,
    async () => await fetchPosts(searchValue, maxPage),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      onSuccess: handleQuerySuccess,
    }
  );

  const ref = useRef<HTMLDivElement>(null);
  const isEndOfPage = useOnScreen(ref);

  useEffect(() => {
    if (isEndOfPage && !isFetching) {
      setMaxPage(maxPage + 1);
    }
  }, [isEndOfPage, isFetching]);

  useEffect(() => {
    refetch();
  }, [maxPage]);

  useEffect(() => {
    refetch();
  }, []);

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <ResponsiveContainer className="flex-grow bg-white">
      <div className="px-4 py-2">
        <SearchBar
          searchValue={searchValue}
          onSearchValueChange={handleSearchValueChange}
        />
      </div>

      <div className="border-b border-gray-400" />

      <CurrentPostsList currentPosts={currentPosts} />

      {isFetching ? (
        <div className="flex justify-center">
          <FontAwesomeIcon icon={faSpinner} className="w-5 h-5 animate-spin" />
        </div>
      ) : (
        <div ref={ref}></div>
      )}
    </ResponsiveContainer>
  );
};

export default CurrentPostsSection;
