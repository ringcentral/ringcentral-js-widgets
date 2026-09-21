const getFilenameFromPath = (path: string) =>
  path.split('/').filter(Boolean).pop() ?? path;

export const getWorkerUrlFilename = (workerUrl: string) => {
  try {
    return getFilenameFromPath(
      new URL(workerUrl, globalThis.location?.href || 'http://localhost/')
        .pathname,
    );
  } catch {
    const pathWithoutQuery = workerUrl.split(/[?#]/)[0];
    return getFilenameFromPath(pathWithoutQuery);
  }
};

/**
 * compare the worker URL by filename, which is useful when the worker URL is dynamically generated with a hash or query string for cache busting.
 *
 * by default will compare the full URL, which is the most strict way to ensure the worker is the same.
 * setting `onlyComparisonWorkerFilename` to true for only comparing the filename, which is useful when the worker URL is dynamically generated with a hash or query string for cache busting.
 */
export const isSameWorkerUrl = ({
  currentWorkerUrl,
  receivedWorkerUrl,
  onlyComparisonWorkerFilename = false,
}: {
  currentWorkerUrl: string;
  receivedWorkerUrl: string;
  onlyComparisonWorkerFilename?: boolean;
}) => {
  if (!onlyComparisonWorkerFilename) {
    return receivedWorkerUrl === currentWorkerUrl;
  }

  return (
    getWorkerUrlFilename(receivedWorkerUrl) ===
    getWorkerUrlFilename(currentWorkerUrl)
  );
};
