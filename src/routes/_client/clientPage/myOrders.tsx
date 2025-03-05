import { createFileRoute } from "@tanstack/react-router";
import { OrderCard } from "../../../Components/Order/OrderCard/OrderCard";
import { useOrder } from "../../../Providers/OrderProvider";
import { SpinnerModal } from "../../../Components/SpinnerModal/SpinnerModal";
import { ErrorModal } from "../../../Components/ErrorModal/ErrorModal";
import { useUser } from "../../../Providers/UserProvider";
import { useEffect, useState } from "react";
import { TOrder } from "../../../utils/ApplicationTypesAndGlobals";

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
  } = useOrder();
  const { authenticatedUser } = useUser();
  const [currentUserOrders, setCurrentUsersOrders] = useState<TOrder[]>([]);

  useEffect(() => {
    if (authenticatedUser) {
      setCurrentUsersOrders(getUserOrders(authenticatedUser.id));
    }
  }, [allOrders]);
  if (isLoadingFetchAllOrders) {
    return <SpinnerModal />;
  }
  if (isAllOrdersFetchError) {
    return (
      <ErrorModal message={allOrdersFetchError!.message} onClose={() => {}} />
    );
  }
  return (
    <>
      {currentUserOrders.length === 0 ? (
        <div>
          <h2>Create a Order to see it here!</h2>
        </div>
      ) : (
        currentUserOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))
      )}
    </>
  );
}
