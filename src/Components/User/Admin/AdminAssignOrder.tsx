import React, { useState } from "react";
import { useUser } from "../../../Providers/UserProvider";

export const AdminAssignOrder = () => {
  const [workerName, setWorkerName] = useState("");
  const { allUsers } = useUser();
  const workers = allUsers?.filter((user) => {
    return user.role === "worker";
  });

  const onAssignClick = () => {
    console.log(workerName);
  };
  return (
    <>
      <div id="admin-assign-container">
        <input
          list="worker-names"
          type="text"
          placeholder="Worker name"
          value={workerName}
          onChange={(e) => setWorkerName(e.target.value)}
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
        <button className="order-btn" onClick={() => onAssignClick()}>
          Assign
        </button>
      </div>
    </>
  );
};
