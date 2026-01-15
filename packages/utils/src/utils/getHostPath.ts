/**
 * Returns the host URL of the given href.
 *
 * @param href - The URL string.
 * @returns The host URL.
 */
export const getHostPath = (href = location.href) => {
  const url = new URL(href);
  url.hash = ''; // Remove the hash part
  url.search = ''; // Remove the search part
  return url.href.substring(0, url.href.lastIndexOf('/') + 1);
};
