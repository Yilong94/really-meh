import classNames from "classnames";
import { FC } from "react";

interface Props {
  className?: string;
}

const ResponsiveContainer: FC<Props> = ({ children, className }) => {
  const responsiveContainerClass = classNames({
    "container mx-auto": true,
    ...(className && { [className]: true }),
  });
  return <div className={responsiveContainerClass}>{children}</div>;
};

export default ResponsiveContainer;
