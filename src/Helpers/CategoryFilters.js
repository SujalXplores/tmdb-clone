export const sortByCategory = (sortType, data) => {
  switch (sortType) {
    case 'popularity.desc':
      return data.sort((a, b) => b.popularity - a.popularity);
    case 'popularity.asc':
      return data.sort((a, b) => a.popularity - b.popularity);
    case 'vote_average.desc':
      return data.sort((a, b) => b.vote_average - a.vote_average);
    case 'vote_average.asc':
      return data.sort((a, b) => a.vote_average - b.vote_average);
    case 'primary_release_date.desc':
      return data.sort((a, b) => {
        const dateA = new Date(a.release_date || a.first_air_date);
        const dateB = new Date(b.release_date || b.first_air_date);
        return dateB - dateA;
      });

    case 'primary_release_date.asc':
      return data.sort((a, b) => {
        const dateA = new Date(a.release_date || a.first_air_date);
        const dateB = new Date(b.release_date || b.first_air_date);
        return dateA - dateB;
      });
    case 'title.asc':
      return data.sort((a, b) => {
        if (a.title) {
          return a.title.localeCompare(b.title);
        }
        return a.name.localeCompare(b.name);
      });
    case 'title.desc':
      return data.sort((a, b) => {
        if (a.title) {
          return b.title.localeCompare(a.title);
        }
        return b.name.localeCompare(a.name);
      });
    default:
      return data;
  }
};
