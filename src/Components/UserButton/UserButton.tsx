import { ButtonHTMLAttributes } from "react";
import "./user-button.css";

type TButtonProps = {
  buttonProps: ButtonHTMLAttributes<HTMLButtonElement>;
  btnText: string;
};
export const UserButton = ({ buttonProps, btnText }: TButtonProps) => {
  return (
    <>
      <button className="user-btn" {...buttonProps}>
        {btnText}
      </button>
    </>
  );
};
