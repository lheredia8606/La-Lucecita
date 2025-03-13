import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";
import { useUser } from "../../Providers/UserProvider";
import { useEffect } from "react";
import { AdminBtnContainer } from "../../Components/ButtonsContainer/Admin/AdminBtnContainer";

export const Route = createFileRoute("/_admin/adminPage")({
  component: RouteComponent,
});

function RouteComponent() {
  const route = useRouter();
  const { authenticatedUser } = useUser();

  useEffect(() => {
    if (!authenticatedUser || authenticatedUser.role !== "admin") {
      route.navigate({ to: "/" });
    }
  });
  return (
    <>
      <AdminBtnContainer />
      <div className="content-container">
        <Outlet />
      </div>
    </>
  );
}
