// function that converts runtime 156 to 2h 36m
export const convertRuntime = (runtime) => {
  var hours = Math.floor(runtime / 60);
  var minutes = runtime % 60;
  var runtimeString = hours + 'h ' + minutes + 'm';
  return runtimeString;
};
