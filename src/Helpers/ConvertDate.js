// function to convert 1-1-21 to Jan 1, 2021
export const convertDate = (date) => {
  const newDate = new Date(date);
  const formateDate = new Intl.DateTimeFormat('default', {
    year: 'numeric',
    month: 'short',
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
