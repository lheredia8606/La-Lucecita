import { createFileRoute } from "@tanstack/react-router";
import { useOrder } from "../../../Providers/OrderProvider";
import { useUser } from "../../../Providers/UserProvider";
import React from "react";
import { OrderCard } from "../../../Components/Order/OrderCard/OrderCard";
import { TOrder } from "../../../utils/ApplicationTypesAndGlobals";
import { SpinnerModal } from "../../../Components/SpinnerModal/SpinnerModal";

export const Route = createFileRoute("/_worker/workerPage/MyOrders")({
  component: RouteComponent,
});

function RouteComponent() {
  const { allOrders, changeOrder, isFetchingAllOrders } = useOrder();
  const { authenticatedUser } = useUser();
  const myOrders = allOrders.filter((order) => {
    return (
      order.workerId === authenticatedUser?.id && order.status === "processing"
    );
  });

  const onMarkClick = (orderId: string) => {
    const toUpdate: Partial<Omit<TOrder, "id">> = {
      status: "ready",
    };
    changeOrder(orderId, toUpdate);
  };

  if (isFetchingAllOrders) {
    return <SpinnerModal />;
  }

  if (myOrders.length === 0) {
    return (
      <div className="empty-container">
        <h2>You don't have orders!</h2>
      </div>
    );
  }

  return (
    <>
      {myOrders.map((order) => {
        return (
          <React.Fragment key={order.id}>
            <OrderCard order={order}>
              <button
                className="order-btn"
                onClick={() => onMarkClick(order.id)}
              >
                Mark as done
              </button>
            </OrderCard>
          </React.Fragment>
        );
      })}
    </>
  );
}
