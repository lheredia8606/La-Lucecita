import { useState } from "react";
import { CustomButton } from "./CustomButton";
type TActiveButtons = "products" | "myOrder" | "inCart";

export const ButtonContainer = () => {
  const [activeButton, setActiveButton] = useState<TActiveButtons>("products");
  const changeActiveButton = (activeBtn: TActiveButtons) => {
    setActiveButton(activeBtn);
  };
  return (
    <>
      <div className="button-container">
        <CustomButton
          btnText="Products"
          buttonProps={{
            className:
              activeButton === "products" ? "custom-btn active" : "custom-btn",
            onClick: () => setActiveButton("products"),
          }}
        />
        <CustomButton
          btnText="My Orders"
          buttonProps={{
            className:
              activeButton === "myOrder" ? "custom-btn active" : "custom-btn",
            onClick: () => setActiveButton("myOrder"),
          }}
        />
        <CustomButton
          btnText="In Cart"
          buttonProps={{
            className:
              activeButton === "inCart" ? "custom-btn active" : "custom-btn",
            onClick: () => setActiveButton("inCart"),
          }}
        />
      </div>
    </>
  );
};
