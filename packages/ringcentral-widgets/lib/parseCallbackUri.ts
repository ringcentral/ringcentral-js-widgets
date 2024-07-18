/**
 * Parses the callback URI and extracts the query parameters and hash parameters.
 * If the callback URI contains an 'error' parameter, it throws an error with the error message and additional parameters.
 *
 * @param callbackUri - The callback URI to parse.
 * @returns An object containing the query parameters and hash parameters.
 * @throws An error if the callback URI contains an 'error' parameter.
 */
export default function parseCallbackUri(callbackUri: string) {
  const urlObj = new URL(callbackUri);
  const searchParams = new URLSearchParams(urlObj.search);
  const hashParams = new URLSearchParams(urlObj.hash.replace(/^#/, ''));

  if (searchParams.get('error')) {
    const error = new Error(searchParams.get('error')!);
    searchParams.forEach((value, key) => {
      (error as any)[key] = value;
    });
    throw error;
  }

  const query = Object.fromEntries(searchParams.entries());
  const hashObject = Object.fromEntries(hashParams.entries());

  return {
    ...query,
    ...hashObject,
  };
}
