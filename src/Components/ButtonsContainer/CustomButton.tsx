import "./buttons-container.css";
import { TButtonProps } from "../../utils/ApplicationTypesAndGlobals";
import { useRouter } from "@tanstack/react-router";

export const CustomButton = ({
  buttonProps,
  btnText,
  navigateTo,
}: TButtonProps) => {
  const router = useRouter();
  return (
    <>
      <button
        {...buttonProps}
        onClick={() => {
          router.navigate({ to: navigateTo });
        }}
      >
        {btnText}
      </button>
    </>
  );
};
