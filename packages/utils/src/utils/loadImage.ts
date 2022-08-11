/**
 * load image with js, use for preload image or get image info
 */
export function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Load image failed'));

    img.src = url;
  });
}
