import { sleep } from '../utils';

// regex to match 429, 500...599
export const isRetirableStatus = (status: number) =>
  /(?:5\d{2}|429)/.test(`${status}`);

export const backoffDelay = (retries: number) =>
  1 * Math.pow(2, retries) * 1000;
/**
 * Fetches a resource from the network with retry logic for handling timeouts and server errors.
 *
 * This function will retry the fetch operation up to a maximum of 2 times with exponential backoff
 * for timeouts or 5XX responses. If the retries fail, it will retry after a specified polling interval.
 * It also respects the `Retry-After` header for 429 (Too Many Requests) or 503 (Service Unavailable) responses.
 *
 * @param url - The URL to fetch.
 * @param args - The options for the fetch request.
 * @returns The response from the fetch request.
 * @throws Will throw an error if the fetch operation fails after the maximum number of retries.
 */
export const fetchWithRetry = async (url: string, args: RequestInit) => {
  const maxRetries = 2;
  let retries = 0;
  let delay = 0;
  let response: any;
  let error: Error | null = null;
  while (retries <= maxRetries) {
    try {
      error = null;
      response = await fetch(url, args);
      // now only retry on those status
      const isMatched = isRetirableStatus(response.status);
      if (isMatched) {
        const retryAfter = response.headers.get('Retry-After');
        if (retryAfter) {
          delay = parseInt(retryAfter) * 1000;
        } else {
          delay = backoffDelay(retries);
        }
      } else {
        break;
      }
    } catch (e) {
      // timeout etc.
      error = e as Error;
      delay = backoffDelay(retries);
    }
    retries++;

    if (retries > maxRetries) {
      break;
    }
    await sleep(delay);
  }
  if (error) {
    throw error;
  }
  return response;
};
