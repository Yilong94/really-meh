import { FC } from "react";

interface Props {
  text: string;
}

const Pill: FC<Props> = ({ text }) => {
  return (
    <div className="inline-block px-2 py-1 text-xs font-bold bg-yellow-300 rounded">
      {text}
    </div>
  );
};

export default Pill;
