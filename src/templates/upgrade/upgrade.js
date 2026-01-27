"use strict";

require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.search.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url-search-params.js");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// get params from URL
var urlParams = new URLSearchParams(location.search);
var locale = urlParams.get('locale') || _i18n["default"].currentLocale;
var viewport = document.querySelector('#viewport');
_i18n["default"]._load(locale).then(function () {
  var title = _i18n["default"].getString('title', locale);
  var description = _i18n["default"].getString('description', locale);
  var content = /* html */"\n    <h1>".concat(title, "</h1>\n    <p>").concat(description, "</p>\n    ");
  viewport.innerHTML = content;
});
//# sourceMappingURL=upgrade.js.map
