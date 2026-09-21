/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

const entryKey = '_RC_CUSTOM_ENTRY_';

/**
 * Overrides the page entry script with a custom URL.
 *
 * Usage from the browser console:
 *
 *   setCustomEntryUrl('https://example.com/path/to/entry.js')
 *
 * The URL is stored in localStorage and the page is reloaded immediately.
 * On the next load, the template injects the stored URL as a deferred script
 * and exposes it through globalThis.customEntryUrl.
 *
 * Use clearCustomEntryUrl() from the browser console to restore the default
 * webpack-generated entry scripts.
 *
 * @param {string} url Browser-loadable JavaScript entry URL.
 */
function setCustomEntryUrl(url) {
  localStorage.setItem(entryKey, url);
  location.reload();
}

/**
 * Clears the custom entry URL override and reloads the page.
 */
function clearCustomEntryUrl() {
  localStorage.removeItem(entryKey);
  location.reload();
}

const customEntryUrl = localStorage.getItem(entryKey);

if (customEntryUrl) {
  console.warn(
    `%cUsing custom entry URL from localStorage,

${customEntryUrl}

use %c"clearCustomEntryUrl()"%c to clear the custom entry URL`,
    'font-size:2em',
    'color:red;font-size:2em',
    'font-size:2em',
  );

  const script = document.createElement('script');
  script.defer = true;
  script.src = customEntryUrl;
  document.head.appendChild(script);
}

globalThis.setCustomEntryUrl = setCustomEntryUrl;
globalThis.clearCustomEntryUrl = clearCustomEntryUrl;
globalThis.customEntryUrl = customEntryUrl;
