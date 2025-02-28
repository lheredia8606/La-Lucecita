import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
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
      route.navigate({ to: "/" });
    }
  });
  return (
    <>
      <h1>Hello admin</h1>
    </>
  );
}
