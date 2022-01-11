const sliceExecute = async ({ array, threshold, handler }) => {
  let index = 0;
  const loop = async () => {
    const items = array.slice(index, index + threshold);
    index += threshold;
    if (items.length) {
      const result = await handler(items);
      if (result !== false) {
        await loop();
      }
    }
  };
  await loop();
};

export default sliceExecute;
