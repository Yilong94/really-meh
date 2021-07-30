import { FC } from "react";

const ResponsiveContainer: FC = ({ children }) => {
  return <div className="grid grid-cols-1 p-4">{children}</div>;
};

export default ResponsiveContainer;
