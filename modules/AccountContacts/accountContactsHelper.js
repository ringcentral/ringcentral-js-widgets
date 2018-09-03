'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createChecker = createChecker;
/**
 * Create a account extension checker to verify if an extension can be cached
 * @param {boolean} checkStatus Need to check status of an extension
 */
function createChecker() {
  var checkStatus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  return function (extension) {
    if (checkStatus) {
      return extension.status === 'Enabled' && ['DigitalUser', 'User', 'Department'].indexOf(extension.type) >= 0;
    }
    return ['DigitalUser', 'User', 'Department'].indexOf(extension.type) >= 0;
  };
}
//# sourceMappingURL=accountContactsHelper.js.map
