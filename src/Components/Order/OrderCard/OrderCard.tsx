import { ReactNode } from "@tanstack/react-router";
import { TOrder } from "../../../utils/ApplicationTypesAndGlobals";
import {
  getDateFromString,
  getDaysUntilDeathLine,
  getFormattedDate,
} from "../../../utils/TemporalDate";
import { OrderProdTable } from "../ProductTable/OrderProdTable";
import "./OrderCard.css";

type TOrderCardProps = {
  order: TOrder;
  children: ReactNode;
};
export const OrderCard = ({
  order: { id, status, productQty, deadLine },
  children,
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

  const getDeadLineText = (deadLine: string | null): string => {
    if (!deadLine) {
      return "-";
    } else {
      const deadLineDate = getDateFromString(deadLine);
      const remainingDays = getDaysUntilDeathLine(deadLineDate);
      if (remainingDays < 1) {
        return `${getFormattedDate(deadLineDate)} (Expired)`;
      } else {
        return (
          `${getFormattedDate(deadLineDate)} (${remainingDays} Day` +
          `${remainingDays === 1 ? "" : "s"} )`
        );
      }
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
            <span className="deadline-time">{getDeadLineText(deadLine)}</span>
          </p>
        </div>
        <OrderProdTable products={productQty} />
        {children}
      </div>
    </>
  );
};
