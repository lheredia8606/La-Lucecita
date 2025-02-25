import {
  createFileRoute,
  useLoaderData,
  useParams,
} from "@tanstack/react-router";
import { apiUser } from "../../utils/ApplicationTypesAndGlobals";

export const Route = createFileRoute("/users/$userId")({
  component: RouteComponent,
  loader: ({ params }) => {
    return apiUser.get(params.userId);
  },
  pendingComponent: () => <div>Loading</div>,
});

function RouteComponent() {
  const { name } = Route.useLoaderData();
  return <div>Hello {name}</div>;
}
