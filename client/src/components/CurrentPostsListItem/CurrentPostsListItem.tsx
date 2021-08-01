import {
  faCommentAlt,
  faShareSquare,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { FC } from "react";

import { fakeNewsPollLabelMap } from "../../constants";
import { CurrentPost } from "../../entities/CurrentPost";
import BarGraph from "../BarGraph";
import Pill from "../Pill";

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
      <div className="space-x-2 mt-4 flex">
        <div className="space-x-1 flex items-center">
          <FontAwesomeIcon className="text-gray-400" icon={faCommentAlt} />
          <div className="text-xs">{numComment} Comments</div>
        </div>
        <div className="space-x-1 flex items-center">
          <FontAwesomeIcon className="text-gray-400" icon={faShareSquare} />
          <div className="text-xs">Share</div>
        </div>
      </div>
    </div>
  );
};

export default CurrentPostsListItem;
