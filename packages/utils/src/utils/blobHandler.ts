export async function getBlobURL(imageSrc: string) {
  const image = await fetch(imageSrc);
  const imageBlog = await image.blob();
  return URL.createObjectURL(imageBlog);
}
