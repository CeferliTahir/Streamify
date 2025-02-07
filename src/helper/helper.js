export const shuffleArray = (arraySeries, arrayMovie) => {
  const seriesArray = arraySeries || [];
  const movieArray = arrayMovie || [];
  const mixed = [...seriesArray, ...movieArray];
  const shuffle = mixed.sort(() => Math.random() - 0.5);
  const cleanData = shuffle?.filter(
    ({ backdrop_path }) => backdrop_path !== null
  );
  return cleanData;
};
