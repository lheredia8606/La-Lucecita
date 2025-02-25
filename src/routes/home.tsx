import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/home")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <h1>Welcome to Our Website</h1>
      <p>
        This is a simple React webpage layout with a navbar, main content area,
        and a footer.
      </p>
    </>
  );
}
