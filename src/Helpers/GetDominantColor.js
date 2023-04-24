import Vibrant from 'node-vibrant';

/**
 * 
 * @param {string} imageUrl;
 * @returns {array} rgbColors;
 */
export async function getDominantColors(imageUrl) {
  const palette = await Vibrant.from(imageUrl).getPalette();
  const sortedColors = Object.values(palette).sort((a, b) => b.population - a.population);
  const dominantColors = sortedColors.slice(0, 2).map(color => color.rgb);
  const rgbColors = dominantColors.map((color, index) => {
    if (index === 1) {
      return `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.84)`;
    }
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  });
  console.info(`L:13 `, rgbColors);
  return rgbColors;
}
