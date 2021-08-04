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
  const style: CSSProperties = {
    width: `${value}%`,
  };

  const barClass = classNames("flex items-center h-5", color);

  return (
    <div className="flex items-center">
      <div className="flex-grow h-5 bg-white">
        <div style={style} className={barClass}>
          <span className="ml-2 text-xs">{label}</span>
        </div>
      </div>

      <div className="ml-2 text-xs">{`${value}%`}</div>
    </div>
  );
};

interface Props {
  question: string;
  data: { [label: string]: number };
}

const BarGraph: FC<Props> = ({ data, question }) => {
  const highestValue = Math.max(...Object.values(data));
  const totalCount = Object.values(data).reduce((a, b) => a + b, 0);
  const dataInPercent = Object.keys(data).reduce(
    (a, b) => ({
      ...a,
      [b]: totalCount === 0 ? 0.0 : Math.round((data[b] / totalCount) * 100),
    }),
    {} as { [key: string]: number }
  );

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
              value={dataInPercent[label]}
              color={color}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BarGraph;
