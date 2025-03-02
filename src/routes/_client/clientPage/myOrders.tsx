import { createFileRoute } from "@tanstack/react-router";
import { OrderCard } from "../../../Components/Order/OrderCard/OrderCard";
import { useOrder } from "../../../Providers/OrderProvider";
import { SpinnerModal } from "../../../Components/SpinnerModal/SpinnerModal";
import { ErrorModal } from "../../../Components/ErrorModal/ErrorModal";

export const Route = createFileRoute("/_client/clientPage/myOrders")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    allOrders,
    allOrdersFetchError,
    isAllOrdersFetchError,
    isLoadingFetchAllOrders,
  } = useOrder();

  if (isLoadingFetchAllOrders) {
    return <SpinnerModal />;
  }
  if (isAllOrdersFetchError) {
    return (
      <ErrorModal message={allOrdersFetchError!.message} onClose={() => {}} />
    );
  }
  return (
    <>{allOrders?.map((order) => <OrderCard key={order.id} order={order} />)}</>
  );
}
