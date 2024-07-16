export async function getBlobURL(fileSrc: string) {
  const response = await fetch(fileSrc);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
}
