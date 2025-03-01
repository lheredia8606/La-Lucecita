import { useRouter } from "@tanstack/react-router";
import { CustomButton } from "../CustomButton";
import { TButtonProps } from "../../../utils/ApplicationTypesAndGlobals";

const buttons: TButtonProps[] = [
  {
    btnText: "Products",
    navigateTo: "/clientPage/products",
    buttonProps: {
      className: "custom-btn active",
    },
  },
  {
    btnText: "My Orders",
    navigateTo: "/clientPage/myOrders",
    buttonProps: {
      className: "custom-btn",
    },
  },
  {
    btnText: "My Cart",
    navigateTo: "/clientPage/myCart",
    buttonProps: {
      className: "custom-btn",
    },
  },
];
export const UserProductBtnContainer = () => {
  return (
    <>
      <div className="button-container">
        {buttons.map(({ btnText, buttonProps, navigateTo }) => {
          return (
            <CustomButton
              key={btnText}
              btnText={btnText}
              buttonProps={buttonProps}
              navigateTo={navigateTo}
            />
          );
        })}
      </div>
    </>
  );
};
