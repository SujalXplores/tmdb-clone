export const mediaType = (media) => {
  let media_type = '';
  switch (media) {
    case 'movie':
      media_type = 'movie';
      break;
    case 'tv':
      media_type = 'tv';
      break;
    default:
      media_type = 'movie';
      break;
  }
  return media_type;
};
