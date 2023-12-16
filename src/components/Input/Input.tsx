import React from "react";
import "./Input.css";


export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const InputText = (props: InputProps) => {
  return <input className="inputComp" {...props}></input>;
};

export default InputText;
