'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = importLocale;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _ramda = require('ramda');

var _babylon = require('babylon');

var _babelGenerator = require('babel-generator');

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

var _formatLocale = require('@ringcentral-integration/i18n/lib/formatLocale');

var _formatLocale2 = _interopRequireDefault(_formatLocale);

var _compileLocaleData = require('../compileLocaleData');

var _compileLocaleData2 = _interopRequireDefault(_compileLocaleData);

var _defaultConfig = require('../defaultConfig');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

var _readXlfData = require('../readXlfData');

var _readXlfData2 = _interopRequireDefault(_readXlfData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function writeFiles(_ref) {
  var localeData = _ref.localeData,
      sourceFolder = _ref.sourceFolder,
      sourceLocale = _ref.sourceLocale;

  (0, _ramda.forEach)(function (folderPath) {
    (0, _ramda.forEach)(function (locale) {
      if (locale !== sourceLocale) {
        // write file
        var targetData = localeData[folderPath].files[locale];

        var _generate = (0, _babelGenerator2.default)(targetData.ast),
            code = _generate.code;

        var annotations = (0, _ramda.reduce)(function (result, _ref2) {
          var _ref3 = (0, _slicedToArray3.default)(_ref2, 2),
              key = _ref3[0],
              value = _ref3[1];

          result.push('// @key: @#@' + (0, _stringify2.default)(key) + '@#@ @source: @#@' + (0, _stringify2.default)(value) + '@#@');
          return result;
        }, [], targetData.annotations).join('\n');
        var output = code + '\n\n' + annotations + '\n';
        _fsExtra2.default.writeFileSync(_path2.default.resolve(sourceFolder, folderPath, targetData.file), output);
      }
    }, (0, _keys2.default)(localeData[folderPath].files));
  }, (0, _keys2.default)(localeData));
}

function mergeTranslationData(_ref4) {
  var localeData = _ref4.localeData,
      _ref4$translations = _ref4.translations,
      translations = _ref4$translations === undefined ? {} : _ref4$translations,
      sourceFolder = _ref4.sourceFolder,
      sourceLocale = _ref4.sourceLocale;

  // clean up original Data
  (0, _ramda.forEach)(function (folderPath) {
    (0, _ramda.forEach)(function (locale) {
      if (locale !== sourceLocale) {
        var targetData = localeData[folderPath].files[locale];
        var sourceData = localeData[folderPath].files[sourceLocale];
        var relativePath = _path2.default.relative(sourceFolder, _path2.default.resolve(folderPath, targetData.file));
        targetData.data = (0, _ramda.reduce)(function (newData, _ref5) {
          var _ref6 = (0, _slicedToArray3.default)(_ref5, 2),
              key = _ref6[0],
              value = _ref6[1];

          if (sourceData.data.has(key)) {
            if (sourceData.data.get(key).value === value.source) {
              newData.set(key, value);
            } else {
              console.log('[locale] ' + _chalk2.default.red('{Delete}') + ' Key: \'' + key + '\', File: \'' + relativePath + '\', Reason: Source value changed.');
            }
          } else {
            console.log('[locale] ' + _chalk2.default.red('{Delete}') + ' Key: \'' + key + '\', File: \'' + relativePath + '\', Reason: Source no longer exist.');
          }
          return newData;
        }, new _map2.default(), targetData.data);
      }
    }, (0, _keys2.default)(localeData[folderPath].files));
  }, (0, _keys2.default)(localeData));

  // merge in translations
  (0, _ramda.forEach)(function (locale) {
    (0, _ramda.forEach)(function (fileName) {
      var filePath = _path2.default.resolve(sourceFolder, fileName);
      var folderPath = _path2.default.dirname(filePath);

      if (localeData[folderPath] && localeData[folderPath].files[sourceLocale]) {
        var sourceData = localeData[folderPath].files[sourceLocale].data;
        if (!localeData[folderPath].files[locale]) {
          localeData[folderPath].files[locale] = {
            file: (0, _formatLocale2.default)(locale) + '.js'
          };
        }
        if (!localeData[folderPath].files[locale].data) {
          localeData[folderPath].files[locale].data = new _map2.default();
        }
        var originalData = localeData[folderPath].files[locale].data;
        var translatedData = translations[locale][fileName];
        (0, _ramda.forEach)(function (key) {
          if (!sourceData.has(key)) {
            console.log('[locale] ' + _chalk2.default.red('{Skip}') + ' Key: \'[' + key + ']\', File: \'' + fileName + '\', Reason: Source no longer exist.');
            return;
          }
          if (sourceData.get(key).value !== translatedData[key].source) {
            console.log('[locale] ' + _chalk2.default.red('{Skip}') + ' Key: \'[' + key + ']\', File: \'' + fileName + '\', Reason: Source value changed.');
            return;
          }
          originalData.set(key, (0, _extends3.default)({}, translatedData[key], {
            key: key
          }));
        }, (0, _keys2.default)(translatedData));
      }
    }, (0, _keys2.default)(translations[locale]));
  }, (0, _keys2.default)(translations));

  // Update ast and generate code
  (0, _ramda.forEach)(function (folderPath) {
    (0, _ramda.forEach)(function (locale) {
      if (locale !== sourceLocale) {
        var targetData = localeData[folderPath].files[locale];
        var sourceData = localeData[folderPath].files[sourceLocale];
        targetData.ast = (0, _babylon.parse)(sourceData.content, { sourceType: 'module' });
        targetData.annotations = new _map2.default();

        var defaultExport = (0, _ramda.find)(function (item) {
          return item.type === 'ExportDefaultDeclaration';
        }, targetData.ast.program.body);
        var properties = (0, _ramda.filter)(function (prop) {
          var key = prop.key.type === 'MemberExpression' ? '[' + (0, _babelGenerator2.default)(prop.key).code + ']' : (0, _babelGenerator2.default)(prop.key).code;
          var entry = targetData.data.get(key);
          if (entry && entry.value) {
            prop.value = {
              type: 'StringLiteral',
              value: entry.value,
              extra: {
                // generate desired raw to by pass babel jsesc use
                raw: (0, _stringify2.default)(entry.value),
                rawValue: entry.value
              }
            };
            targetData.annotations.set(key, sourceData.data.get(key).value);
            return true;
          }
          return false;
        }, defaultExport.declaration.properties);
        defaultExport.declaration.properties = properties;
      }
    }, (0, _keys2.default)(localeData[folderPath].files));
  }, (0, _keys2.default)(localeData));
  return localeData;
}

function importLocale() {
  var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref7$sourceFolder = _ref7.sourceFolder,
      sourceFolder = _ref7$sourceFolder === undefined ? _defaultConfig2.default.sourceFolder : _ref7$sourceFolder,
      _ref7$localizationFol = _ref7.localizationFolder,
      localizationFolder = _ref7$localizationFol === undefined ? _defaultConfig2.default.localizationFolder : _ref7$localizationFol,
      _ref7$sourceLocale = _ref7.sourceLocale,
      sourceLocale = _ref7$sourceLocale === undefined ? _defaultConfig2.default.sourceLocale : _ref7$sourceLocale,
      supportedLocales = _ref7.supportedLocales;

  if (!supportedLocales) {
    throw new Error('options.supportedLocales is missing');
  }
  var localeData = (0, _compileLocaleData2.default)({
    sourceFolder: sourceFolder,
    sourceLocale: sourceLocale,
    supportedLocales: supportedLocales
  });
  var translations = (0, _readXlfData2.default)({
    localizationFolder: localizationFolder,
    supportedLocales: supportedLocales
  });
  var mergedData = mergeTranslationData({
    localeData: localeData,
    translations: translations,
    sourceFolder: sourceFolder,
    sourceLocale: sourceLocale
  });
  writeFiles({
    localeData: mergedData,
    sourceFolder: sourceFolder,
    sourceLocale: sourceLocale
  });
}
//# sourceMappingURL=index.js.map
