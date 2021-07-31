import { FC } from "react";

interface Props {
  text: string;
}

const Pill: FC<Props> = ({ text }) => {
  return (
    <div className="inline-block text-xs rounded-full py-1 px-2 bg-indigo-400">
      {text}
    </div>
  );
};

export default Pill;
