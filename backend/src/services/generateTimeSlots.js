const { format } = require("date-fns");

const generateTimeSlots = (selectedDate) => {
  const startTime = new Date(selectedDate);
  startTime.setHours(1, 0, 0);

  const endTime = new Date(selectedDate);
  endTime.setHours(23, 30, 0);

  const timeSlots = [];
  const currentTime = new Date(startTime);

  while (currentTime <= endTime) {
    const formattedDate = format(currentTime, "yyyy-MM-dd HH:mm", {
      timeZone: "Europe/Paris",
    });
    timeSlots.push(new Date(formattedDate));
    currentTime.setMinutes(currentTime.getMinutes() + 30);
  }
  return timeSlots;
};

module.exports = generateTimeSlots;
