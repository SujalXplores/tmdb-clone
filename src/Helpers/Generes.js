export const genereNames = (generes) => {
  let genereNames = [];
  for (let i = 0; i < generes.length; i++) {
    genereNames.push(generes[i].name);
  }
  return genereNames.join(', ');
};