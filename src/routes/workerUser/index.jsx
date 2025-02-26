import { createFileRoute, useRouter } from "@tanstack/react-router";
import { UserButton } from "../../Components/UserButton/UserButton";
import { useUser } from "../../Providers/UserProvider";
import { useEffect } from "react";

export const Route = createFileRoute("/workerUser/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { authenticatedUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!authenticatedUser || authenticatedUser.role !== "worker") {
      router.navigate({ to: "/" });
    }
  });
  return (
    <>
      <div className="user-container">
        <div className="button-container">
          <UserButton btnText="My orders" />
          <UserButton btnText="Active orders" />
          <UserButton btnText="Button3" />
          <UserButton btnText="button4" />
        </div>
        <div className="content-container">Hello</div>
      </div>
    </>
  );
}
