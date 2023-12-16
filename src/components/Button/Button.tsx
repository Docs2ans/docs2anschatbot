import React from "react";
import "./Button.css";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string;
}

const Button = ({ label, ...others }: ButtonProps) => {
  return (
    <button className="buttonComp" {...others}>
      {label}
    </button>
  );
};

export default Button;
