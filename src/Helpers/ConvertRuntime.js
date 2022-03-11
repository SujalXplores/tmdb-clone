// function that converts runtime 156 to 2h 36m
export const convertRuntime = (runtime) => {
  const hours = Math.floor(runtime / 60);
  let minutes = runtime % 60;
  if (minutes === 0) {
    minutes = '';
  } else {
    minutes = minutes + 'm';
  }
  const runtimeString = hours + 'h ' + minutes;
  return runtimeString;
};
