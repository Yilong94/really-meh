import { FC, MouseEventHandler } from "react";

import Pill from "../Pill";

interface Props {
  title: string;
  content: string;
  tags: string[];
  onContentClick: MouseEventHandler;
}

const Card: FC<Props> = ({ title, content, tags, onContentClick }) => {
  return (
    <div className="px-4 py-4 border border-yellow-300 rounded-md">
      <div className="text-sm font-medium uppercase">{title}</div>
      <div onClick={onContentClick} className="mt-2 text-base">
        {content}
      </div>
      <div className="mt-8">
        {tags.map((tag, index) => {
          return <Pill key={index} text={tag} />;
        })}
      </div>
    </div>
  );
};

export default Card;
