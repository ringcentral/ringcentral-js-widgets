/**
 * Create a account extension checker to verify if an extension can be cached
 * @param {boolean} checkStatus Need to check status of an extension
 */
export function createChecker(checkStatus = true) {
  return (extension) => {
    if (checkStatus) {
      return extension.status === 'Enabled' &&
      ['DigitalUser', 'User', 'Department'].indexOf(extension.type) >= 0;
    }
    return ['DigitalUser', 'User', 'Department'].indexOf(extension.type) >= 0;
  };
}
