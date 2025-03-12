import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";
import { useUser } from "../../Providers/UserProvider";
import { useEffect } from "react";
import { UserProductBtnContainer } from "../../Components/ButtonsContainer/User/UserBtnContainer";
import { WorkerBtnContainer } from "../../Components/ButtonsContainer/Worker/WorkerBtnContainer";

export const Route = createFileRoute("/_worker/workerPage")({
  component: RouteComponent,
});

function RouteComponent() {
  const route = useRouter();
  const { authenticatedUser } = useUser();

  useEffect(() => {
    if (!authenticatedUser || authenticatedUser.role !== "worker") {
      route.navigate({ to: "/" });
    }
  });
  return (
    <>
      <WorkerBtnContainer />
      <div className="content-container">
        <Outlet />
      </div>
    </>
  );
}
