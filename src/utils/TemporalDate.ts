import { Temporal } from "@js-temporal/polyfill";

export const getTodaysDate = (): Temporal.PlainDate => {
  return Temporal.Now.plainDateISO();
};

export const getFormattedDate = (date: Temporal.PlainDate) => {
  return date.toLocaleString("en-US", { dateStyle: "long" });
};
