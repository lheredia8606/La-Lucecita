import { createFileRoute } from "@tanstack/react-router";
import { useActiveBtn } from "../../../Providers/ActiveBtnProvider";
import { useEffect } from "react";
import { useOrder } from "../../../Providers/OrderProvider";

export const Route = createFileRoute("/_admin/adminPage/PendingOrders")({
  component: RouteComponent,
});
function RouteComponent() {
  const { setActiveBtn } = useActiveBtn();
  const { getOrdersByStatus, sortOrdersByDeadline } = useOrder();
  const pendingOrders = sortOrdersByDeadline(getOrdersByStatus("processing"));
  useEffect(() => {
    setActiveBtn("Pending Orders");
  }, []);
  return <div>Hello "/_admin/adminPage/PendingOrders"!</div>;
}
