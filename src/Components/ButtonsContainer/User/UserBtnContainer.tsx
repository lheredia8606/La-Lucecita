import { CustomButton } from "../CustomButton";
import { TButtonProps } from "../../../utils/ApplicationTypesAndGlobals";
import { useActiveBtn } from "../../../Providers/ActiveBtnProvider";

export const UserProductBtnContainer = () => {
  const { activeBtn, setActiveBtn } = useActiveBtn();
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
              activeButton={activeBtn}
            />
          );
        })}
      </div>
    </>
  );
};
