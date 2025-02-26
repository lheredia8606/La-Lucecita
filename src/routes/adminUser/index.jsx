import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { UserButton } from "../../Components/UserButton/UserButton";
import "./style.css";
import { useEffect } from "react";
import { useUser } from "../../Providers/UserProvider";

export const Route = createFileRoute("/adminUser/")({
  component: UserRoute,
});

function UserRoute() {
  const { authenticatedUser } = useUser();
  const route = useRouter();

  useEffect(() => {
    if (!authenticatedUser || authenticatedUser.role !== "admin") {
      route.navigate({ to: "/home" });
    }
  });
  return (
    <>
      <div className="user-container">
        <div className="button-container">
          <UserButton btnText="Button1" />
          <UserButton btnText="Button2" />
          <UserButton btnText="Button3" />
          <UserButton btnText="button4" />
        </div>
        <div className="content-container">Hello</div>
      </div>
    </>
  );
}
