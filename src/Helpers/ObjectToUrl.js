export const serializeObject = (obj, prefix) => {
  return Object.keys(obj)
    .reduce((acc, key) => {
      if (obj[key] !== null && typeof obj[key] === 'object') {
        return acc.concat(
          serializeObject(obj[key], prefix ? `${prefix}.${key}` : key)
        );
      }
      return acc.concat(`${prefix ? `${prefix}.${key}` : key}=${obj[key]}`);
    }, [])
    .join('&');
};
