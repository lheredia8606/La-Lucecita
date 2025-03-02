import "./buttons-container.css";
import { TButtonProps } from "../../utils/ApplicationTypesAndGlobals";
import { useRouter } from "@tanstack/react-router";

export const CustomButton = ({
  btnText,
  navigateTo,
  activeButton,
  setActiveButton,
}: TButtonProps) => {
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
