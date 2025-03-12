import "./buttons-container.css";
import { TButtonProps } from "../../utils/ApplicationTypesAndGlobals";
import { useRouter } from "@tanstack/react-router";

type TCustomButtonProps = {
  btnText: string;
  navigateTo: string;
  activeButton: string;
  setActiveButton: (activeButton: string) => void;
};

export const CustomButton = ({
  btnText,
  navigateTo,
  activeButton,
  setActiveButton,
}: TCustomButtonProps) => {
  const router = useRouter();
  return (
    <>
      <button
        className={
          btnText === activeButton ? "custom-btn active" : "custom-btn"
        }
        onClick={() => {
          setActiveButton(btnText);
          router.navigate({ to: navigateTo });
        }}
      >
        {btnText}
      </button>
    </>
  );
};
