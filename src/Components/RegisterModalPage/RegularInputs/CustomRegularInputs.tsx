import { InputHTMLAttributes } from "react";

type TCustomRegularInputsProps = {
  id: string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  labelValue: string;
};
export const CustomRegularInputs = ({
  id,
  inputProps,
  labelValue,
}: TCustomRegularInputsProps) => {
  return (
    <>
      <div className="input-group">
        <label htmlFor={id}>{labelValue}</label>
        <input id={id} {...inputProps} />
      </div>
    </>
  );
};
