import { createFileRoute } from "@tanstack/react-router";
import { OrderCard } from "../../../Components/Order/OrderCard/OrderCard";
import { useOrder } from "../../../Providers/OrderProvider";
import { SpinnerModal } from "../../../Components/SpinnerModal/SpinnerModal";
import { ErrorModal } from "../../../Components/ErrorModal/ErrorModal";
import { useUser } from "../../../Providers/UserProvider";
import { useEffect, useState } from "react";
import { TOrder } from "../../../utils/ApplicationTypesAndGlobals";
import { useActiveBtn } from "../../../Providers/ActiveBtnProvider";

export const Route = createFileRoute("/_client/clientPage/myOrders")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    allOrders,
    getUserOrders,
    allOrdersFetchError,
    isAllOrdersFetchError,
    isLoadingFetchAllOrders,
    isFetchingAllOrders,
  } = useOrder();
  const { setActiveBtn } = useActiveBtn();
  const { authenticatedUser } = useUser();
  const [currentUserOrders, setCurrentUsersOrders] = useState<TOrder[]>([]);

  useEffect(() => {
    setActiveBtn("My Orders");
  }, []);

  useEffect(() => {
    if (authenticatedUser) {
      setCurrentUsersOrders(getUserOrders(authenticatedUser.id));
    }
  }, [allOrders]);
  if (isLoadingFetchAllOrders || isFetchingAllOrders) {
    return <SpinnerModal />;
  }
  if (isAllOrdersFetchError) {
    return (
      <ErrorModal message={allOrdersFetchError!.message} onClose={() => {}} />
    );
  }

  currentUserOrders;
  return (
    <>
      {currentUserOrders.map((order) => (
        <OrderCard key={order.id} order={order}>
          <button className="order-btn">View Order</button>
        </OrderCard>
      ))}
    </>
  );
}
