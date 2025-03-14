import React, { useState } from "react";
import { useUser } from "../../../Providers/UserProvider";
import { ErrorModal } from "../../ErrorModal/ErrorModal";
import { TOrder } from "../../../utils/ApplicationTypesAndGlobals";
import { useOrder } from "../../../Providers/OrderProvider";

type TAdminAssignOrderProps = {
  orderId: string;
  isError: boolean;
  setIsError: (isError: boolean) => void;
  setErrorMessage: (errorMessage: string) => void;
};

export const AdminAssignOrder = ({
  orderId,
  isError,
  setErrorMessage,
  setIsError,
}: TAdminAssignOrderProps) => {
  const [workerId, setWorkerId] = useState("");
  const { allUsers } = useUser();
  const { changeOrder } = useOrder();
  const workers = allUsers?.filter((user) => {
    return user.role === "worker";
  });

  const onAssignClick = (orderId: string) => {
    const worker = allUsers?.find((user) => {
      return user.id === workerId;
    });
    if (!worker) {
      setErrorMessage(`No worker found with id "${workerId}"`);
      setIsError(true);
    }
    const newOrder: Partial<Omit<TOrder, "id">> = {
      workerId,
      status: "processing",
    };
    changeOrder(orderId, newOrder);
  };

  return (
    <>
      {!isError && (
        <div id="admin-assign-container">
          <input
            list="worker-names"
            type="text"
            placeholder="Worker name"
            value={workerId}
            onChange={(e) => setWorkerId(e.target.value)}
          />
          <datalist id="worker-names">
            {workers?.map((worker) => {
              return (
                <React.Fragment key={worker.id}>
                  <option value={worker.id}>
                    {`${worker.firstName} ${worker.lastName}`}
                  </option>
                </React.Fragment>
              );
            })}
          </datalist>
          <button className="order-btn" onClick={() => onAssignClick(orderId)}>
            Assign
          </button>
        </div>
      )}
    </>
  );
};
