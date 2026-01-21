import { AssetInfo } from 'webpack';

/**
 * Returns a map of chunk names to their corresponding filename based on the given compilation and chunkInfoMap.
 *
 * @param compilation - The webpack compilation object.
 * @param chunkInfoMap - A map of chunk names to their corresponding asset info.
 * @returns A map of chunk names to their corresponding filename.
 */
export function getFilenameMap(
  compilation: any,
  chunkInfoMap: Map<string, AssetInfo>,
) {
  const assetsInfo = compilation.assetsInfo as Map<string, AssetInfo>;
  const infoList = Array.from(assetsInfo.entries());

  const filenameMap = new Map<string, string>();
  chunkInfoMap.forEach((value, key) => {
    const fullhash = value?.fullhash?.toString();
    const contenthash = value?.contenthash?.toString();
    const modulehash = value?.modulehash?.toString();
    const chunkhash = value?.chunkhash?.toString();

    const infoIndex = infoList.findIndex(([_, asset]) => {
      const assetsFullhash = asset?.fullhash;
      const assetsContenthash = asset?.contenthash;
      const assetsModulehash = asset?.modulehash;
      const assetsChunkhash = asset?.chunkhash;

      return (
        (fullhash && fullhash === assetsFullhash) ||
        (contenthash && contenthash === assetsContenthash) ||
        (modulehash && modulehash === assetsModulehash) ||
        (chunkhash && chunkhash === assetsChunkhash)
      );
    });

    const filename = infoList[infoIndex]?.[0];

    if (filename) {
      filenameMap.set(key, filename);
    }
  });
  return filenameMap;
}
