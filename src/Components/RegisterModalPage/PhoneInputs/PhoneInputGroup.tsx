import { ChangeEvent, useRef } from "react";
import { phoneInputMaxLength } from "../../../utils/ApplicationTypesAndGlobals";

type TPhoneInputGroupProps = {
  phoneInput: string[];
  setPhoneInput: (phoneInput: [string, string, string]) => void;
  wasTriedToSubmit: boolean;
};

export const PhoneInputGroup = ({
  phoneInput,
  setPhoneInput,
  wasTriedToSubmit,
}: TPhoneInputGroupProps) => {
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const isAllDigits = (str: string) => /^\d*$/.test(str);
  const handlePhoneInputOnchange =
    (inputIndex: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (
        isAllDigits(e.target.value) &&
        value.length <= phoneInputMaxLength[inputIndex]
      ) {
        const newState = phoneInput.map((element, index) => {
          return index === inputIndex ? e.target.value : element;
        });
        setPhoneInput(newState as [string, string, string]);
      }
    };

  const handlePhoneInputsOnKeyUp =
    (inputIndex: number) => (e: React.KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) {
        const { value } = e.target;
        if (
          e.key === "Backspace" &&
          value.length === 0 &&
          refs[inputIndex - 1]
        ) {
          refs[inputIndex - 1].current?.focus();
        } else if (
          value.length >= phoneInputMaxLength[inputIndex] &&
          refs[inputIndex + 1]
        ) {
          refs[inputIndex + 1].current?.focus();
        }
      }
    };
  return (
    <>
      <div className="input-group">
        <label>Phone Number</label>
        <div className="phone-group">
          {phoneInputMaxLength.map((element, index) => {
            return (
              <input
                key={index}
                type="text"
                id={`${index}`}
                placeholder={"5".repeat(element)}
                onChange={handlePhoneInputOnchange(index)}
                value={phoneInput[index]}
                onKeyUp={handlePhoneInputsOnKeyUp(index)}
                ref={refs[index]}
                className={
                  wasTriedToSubmit &&
                  phoneInput[index].length !== phoneInputMaxLength[index]
                    ? "red-border"
                    : ""
                }
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
