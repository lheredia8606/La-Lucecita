import "./buttons-container.css";
import { TButtonProps } from "../../utils/ApplicationTypesAndGlobals";
import { useRouter } from "@tanstack/react-router";

type TCustomButtonProps = {
  btnText: string;
  navigateTo: string;
  activeButton: string;
};

export const CustomButton = ({
  btnText,
  navigateTo,
  activeButton,
}: TCustomButtonProps) => {
  const router = useRouter();
  return (
    <>
      <button
        className={
          btnText === activeButton ? "custom-btn active" : "custom-btn"
        }
        onClick={() => {
          router.navigate({ to: navigateTo });
        }}
      >
        {btnText}
      </button>
    </>
  );
};
