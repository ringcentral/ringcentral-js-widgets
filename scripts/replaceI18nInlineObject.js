"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceI18nInlineObject = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * Replaces the inline i18n object in a target file with the i18n objects from a specified folder.
 * @param i18nFolder - The path to the folder containing the i18n files.
 * @param targetFilePath - The path to the target file where the inline i18n object will be replaced.
 */
var replaceI18nInlineObject = exports.replaceI18nInlineObject = function replaceI18nInlineObject(i18nFolder, targetFilePath) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      excludes: []
    },
    excludes = _ref.excludes;
  var fileList = _fs["default"].readdirSync(i18nFolder);
  var i18nAll = fileList.filter(function (x) {
    return x.includes('ts') && !['index.ts', 'loadLocale.ts'].includes(x);
  }).reduce(function (acc, curr) {
    var key = curr.replace('.ts', '');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    var value = require(_path["default"].join(i18nFolder, curr))["default"];
    excludes.forEach(function (exclude) {
      delete value[exclude];
    });
    acc[key.toLocaleLowerCase()] = value;
    return acc;
  }, {});
  var inlineFilePath = targetFilePath;
  var inlineFile = _fs["default"].readFileSync(inlineFilePath);
  var content = inlineFile.toString();
  var startMark = '// i18n-replace';
  var start = content.indexOf(startMark);
  var end = content.indexOf('// i18n-replace-end');
  var newContent = content.slice(0, start + startMark.length + 1) + "const i18n = ".concat(JSON.stringify(i18nAll)) + content.slice(end);
  console.log('write inline i18n content success:', newContent);
  _fs["default"].writeFileSync(inlineFilePath, newContent);
};
//# sourceMappingURL=replaceI18nInlineObject.js.map
