const generateWeekOfDates = (dateRangeOfWeek) => {
  const [startDate, endDate] = dateRangeOfWeek.split(',').map(date => new Date(date));
  endDate.setDate(endDate.getDate() + 1);

  const weekOfDates = [];

  const currentDate = startDate;

  while (currentDate < endDate) {
    const day = currentDate.getUTCDate();
    const year = currentDate.getUTCFullYear();
    let month = currentDate.getUTCMonth() + 1;

    month = month >= 10 ? month : `0${month}`;

    weekOfDates.push(`${year}-${month}-${day}`);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekOfDates;
};

module.exports = {
  generateWeekOfDates,
};
