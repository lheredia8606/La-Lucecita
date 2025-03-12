import { useEffect, useState } from "react";
import "./QtyHandle.css";
import { useOrder } from "../../../Providers/OrderProvider";
import { WarningModal } from "../../WarningModal/WarningModal";
import {
  getStringFromPlainDate,
  getTodaysDate,
} from "../../../utils/TemporalDate";
type TQtyHandleProps = {
  productId: string;
  productQty: number;
  orderId: string;
};
export const QtyHandle = ({
  productId,
  productQty,
  orderId,
}: TQtyHandleProps) => {
  const [productQtyInput, setProductQtyInput] = useState(1);
  const [shouldDisplayDeleteModal, setShouldDisplayDeleteModal] =
    useState<boolean>(false);
  const { removeProductFromOrder, changeProductQtyInOrder } = useOrder();

  const changeQty = (qty: number) => {
    const newQty = productQtyInput + qty;
    if (newQty < 1) {
      setShouldDisplayDeleteModal(true);
    } else {
      changeProductQtyInOrder(orderId, productId, qty);
    }
  };

  useEffect(() => {
    setProductQtyInput(productQty);
  }, [productQty]);
  return (
    <>
      {shouldDisplayDeleteModal && (
        <WarningModal
          message="Are you sure you want to remove this item from your cart?"
          onCancel={() => {
            setShouldDisplayDeleteModal(false);
          }}
          onConfirm={() => {
            removeProductFromOrder(orderId, productId);
            setShouldDisplayDeleteModal(false);
          }}
        />
      )}
      <div className="qty-selector">
        <button
          className="qty-btn decrease"
          onClick={() => {
            changeQty(-1);
          }}
        >
          −
        </button>
        <input
          type="text"
          className="qty-input"
          value={productQtyInput}
          disabled
          readOnly
        />
        <button className="qty-btn increase" onClick={() => changeQty(+1)}>
          +
        </button>
      </div>
    </>
  );
};
