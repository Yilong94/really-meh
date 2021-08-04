import classNames from "classnames";
import { FC } from "react";

interface Props {
  text: string;
  classname?: string;
}

const Pill: FC<Props> = ({ text, classname }) => {
  const pillClass = classNames({
    "inline-block px-2 py-1 text-xs font-bold bg-yellow-300 rounded": true,
    [classname || ""]: !!classname,
  });
  return <div className={pillClass}>{text}</div>;
};

export default Pill;
