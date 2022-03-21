// function that converts runtime 156 to 2h 36m
export const convertRuntime = (runtime) => {
  let hours = Math.floor(runtime / 60);
  let minutes = runtime % 60;
  minutes = minutes === 0 ? '' : minutes + 'm';
  hours = hours === 0 ? '' : hours + 'h ';
  const runtimeString = hours + minutes;
  return runtimeString;
};
