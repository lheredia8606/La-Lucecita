import { phoneInputMaxLength, TUser } from "../../ApplicationTypesAndGlobals";

export const isAllLetters = (inputString: string) =>
  /^[A-Za-z]+$/.test(inputString);

export const isNameValid = (name: string) => {
  return isAllLetters(name) && name.length >= 2;
};
export const isEmailValid = (emailAddress: string) => {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
};

export const isPhoneValid = (phone: string[]) => {
  for (let i = 0; i < phone.length; i++) {
    if (phone[i].length !== phoneInputMaxLength[i]) return false;
  }
  return true;
};

export function isUserValid(userInfo: Omit<TUser, "id">) {
  const { email, firstName, lastName, phone } = userInfo;

  return (
    isEmailValid(email) &&
    isNameValid(firstName) &&
    isNameValid(lastName) &&
    isPhoneValid(phone)
  );
}
