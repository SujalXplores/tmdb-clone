export const genreNames = (genres) => {
  let genreArr = [];
  for (let i = 0; i < genres.length; i++) {
    genreArr.push(genres[i].name);
  }
  return genreArr.join(', ');
};