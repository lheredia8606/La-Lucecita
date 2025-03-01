import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/layouts/visibleLayout")({
  beforeLoad: ({ location: { pathname } }) => {
    if (pathname === "/layouts/visibleLayout")
      throw redirect({ to: "/layouts/visibleLayout/foo" });
  },
  component: () => (
    <div>
      <p>This layout is visible in the URL 👀</p>
      <Link
        to="/layouts/visibleLayout/foo"
        className="underline hover:no-underline"
      >
        Foo
      </Link>{" "}
      <Link
        to="/layouts/visibleLayout/bar"
        className="underline hover:no-underline"
      >
        Bar
      </Link>
      <Outlet />
    </div>
  ),
  notFoundComponent: () => (
    <div>I'm the Not found page, inside /visibleLayout</div>
  ),
});
