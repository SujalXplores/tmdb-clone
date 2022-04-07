// function to convert 1-1-21 to Jan 1 2021
export const convertDate = (date, month = 'short') => {
  return new Date(date).toLocaleString('en-US', {
    day: 'numeric',
    month: month,
    year: 'numeric',
  });
};

export const dateToYear = (date) => {
  const newDate = new Date(date);
  const formateDate = new Intl.DateTimeFormat('default', {
    year: 'numeric',
  });
  return formateDate.format(newDate);
};

// function to convert 2003-10-21 to 21-10-2003
export const slashDate = (date) => {
  const newDate = date.split('-');
  return `${newDate[2]}/${newDate[1]}/${newDate[0]}`;
};

export const todaysDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

export const dateAfter6Month = () => {
  const date = new Date();
  const firstDate = new Date(date.setMonth(date.getMonth() + 6));
  return firstDate.toISOString().split('T')[0];
};

export const getDateBefore37Days = () => {
  const date = new Date();
  const firstDate = new Date(date.setDate(date.getDate() - 37));
  return firstDate.toISOString().split('T')[0];
};

export const getDateAfter5Days = () => {
  const date = new Date();
  const firstDate = new Date(date.setDate(date.getDate() + 5));
  return firstDate.toISOString().split('T')[0];
};

export const getDateAfterWeek = () => {
  const date = new Date();
  const afterWeek = new Date(date.setDate(date.getDate() + 7));
  return afterWeek.toISOString().split('T')[0];
};

export const getFutureDates = () => {
  const date = new Date();
  const startOfTheMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  const date1 = new Date(
    startOfTheMonth.setDate(startOfTheMonth.getDate() + 6)
  );
  const fifthDay = date1.toISOString().split('T')[0];

  const date2 = new Date(date1.setDate(date1.getDate() + 21));
  const lastDay = date2.toISOString().split('T')[0];

  return [fifthDay, lastDay];
};
