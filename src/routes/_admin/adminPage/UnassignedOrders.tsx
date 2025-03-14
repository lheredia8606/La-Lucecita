import { createFileRoute } from "@tanstack/react-router";
import { useOrder } from "../../../Providers/OrderProvider";
import { OrderCard } from "../../../Components/Order/OrderCard/OrderCard";
import React, { useEffect, useState } from "react";
import { AdminAssignOrder } from "../../../Components/User/Admin/AdminAssignOrder";
import { ErrorModal } from "../../../Components/ErrorModal/ErrorModal";
import { useActiveBtn } from "../../../Providers/ActiveBtnProvider";

export const Route = createFileRoute("/_admin/adminPage/UnassignedOrders")({
  component: RouteComponent,
});

function RouteComponent() {
  const { allOrders } = useOrder();
  const { setActiveBtn } = useActiveBtn();
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  const unassigned = allOrders.filter((order) => {
    return order.status === "ordered";
  });
  useEffect(() => {
    setActiveBtn("Unassigned Orders");
  }, []);

  if (isError) {
    return (
      <ErrorModal message={errorMessage} onClose={() => setIsError(false)} />
    );
  }

  if (unassigned.length === 0) {
    return (
      <div className="empty-container">
        <h2>No unassigned orders!</h2>
      </div>
    );
  }

  return (
    <>
      {!isError &&
        unassigned.map((order) => {
          return (
            <React.Fragment key={order.id}>
              <OrderCard order={order}>
                <AdminAssignOrder
                  isError={isError}
                  setErrorMessage={setErrorMessage}
                  setIsError={setIsError}
                  orderId={order.id}
                />
              </OrderCard>
            </React.Fragment>
          );
        })}
    </>
  );
}
