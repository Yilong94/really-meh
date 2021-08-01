import { FC } from "react";

interface Props {
  text: string;
}

const Pill: FC<Props> = ({ text }) => {
  return (
    <div className="inline-block px-2 py-1 text-xs bg-indigo-400 rounded-full">
      {text}
    </div>
  );
};

export default Pill;
