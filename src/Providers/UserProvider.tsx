import { ReactNode, useRouter } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useState } from "react";
import { apiUser, TUser } from "../utils/ApplicationTypesAndGlobals";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

type TUserContextProps = {
  allUsers: TUser[] | undefined;
  isLoadingUsers: boolean;
  createUser: (newUser: Omit<TUser, "id">) => void;
  deleteUser: (id: string) => void;
  authenticatedUser: TUser | null;
  authenticate: (email: string, password: string) => void;
  setAuthenticatedUser: (user: TUser | null) => void;
  addUserMutation: UseMutationResult<TUser, Error, Omit<TUser, "id">, unknown>;
};

type TUpdateMutationParams = {
  id: string;
  user: Omit<Partial<TUser>, "id">;
};

const UserContext = createContext<TUserContextProps>({} as TUserContextProps);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [allUsers, setAllUsers] = useState<TUser[]>([]);
  const [authenticatedUser, setAuthenticatedUser] = useState<TUser | null>(
    null
  );

  const authenticate = (email: string, password: string) => {
    const user = allUsers.find((user) => {
      return user.email.toLowerCase() === email.toLowerCase();
    });
    if (!user) {
      throw new Error("No user found!");
    } else if (user.password !== password) {
      throw new Error("Wrong Password!");
    } else {
      setAuthenticatedUser(user);
    }
  };

  const { data: allUsersData, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["fetchAllUsers"],
    queryFn: () => apiUser.getAll(),
  });

  const addUserMutation = useMutation({
    mutationFn: (user: Omit<TUser, "id">) => apiUser.post(user),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["fetchAllUsers"] }),
    onError: () => {
      console.log("Need to handle adUser in register, there was an error");
    },
  });

  const createUserMutation = useMutation({
    mutationFn: (newUser: Omit<TUser, "id">) => {
      return apiUser.post(newUser);
    },
    onError: () => {
      throw new Error("Error creating User");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchAllUsers"] });
    },
  });
  const createUser = (newUser: Omit<TUser, "id">) => {
    createUserMutation.mutate(newUser);
  };

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => apiUser.delete(id),
    onError: (e) => {
      throw new Error(e.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetchAllUsers"],
      });
    },
  });
  const deleteUser = (id: string) => {
    deleteUserMutation.mutate(id);
  };

  const updateUserMutation = useMutation({
    mutationFn: ({ id, user }: TUpdateMutationParams) => {
      return apiUser.update(id, user);
    },
    onError: () => {
      throw new Error("Error trying to update user");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchAllUsers"] });
    },
  });
  const updateUser = (id: string, user: Omit<Partial<TUser>, "id">) => {
    updateUserMutation.mutate({ id, user });
  };

  const isUserEmailUsed = (email: string): boolean => {
    return !!allUsers.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  };

  useEffect(() => {
    if (allUsersData) {
      setAllUsers(allUsersData);
    }
  }, [allUsersData]);

  return (
    <>
      <UserContext.Provider
        value={{
          allUsers,
          isLoadingUsers,
          createUser,
          deleteUser,
          authenticatedUser,
          authenticate,
          setAuthenticatedUser,
          addUserMutation,
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser should be used inside UserProvider");
  }
  return context;
};
