import { FC, MouseEventHandler } from "react";

import { POLL_VIEW_RESULT_ANSWER, POLL_VIEW_RESULT_KEY } from "../../constants";

interface Props {
  question: string;
  label: { [key: string]: string };
  onClick: (key: string) => void;
}

const BarPoll: FC<Props> = ({ question, label, onClick }) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const key = (event.target as HTMLElement).id;
    onClick(key);
  };

  return (
    <div className="flex flex-col p-2 border border-black">
      <div className="mb-2 text-sm font-bold">{question}</div>
      <div className="flex flex-col space-y-1">
        {Object.keys(label).map((key, index) => {
          return (
            <button
              className="text-xs border border-black"
              key={index}
              id={key}
              onClick={handleClick}
            >
              {label[key]}
            </button>
          );
        })}
      </div>
      <button
        className="self-end pt-1 text-xs underline"
        id={POLL_VIEW_RESULT_KEY}
        onClick={handleClick}
      >
        {POLL_VIEW_RESULT_ANSWER}
      </button>
    </div>
  );
};

export default BarPoll;
