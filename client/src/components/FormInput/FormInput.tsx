import classNames from "classnames";
import { CSSProperties } from "react";
import { FC, ReactNode } from "react";

interface Props {
  type?:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week"
    | "dropdown";
  placeholder?: string;
  Component?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const FormInput: FC<Props> = ({
  type,
  placeholder,
  Component,
  className,
  style,
}) => {
  const containerClass = classNames({
    "px-4 py-2 mt-2 text-sm border border-black rounded-md": true,
    ...(className && { [className]: true }),
  });

  return (
    <div style={style} className={containerClass}>
      {Component ? (
        Component
      ) : (
        <input type={type} className="w-full" placeholder={placeholder} />
      )}
    </div>
  );
};

export default FormInput;
