import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";
import { useUser } from "../../Providers/UserProvider";
import { useEffect } from "react";
import { UserProductBtnContainer } from "../../Components/ButtonsContainer/User/UserBtnContainer";

export const Route = createFileRoute("/_client/clientPage")({
  component: RouteComponent,
});

function RouteComponent() {
  const route = useRouter();
  const { authenticatedUser } = useUser();

  useEffect(() => {
    if (!authenticatedUser || authenticatedUser.role !== "client") {
      route.navigate({ to: "/" });
    }
  });
  return (
    <>
      <UserProductBtnContainer />

      <div className="content-container">
        <Outlet />
      </div>
    </>
  );
}
