// function to convert 1-1-21 to Jan 1, 2021
export const convertDate = (date, month = 'short') => {
  const newDate = new Date(date);
  const formateDate = new Intl.DateTimeFormat('default', {
    year: 'numeric',
    month: month,
    day: '2-digit',
  });
  return formateDate.format(newDate);
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
  const today = new Date();
  const dd = String(today.getDate() + 5).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const firstDate = `${yyyy}-${mm}-${dd}`;

  const dd2 = String(today.getDate() + 26).padStart(2, '0');
  const mm2 = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy2 = today.getFullYear();
  const secondDate = `${yyyy2}-${mm2}-${dd2}`;

  return [firstDate, secondDate];
};
