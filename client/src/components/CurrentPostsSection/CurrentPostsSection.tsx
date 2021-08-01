import { FC, useState } from "react";

import { CurrentPost } from "../../entities/CurrentPost";
import CurrentPostsList from "../CurrentPostsList";
import ResponsiveContainer from "../ResponsiveContainer";
import SearchBar from "../SearchBar";

const currentPosts: CurrentPost[] = [
  {
    creator: "Angelina Than Xiao Mei",
    createdAt: "2021-01-11T10:00:00",
    title: "Poll title",
    tags: ["COVID-19"],
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien odio vel tellus etiam vel pellentesque risus malesuada et. Ac feugiat tortor, at condimentum purus elit dui. Sit id in massa mattis at neque. Ultricies et nisl sit id viverra volutpat .....",
    poll: {
      trueInPercent: 0.0,
      swTrueInPercent: 0.3,
      swFalseInPercent: 0.4,
      falseInPercent: 1.0,
    },
    numComment: 123,
  },
  {
    creator: "Angelina Than Xiao Mei",
    createdAt: "2021-01-11T10:00:00",
    title: "Poll title",
    tags: ["COVID-19"],
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien odio vel tellus etiam vel pellentesque risus malesuada et. Ac feugiat tortor, at condimentum purus elit dui. Sit id in massa mattis at neque. Ultricies et nisl sit id viverra volutpat .....",
    poll: {
      trueInPercent: 0.2,
      swTrueInPercent: 0.3,
      swFalseInPercent: 0.4,
      falseInPercent: 0.1,
    },
    numComment: 123,
  },
  {
    creator: "Angelina Than Xiao Mei",
    createdAt: "2021-01-11T10:00:00",
    title: "Poll title",
    tags: ["COVID-19"],
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien odio vel tellus etiam vel pellentesque risus malesuada et. Ac feugiat tortor, at condimentum purus elit dui. Sit id in massa mattis at neque. Ultricies et nisl sit id viverra volutpat .....",
    poll: {
      trueInPercent: 0.2,
      swTrueInPercent: 0.3,
      swFalseInPercent: 0.4,
      falseInPercent: 0.1,
    },
    numComment: 123,
  },
];

const CurrentPostsSection: FC = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <ResponsiveContainer className="bg-white">
      <div className="px-4 py-2">
        <SearchBar
          searchValue={searchValue}
          onSearchValueChange={handleSearchValueChange}
        />
      </div>

      <div className="border-b border-gray-400" />
      <CurrentPostsList currentPosts={currentPosts} />
    </ResponsiveContainer>
  );
};

export default CurrentPostsSection;
