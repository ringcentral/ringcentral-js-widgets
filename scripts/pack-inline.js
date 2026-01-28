"use strict";

require("core-js/modules/es.array.join.js");
var _path = _interopRequireDefault(require("path"));
var _replaceI18nInlineObject = require("./replaceI18nInlineObject");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
(0, _replaceI18nInlineObject.replaceI18nInlineObject)(_path["default"].join(__dirname, '../src/scriptsLoadFail/inline/i18n'), _path["default"].join(__dirname, '../src/scriptsLoadFail/inline/scriptsFail.js'), {
  excludes: ['incorrectEAVersionTitle', 'incorrectEAVersionContent']
});
//# sourceMappingURL=pack-inline.js.map
