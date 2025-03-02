import { TOrder } from "../../../utils/ApplicationTypesAndGlobals";
import { OrderProdTable } from "../ProductTable/OrderProdTable";
import "./OrderCard.css";

type TOrderCardProps = {
  order: TOrder;
};
export const OrderCard = ({
  order: { id, status, productQty },
}: TOrderCardProps) => {
  const getStatusClassName = (): string => {
    switch (status) {
      case "in_cart":
        return "status-in-cart";
      case "ordered":
        return "status-pending";
      case "processing":
        return "status-processing";
      case "ready":
      case "done":
        return "status-complete";
    }
  };
  return (
    <>
      <div className="order-card">
        <div className="order-info">
          <div className="order-info-header">
            <h2 className="order-id">{id}</h2>
            <p className="order-status">
              Status: <span className={getStatusClassName()}>{status}</span>
            </p>
          </div>
          <p className="order-deadline">
            Deadline:{" "}
            <span className="deadline-time">2025-03-05T15:00:00Z</span>
          </p>
        </div>
        <OrderProdTable products={productQty} />
        <button className="view-order-btn">View Order</button>
      </div>
    </>
  );
};
