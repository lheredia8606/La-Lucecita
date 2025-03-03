import {
  isEmailValid,
  isNameValid,
} from "../../../utils/Validations/User/UserValidation";
import { CustomRegularInputs } from "./CustomRegularInputs";

type TCustomRegularInputsGroupProps = {
  setFirstNameInput: (firstName: string) => void;
  firstNameInput: string;
  setLastNameInput: (lastName: string) => void;
  lastNameInput: string;
  setEmailInput: (email: string) => void;
  emailInput: string;
  wasTriedToSubmit: boolean;
  passwordInput: string;
  setPasswordInput: (password: string) => void;
};
type TCustomInputsProps = {
  labelText: string;
  id: string;
  inputType: string;
  validationFn: (isValid: string) => boolean;
  stateValue: string;
  placeHolder: string;
  setStateValue: (newState: string) => void;
};

export const CustomRegularInputsGroup = ({
  setFirstNameInput,
  firstNameInput,
  setLastNameInput,
  lastNameInput,
  setEmailInput,
  emailInput,
  wasTriedToSubmit,
  passwordInput,
  setPasswordInput,
}: TCustomRegularInputsGroupProps) => {
  const inputs: TCustomInputsProps[] = [
    {
      id: "name",
      inputType: "text",
      labelText: "First Name:",
      placeHolder: "Enter your first name",
      setStateValue: setFirstNameInput,
      stateValue: firstNameInput,
      validationFn: isNameValid,
    },
    {
      id: "lastName",
      inputType: "text",
      labelText: "Last Name:",
      placeHolder: "Enter your last name",
      setStateValue: setLastNameInput,
      stateValue: lastNameInput,
      validationFn: isNameValid,
    },
    {
      id: "email",
      inputType: "text",
      labelText: "Email:",
      placeHolder: "Enter your email",
      setStateValue: setEmailInput,
      stateValue: emailInput,
      validationFn: isEmailValid,
    },
    {
      id: "password",
      inputType: "password",
      labelText: "Password:",
      placeHolder: "Enter your password",
      setStateValue: setPasswordInput,
      stateValue: passwordInput,
      validationFn: isNameValid,
    },
  ];
  return (
    <>
      {inputs.map((input) => {
        return (
          <CustomRegularInputs
            key={input.id}
            id={input.id}
            labelValue={input.labelText}
            inputProps={{
              type: input.inputType,
              className:
                wasTriedToSubmit && !input.validationFn(input.stateValue)
                  ? "red-border"
                  : "",
              placeholder: input.placeHolder,
              value: input.stateValue,
              onChange: (e) => input.setStateValue(e.target.value),
            }}
          />
        );
      })}
    </>
  );
};
