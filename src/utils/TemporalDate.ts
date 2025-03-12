import { Temporal } from "@js-temporal/polyfill";

export const getTodaysDate = (): Temporal.PlainDate => {
  return Temporal.Now.plainDateISO();
};

export const getFormattedDate = (date: Temporal.PlainDate): string => {
  return date.toLocaleString("en-US", { dateStyle: "long" });
};

export const getDateFromString = (date: string): Temporal.PlainDate => {
  return Temporal.PlainDate.from(date);
};

export const getStringFromPlainDate = (
  plainDate: Temporal.PlainDate
): string => {
  return plainDate.toString();
};

export const getDaysUntilDeathLine = (deadLine: Temporal.PlainDate): number => {
  const today = Temporal.Now.plainDateISO();
  return deadLine.since(today).days;
};

export const getOrderDeadLine = (days: number) => {
  const today = Temporal.Now.plainDateISO();
  return today.add({ days }).toString();
};
