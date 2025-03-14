import { createFileRoute } from "@tanstack/react-router";
import { useOrder } from "../../../Providers/OrderProvider";
import { useUser } from "../../../Providers/UserProvider";
import React, { useEffect } from "react";
import { OrderCard } from "../../../Components/Order/OrderCard/OrderCard";
import { SpinnerModal } from "../../../Components/SpinnerModal/SpinnerModal";
import { useActiveBtn } from "../../../Providers/ActiveBtnProvider";

export const Route = createFileRoute("/_worker/workerPage/MyOrderHistory")({
  component: RouteComponent,
});

function RouteComponent() {
  const { allOrders, isFetchingAllOrders } = useOrder();
  const { authenticatedUser } = useUser();
  const { setActiveBtn } = useActiveBtn();

  const myOrderHistory = allOrders.filter((order) => {
    return (
      order.workerId === authenticatedUser?.id &&
      (order.status === "done" || order.status === "ready")
    );
  });

  useEffect(() => {
    setActiveBtn("My Order history");
  }, []);

  if (isFetchingAllOrders) {
    return <SpinnerModal />;
  }

  if (myOrderHistory.length === 0) {
    return (
      <div className="empty-container">
        <h2>You don't have orders!</h2>
      </div>
    );
  }

  return (
    <>
      {myOrderHistory.map((order) => {
        return (
          <React.Fragment key={order.id}>
            <OrderCard order={order}>
              <div></div>
            </OrderCard>
          </React.Fragment>
        );
      })}
    </>
  );
}
