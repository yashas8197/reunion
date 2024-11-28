import { format } from "date-fns";
import { differenceInHours } from "date-fns";

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  // Format the date
  const formattedDate = format(date, "dd-MMM-yy hh:mma");
  return formattedDate;
}

export const getTotalTimeToFinish = (startTime, endTime) => {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  // Calculate total hours and minutes difference
  const totalHours = differenceInHours(endDate, startDate);

  return `${Math.abs(totalHours)} hrs`;
};
