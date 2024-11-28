export const getTimeDifferenceInHours = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const timeDifference = end - start;
  return timeDifference / (1000 * 60 * 60); // Convert milliseconds to hours
};
