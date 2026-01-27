"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLoadWorkerTemplate = getLoadWorkerTemplate;
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
var _constant = require("@ringcentral-integration/next-core/src/constant");
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _template = _interopRequireDefault(require("lodash/template"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * Generates a script tag containing the content of a shared worker template.
 * @param nameSpace - The namespace for the shared worker, which will put into global window.
 * @param workerUrl - The URL of the shared worker script.
 * @returns A string representing the script tag.
 */
function getLoadWorkerTemplate() {
  var nameSpace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '__rc_shared_worker__';
  var workerUrl = arguments.length > 1 ? arguments[1] : undefined;
  var chunkName = arguments.length > 2 ? arguments[2] : undefined;
  var mfeConfig = arguments.length > 3 ? arguments[3] : undefined;
  var source = _fsExtra["default"].readFileSync(_path["default"].join(__dirname, './inline/loadWorker.js')).toString();
  var content = (0, _template["default"])(source)({
    workerUrl: workerUrl,
    nameSpace: nameSpace,
    chunkName: chunkName,
    mfeConfig: mfeConfig,
    disableRcSharedWorkerKey: _constant.disableRcSharedWorkerKey
  });
  return "<script>".concat(content, "</script>");
}
//# sourceMappingURL=getLoadWorkerTemplate.js.map
