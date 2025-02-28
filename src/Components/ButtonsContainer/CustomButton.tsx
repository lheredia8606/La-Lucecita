import { ButtonHTMLAttributes } from "react";
import "./custom-button.css";

type TButtonProps = {
  buttonProps: ButtonHTMLAttributes<HTMLButtonElement>;
  btnText: string;
};
export const CustomButton = ({ buttonProps, btnText }: TButtonProps) => {
  return (
    <>
      <button className="custom-btn" {...buttonProps}>
        {btnText}
      </button>
    </>
  );
};
