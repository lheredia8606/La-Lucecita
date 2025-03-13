import "../styles/modal/modal-style.css";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { CustomRegularInputsGroup } from "../Components/RegisterModalPage/RegularInputs/CustomRegularInputsGroup";
import { isUserValid } from "../utils/Validations/User/UserValidation";
import { TUser } from "../utils/ApplicationTypesAndGlobals";
import { PhoneInputGroup } from "../Components/RegisterModalPage/PhoneInputs/PhoneInputGroup";
import { useUser } from "../Providers/UserProvider";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const { addUserMutation } = useUser();
  const router = useRouter();
  const [firstNameInput, setFirstNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [roleInput, setRoleInput] = useState<string>("client");
  const [phoneInput, setPhoneInput] = useState<[string, string, string]>([
    "",
    "",
    "",
  ]);
  const [wasTriedToSubmit, setWasTriedToSubmit] = useState<boolean>(false);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: Omit<TUser, "id"> = {
      email: emailInput,
      firstName: firstNameInput,
      isActive: true,
      lastName: lastNameInput,
      password: passwordInput,
      phone: phoneInput,
      role: roleInput as "client" | "worker" | "admin",
    };

    if (isUserValid(user)) {
      console.log("submitting");
      addUserMutation.mutate(user);
      router.navigate({ to: "/login" });
    }
    setWasTriedToSubmit(true);
  };

  return (
    <>
      <div id="registerModal" className="modal" style={{ display: "flex" }}>
        <div className="modal-content">
          <button
            className="close-btn"
            onClick={() => {
              router.navigate({ to: "/" });
            }}
          >
            X
          </button>
          <form method="POST" onSubmit={(e) => onFormSubmit(e)}>
            <h2>Register</h2>
            <CustomRegularInputsGroup
              emailInput={emailInput}
              firstNameInput={firstNameInput}
              lastNameInput={lastNameInput}
              setEmailInput={setEmailInput}
              setFirstNameInput={setFirstNameInput}
              setLastNameInput={setLastNameInput}
              wasTriedToSubmit={wasTriedToSubmit}
              passwordInput={passwordInput}
              setPasswordInput={setPasswordInput}
            />

            <div className="input-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                disabled
                value={roleInput}
                onChange={(e) => {
                  setRoleInput(e.target.value);
                }}
              >
                <option value="client">Client</option>
                <option value="worker">Worker</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <PhoneInputGroup
              phoneInput={phoneInput}
              setPhoneInput={setPhoneInput}
              wasTriedToSubmit={wasTriedToSubmit}
            />
            <button type="submit" className="login-btn">
              Register
            </button>
            <Link to="/login" className="register-link">
              Already have an account? Login
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
