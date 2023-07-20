"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.join");
require("core-js/modules/es.object.keys");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readJsonData = readJsonData;
var _path = _interopRequireDefault(require("path"));
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _ramda = require("ramda");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function readJsonData(_ref) {
  var localizationFolder = _ref.localizationFolder,
    translationLocales = _ref.translationLocales,
    sourceLocale = _ref.sourceLocale,
    rawData = _ref.rawData;
  if (!rawData) {
    rawData = (0, _ramda.reduce)(function (acc, locale) {
      var fileName = "".concat(locale, ".json");
      var filePath = _path["default"].resolve(localizationFolder, fileName);
      if (_fsExtra["default"].existsSync(filePath) && _fsExtra["default"].statSync(filePath).isFile()) {
        var content = _fsExtra["default"].readFileSync(filePath, 'utf8');
        acc[locale] = JSON.parse(content);
      }
      return acc;
    }, {}, translationLocales);
  }
  return (0, _ramda.reduce)(function (result, locale) {
    if (locale !== sourceLocale) {
      result[locale] = (0, _ramda.reduce)(function (fileData, filePath) {
        var folderPath = _path["default"].dirname(filePath);
        var targetFile = "".concat(locale).concat(_path["default"].extname(filePath));
        var targetFilePath = _path["default"].join(folderPath, targetFile);
        fileData[targetFilePath] = (0, _ramda.reduce)(function (acc, key) {
          var value = rawData[locale][filePath][key];
          var source = rawData[sourceLocale][filePath][key];
          if (source && value) {
            acc[key] = {
              source: source,
              value: value
            };
          }
          return acc;
        }, {}, Object.keys(rawData[locale][filePath]));
        return fileData;
      }, {}, Object.keys(rawData[locale]));
    }
    return result;
  }, {}, translationLocales);
}
//# sourceMappingURL=readJsonData.js.map
