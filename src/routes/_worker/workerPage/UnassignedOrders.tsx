import { createFileRoute } from "@tanstack/react-router";
import { useOrder } from "../../../Providers/OrderProvider";
import { Temporal } from "@js-temporal/polyfill";
import { OrderCard } from "../../../Components/Order/OrderCard/OrderCard";
import React from "react";
import { useUser } from "../../../Providers/UserProvider";
import { TOrder } from "../../../utils/ApplicationTypesAndGlobals";

export const Route = createFileRoute("/_worker/workerPage/UnassignedOrders")({
  component: RouteComponent,
});

function RouteComponent() {
  const { allOrders, changeOrder } = useOrder();
  const { authenticatedUser } = useUser();
  const unassignedOrders = allOrders
    .filter((order) => {
      return order.status === "ordered";
    })
    .sort((a, b) => {
      let tempA, tempB: Temporal.PlainDate;
      if (a.deadLine && b.deadLine) {
        tempA = Temporal.PlainDate.from(a.deadLine!);
        tempB = Temporal.PlainDate.from(b.deadLine!);
        return tempA.day - tempB.day;
      }
      return 1;
    });

  const onClaimClick = (orderId: string) => {
    const toUpdate: Partial<Omit<TOrder, "id">> = {
      status: "processing",
      workerId: authenticatedUser?.id,
    };
    changeOrder(orderId, toUpdate);
  };
  return (
    <>
      {unassignedOrders.map((order) => {
        return (
          <React.Fragment key={order.id}>
            <OrderCard order={order}>
              <button
                className="order-btn"
                onClick={() => onClaimClick(order.id)}
              >
                Claim
              </button>
            </OrderCard>
          </React.Fragment>
        );
      })}
    </>
  );
}
