"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScriptsLoadFailTemplate = getScriptsLoadFailTemplate;
exports.getWorkerScript = getWorkerScript;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _template = _interopRequireDefault(require("lodash/template"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function getWorkerScript(workerUrl) {
  var clientSource = _fsExtra["default"].readFileSync(_path["default"].join(__dirname, './inline/workerScriptsFail/client.js')).toString();
  return (0, _template["default"])(clientSource)({
    workerUrl: typeof workerUrl === 'boolean' ? '' : workerUrl
  });
}

/**
 * Generates a template for scripts that fail to load.
 *
 * @param root - The root element id. Default is `#app`.
 * @param workerUrl - The worker URL. Default is false. If you want a custom worker URL, you can set this option.
 * @returns The generated template as a string.
 */
function getScriptsLoadFailTemplate() {
  var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#app';
  var workerUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var ignoreRule = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '/mfe-registry/';
  var mainSource = _fsExtra["default"].readFileSync(_path["default"].join(__dirname, './inline/scriptsFail.js')).toString();
  var inlineScript = (0, _template["default"])(mainSource)({
    root: root,
    ignoreRule: ignoreRule
  });
  var workerSource = workerUrl ? getWorkerScript(workerUrl) : '';
  return "<script>".concat(inlineScript).concat(workerSource, "</script>");
}
//# sourceMappingURL=getScriptsLoadFailTemplate.js.map
