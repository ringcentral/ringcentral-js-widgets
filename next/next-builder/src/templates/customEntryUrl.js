/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

const entryKey = '_RC_CUSTOM_ENTRY_';

function setCustomEntryUrl(url) {
  localStorage.setItem(entryKey, url);
  location.reload();
}

function clearCustomEntryUrl() {
  localStorage.removeItem(entryKey);
  location.reload();
}

const customEntryUrl = localStorage.getItem(entryKey);

if (customEntryUrl) {
  console.warn(
    `%cUsing custom entry URL from localStorage,

${customEntryUrl}

use %c"clearCustomAdapterUrl()"%c to clear the custom entry URL`,
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
