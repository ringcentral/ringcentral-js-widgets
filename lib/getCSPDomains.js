"use strict";

require("core-js/modules/es.array.concat");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCSPDomains = void 0;
var _url = _interopRequireDefault(require("url"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// remove this when dynamic configs has been phased out
var DYNAMIC_CONFIG_DOMAIN = 'https://apps.ringcentral.com';
var getCSPDomains = function getCSPDomains(loaderBaseUrl) {
  var _url$parse = _url["default"].parse(loaderBaseUrl),
    protocol = _url$parse.protocol,
    hostname = _url$parse.hostname,
    port = _url$parse.port;
  var domains = "".concat(protocol, "//").concat(hostname).concat(port ? ":".concat(port) : '');
  if (domains !== DYNAMIC_CONFIG_DOMAIN) {
    domains = "".concat(domains, " ").concat(DYNAMIC_CONFIG_DOMAIN);
  }
  return domains;
};
exports.getCSPDomains = getCSPDomains;
//# sourceMappingURL=getCSPDomains.js.map
