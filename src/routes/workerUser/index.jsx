import { createFileRoute, useRouter } from "@tanstack/react-router";
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
      <h1>Hello worker</h1>
    </>
  );
}
