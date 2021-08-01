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
      <div className="h-5 bg-white flex-grow">
        <div style={style} className="h-5 bg-gray-400 flex items-center">
          <span className="absolute ml-2 text-xs">{label}</span>
        </div>
      </div>

      <div className="text-xs ml-2">{`${roundedValue}%`}</div>
    </div>
  );
};

interface Props {
  question: string;
  data: { [label: string]: number };
}

const BarGraph: FC<Props> = ({ data, question }) => {
  return (
    <div className="border-2 p-2">
      <div className="text-sm font-bold mb-2">{question}</div>
      <div className="space-y-1">
        {Object.keys(data).map((label, index) => {
          return <BarColumn key={index} label={label} value={data[label]} />;
        })}
      </div>
    </div>
  );
};

export default BarGraph;
