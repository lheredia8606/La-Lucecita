import { useState } from "react";
import { TButtonProps } from "../../../utils/ApplicationTypesAndGlobals";
import { CustomButton } from "../CustomButton";

export const WorkerBtnContainer = () => {
  const [activeButton, setActiveButton] = useState("Unassigned Orders");
  const buttons: TButtonProps[] = [
    {
      btnText: "Unassigned Orders",
      navigateTo: "/workerPage/UnassignedOrders",
    },
    {
      btnText: "My Orders",
      navigateTo: "/workerPage/MyOrders",
    },
    {
      btnText: "My Order history",
      navigateTo: "/workerPage/MyOrderHistory",
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
