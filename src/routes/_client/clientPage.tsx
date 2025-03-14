import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";
import { useUser } from "../../Providers/UserProvider";
import { useEffect } from "react";
import { UserProductBtnContainer } from "../../Components/ButtonsContainer/User/UserBtnContainer";
import { ActiveBtnProvider } from "../../Providers/ActiveBtnProvider";

export const Route = createFileRoute("/_client/clientPage")({
  component: RouteComponent,
  context: () => {
    return { sd: "Hello from parent!" };
  },
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
      <ActiveBtnProvider>
        <UserProductBtnContainer />
        <div className="content-container">
          <Outlet />
        </div>
      </ActiveBtnProvider>
    </>
  );
}
