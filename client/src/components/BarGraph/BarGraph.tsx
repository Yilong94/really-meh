import classNames from "classnames";
import { CSSProperties, FC } from "react";

interface BarColumnProps {
  value: number;
  label: string;
  color?: string;
  selected?: boolean;
}

const BarColumn: FC<BarColumnProps> = ({
  value,
  label,
  color = "bg-gray-300",
  selected,
}) => {
  const roundedValue = Math.round(value * 100);

  const style: CSSProperties = {
    width: `${roundedValue}%`,
  };

  const barClass = classNames("flex items-center h-5", color);

  return (
    <div className="flex items-center">
      <div className="flex-grow h-5 bg-white">
        <div style={style} className={barClass}>
          <span className="ml-2 text-xs">{label}</span>
        </div>
      </div>

      <div className="ml-2 text-xs">{`${roundedValue}%`}</div>
    </div>
  );
};

interface Props {
  question: string;
  data: { [label: string]: number };
}

const BarGraph: FC<Props> = ({ data, question }) => {
  const highestValue = Math.max(...Object.values(data));

  return (
    <div className="p-2 border-2 border-black rounded-md">
      <div className="mb-2 text-sm font-bold">{question}</div>
      <div className="space-y-1">
        {Object.keys(data).map((label, index) => {
          const color =
            highestValue === data[label] ? "bg-yellow-300" : "bg-gray-300";
          return (
            <BarColumn
              key={index}
              label={label}
              value={data[label]}
              color={color}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BarGraph;
