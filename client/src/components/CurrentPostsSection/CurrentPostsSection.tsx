import { FC, useState } from "react";

import { CurrentPost } from "../../entities/CurrentPost";
import CurrentPostsList from "../CurrentPostsList";
import ResponsiveContainer from "../ResponsiveContainer";
import SearchBar from "../SearchBar";

const currentPosts: CurrentPost[] = [
  {
    postId: "3449a397-71ea-4230-8bae-2b2563bcabd7",
    creator: "Angelina Than Xiao Mei",
    createdAt: "2021-01-11T10:00:00",
    title: "Poll title",
    tags: ["COVID-19"],
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien odio vel tellus etiam vel pellentesque risus malesuada et. Ac feugiat tortor, at condimentum purus elit dui. Sit id in massa mattis at neque. Ultricies et nisl sit id viverra volutpat .....",
    poll: {
      data: {
        true: 0.0,
        "sw true": 0.3,
        "sw false": 0.4,
        false: 1.0,
      },
      hasVoted: true,
    },
    numComment: 123,
    comments: [
      {
        commentId: "3449a397-71ea-4230-8bae-2b2563bcabd7",
        creator: "Gary Lim",
        createdAt: "2021-01-12T10:00:00",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel orci ultrices sapien. Morbi malesuada nisi, id tincidunt morbi. Id nibh tincidunt lacinia a ut quis pretium urna elit. Feugiat dolor vitae facilisi scelerisque nec egestas sed ac, sit. Lectus sagittis congue in eu aliquet massa lobortis sed.",
        upVote: 213,
        downVote: 23,
        selfVote: "upVote",
      },
    ],
  },
  {
    postId: "3449a397-71ea-4230-8bae-2b2563bcabd7",
    creator: "Angelina Than Xiao Mei",
    createdAt: "2021-01-11T10:00:00",
    title: "Poll title",
    tags: ["COVID-19"],
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien odio vel tellus etiam vel pellentesque risus malesuada et. Ac feugiat tortor, at condimentum purus elit dui. Sit id in massa mattis at neque. Ultricies et nisl sit id viverra volutpat .....",
    poll: {
      data: {
        true: 0.2,
        "sw true": 0.3,
        "sw false": 0.4,
        false: 0.1,
      },
      hasVoted: true,
    },
    numComment: 123,
    comments: [
      {
        commentId: "3449a397-71ea-4230-8bae-2b2563bcabd7",
        creator: "Gary Lim",
        createdAt: "2021-01-12T10:00:00",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel orci ultrices sapien. Morbi malesuada nisi, id tincidunt morbi. Id nibh tincidunt lacinia a ut quis pretium urna elit. Feugiat dolor vitae facilisi scelerisque nec egestas sed ac, sit. Lectus sagittis congue in eu aliquet massa lobortis sed.",
        upVote: 213,
        downVote: 23,
        selfVote: "upVote",
      },
    ],
  },
  {
    postId: "3449a397-71ea-4230-8bae-2b2563bcabd7",
    creator: "Angelina Than Xiao Mei",
    createdAt: "2021-01-11T10:00:00",
    title: "Poll title",
    tags: ["COVID-19"],
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien odio vel tellus etiam vel pellentesque risus malesuada et. Ac feugiat tortor, at condimentum purus elit dui. Sit id in massa mattis at neque. Ultricies et nisl sit id viverra volutpat .....",
    poll: {
      data: {
        true: 0.2,
        "sw true": 0.3,
        "sw false": 0.4,
        false: 0.1,
      },
      hasVoted: false,
    },
    numComment: 123,
    comments: [
      {
        commentId: "3449a397-71ea-4230-8bae-2b2563bcabd7",
        creator: "Gary Lim",
        createdAt: "2021-01-12T10:00:00",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel orci ultrices sapien. Morbi malesuada nisi, id tincidunt morbi. Id nibh tincidunt lacinia a ut quis pretium urna elit. Feugiat dolor vitae facilisi scelerisque nec egestas sed ac, sit. Lectus sagittis congue in eu aliquet massa lobortis sed.",
        upVote: 213,
        downVote: 23,
        selfVote: "upVote",
      },
    ],
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
