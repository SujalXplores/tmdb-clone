export const convertDate = (date) => {
  const newDate = new Date(date);
  const formateDate = new Intl.DateTimeFormat('default', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
  return formateDate.format(newDate);
};
