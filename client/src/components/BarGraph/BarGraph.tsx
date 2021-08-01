import { CSSProperties, FC } from "react";

interface BarColumnProps {
  value: number;
  label: string;
}

const BarColumn: FC<BarColumnProps> = ({ value, label }) => {
  const roundedValue = Math.round(value * 100);

  const style: CSSProperties = {
    width: `${roundedValue}%`,
  };

  return (
    <div className="flex items-center">
      <div className="flex-grow h-5 bg-white">
        <div style={style} className="flex items-center h-5 bg-gray-400">
          <span className="absolute ml-2 text-xs">{label}</span>
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
  return (
    <div className="p-2 border border-black">
      <div className="mb-2 text-sm font-bold">{question}</div>
      <div className="space-y-1">
        {Object.keys(data).map((label, index) => {
          return <BarColumn key={index} label={label} value={data[label]} />;
        })}
      </div>
    </div>
  );
};

export default BarGraph;
