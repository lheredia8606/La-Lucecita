import { createFileRoute, Link } from "@tanstack/react-router";
import { useUser } from "../../Providers/UserProvider";
import { SpinnerModal } from "../../Components/SpinnerModal/SpinnerModal";

export const Route = createFileRoute("/users/")({
  component: UserRoute,
});

function UserRoute() {
  const { allUsers, isLoadingUsers } = useUser();

  return (
    <>
      {isLoadingUsers && <SpinnerModal />}
      {!isLoadingUsers &&
        allUsers.map((user) => {
          return (
            <div key={user.id}>
              <Link to="/users/$userId" params={{ userId: user.id }}>
                {user.name}
              </Link>
            </div>
          );
        })}
    </>
  );
}
