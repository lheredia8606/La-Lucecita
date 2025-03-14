import { useState } from "react";
import { TButtonProps } from "../../../utils/ApplicationTypesAndGlobals";
import { CustomButton } from "../CustomButton";
import { useActiveBtn } from "../../../Providers/ActiveBtnProvider";

export const WorkerBtnContainer = () => {
  const [activeButton, setActiveButton] = useState("Unassigned Orders");
  const { activeBtn } = useActiveBtn();
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
              activeButton={activeBtn}
            />
          );
        })}
      </div>
    </>
  );
};
