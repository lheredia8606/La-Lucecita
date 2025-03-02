import { useRouter } from "@tanstack/react-router";
import { CustomButton } from "../CustomButton";
import { TButtonProps } from "../../../utils/ApplicationTypesAndGlobals";
import { useState } from "react";

export const UserProductBtnContainer = () => {
  const [activeButton, setActiveButton] = useState("Products");
  const buttons: TButtonProps[] = [
    {
      btnText: "Products",
      navigateTo: "/clientPage/products",
      activeButton,
      setActiveButton,
    },
    {
      btnText: "My Orders",
      navigateTo: "/clientPage/myOrders",

      activeButton,
      setActiveButton,
    },
    {
      btnText: "My Cart",
      navigateTo: "/clientPage/myCart",

      activeButton,
      setActiveButton,
    },
  ];

  return (
    <>
      <div className="button-container">
        {buttons.map(
          ({
            btnText,

            navigateTo,
            activeButton,
            setActiveButton,
          }) => {
            return (
              <CustomButton
                key={btnText}
                btnText={btnText}
                navigateTo={navigateTo}
                activeButton={activeButton}
                setActiveButton={setActiveButton}
              />
            );
          }
        )}
      </div>
    </>
  );
};
