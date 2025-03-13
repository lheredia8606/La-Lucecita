import { createFileRoute } from "@tanstack/react-router";
import { useOrder } from "../../../Providers/OrderProvider";
import { OrderCard } from "../../../Components/Order/OrderCard/OrderCard";
import React, { useState } from "react";
import { AdminAssignOrder } from "../../../Components/User/Admin/AdminAssignOrder";

export const Route = createFileRoute("/_admin/adminPage/UnassignedOrders")({
  component: RouteComponent,
});

function RouteComponent() {
  const { allOrders } = useOrder();

  const unassigned = allOrders.filter((order) => {
    return order.status === "ordered";
  });

  return (
    <>
      {unassigned.map((order) => {
        return (
          <React.Fragment key={order.id}>
            <OrderCard order={order}>
              <AdminAssignOrder />
            </OrderCard>
          </React.Fragment>
        );
      })}
    </>
  );
}
