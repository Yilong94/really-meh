import moment from "moment";
import { FC } from "react";

import { fakeNewsPollLabelMap } from "../../constants";
import { CurrentPost } from "../../entities/CurrentPost";
import BarGraph from "../BarGraph";
import Pill from "../Pill";
import ResponsiveContainer from "../ResponsiveContainer";

type Props = CurrentPost;

const CurrentPostsListItem: FC<Props> = ({
  creator,
  createdAt,
  title,
  tags,
  content,
  poll,
  numComment,
}) => {
  const createdAtFormatted = moment(createdAt).fromNow();
  const dataFormatted = Object.keys(poll).reduce((acc, val) => {
    return { ...acc, [fakeNewsPollLabelMap[val]]: poll[val] };
  }, {});

  return (
    <div className="bg-white p-4 border-b border-gray-400 last:border-b-0">
      <div className="text-xs">{`Posted by ${creator}`}</div>
      <div className="text-xs">{createdAtFormatted}</div>
      <div className="text-base font-bold">{title}</div>
      {tags.map((tag, index) => {
        return <Pill key={index} text={tag}></Pill>;
      })}
      <div className="text-sm py-2">{content}</div>
      <BarGraph
        data={dataFormatted}
        question="To what extent is this piece of news true?"
      />
    </div>
  );
};

export default CurrentPostsListItem;
