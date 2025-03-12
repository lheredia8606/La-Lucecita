import { createFileRoute } from "@tanstack/react-router";
import { useOrder } from "../../../Providers/OrderProvider";
import { useUser } from "../../../Providers/UserProvider";
import React from "react";
import { OrderCard } from "../../../Components/Order/OrderCard/OrderCard";
import { TOrder } from "../../../utils/ApplicationTypesAndGlobals";

export const Route = createFileRoute("/_worker/workerPage/MyOrders")({
  component: RouteComponent,
});

function RouteComponent() {
  const { allOrders, changeOrder } = useOrder();
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
