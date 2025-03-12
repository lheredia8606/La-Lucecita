import { CustomButton } from "../CustomButton";
import { TButtonProps } from "../../../utils/ApplicationTypesAndGlobals";
import { useState } from "react";

export const UserProductBtnContainer = () => {
  const [activeButton, setActiveButton] = useState("Products");
  const buttons: TButtonProps[] = [
    {
      btnText: "Products",
      navigateTo: "/clientPage/products",
    },
    {
      btnText: "My Orders",
      navigateTo: "/clientPage/myOrders",
    },
    {
      btnText: "My Cart",
      navigateTo: "/clientPage/myCart",
    },
  ];

  return (
    <>
      <div className="button-container">
        {buttons.map(({ btnText, navigateTo }) => {
          return (
            <CustomButton
              key={btnText}
              btnText={btnText}
              navigateTo={navigateTo}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
            />
          );
        })}
      </div>
    </>
  );
};
