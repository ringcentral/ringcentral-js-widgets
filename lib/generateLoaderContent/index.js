'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['export default function loadLocale(locale) {\n      return new Promise((resolve) => {\n        switch (locale) {', '\n          default:\n            resolve({});\n            break;\n        }\n      });\n    }\n'], ['export default function loadLocale(locale) {\n      return new Promise((resolve) => {\n        switch (locale) {', '\n          default:\n            resolve({});\n            break;\n        }\n      });\n    }\\n']);

exports.default = generateLoaderContent;

var _dedent = require('dedent');

var _dedent2 = _interopRequireDefault(_dedent);

var _formatLocale = require('@ringcentral-integration/i18n/lib/formatLocale');

var _formatLocale2 = _interopRequireDefault(_formatLocale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function byLocale(a, b) {
  var ta = (0, _formatLocale2.default)(a);
  var tb = (0, _formatLocale2.default)(b);
  if (ta === tb) return 0;
  return ta > tb ? 1 : -1;
}
/**
 * @typedef GLCOptions
 * @property {String[]} files
 * @property {Boolean} [chunk]
 *
 */
/**
 * @function
 * @description Generate js code for localeLoader according the files listed.
 * @param {GLCOptions} options
 */
function generateLoaderContent( /** @type {GLCOptions} */_ref) {
  var files = _ref.files,
      _ref$chunk = _ref.chunk,
      chunk = _ref$chunk === undefined ? true : _ref$chunk;

  var usedLang = {};
  var cases = files.sort(byLocale).map(function (f) {
    var basename = f.replace(/\.(js|json)$/i, '');
    var locale = (0, _formatLocale2.default)(basename);
    var lang = locale.split('-')[0];
    var padding = chunk ? '  ' : '';
    var code = '\n            ' + padding + 'const data = require(\'./' + basename + '\');\n            ' + padding + 'resolve(data.__esModule === true ? data.default : data);';
    if (chunk) {
      code = '\n            if (typeof require.ensure === \'function\') {\n              require.ensure([\'./' + basename + '\'], (require) => {' + code + '\n              }, \'' + locale + '\');\n            } else {' + code + '\n            }';
    }
    var langDefaultCase = '';
    if (!usedLang[lang]) {
      usedLang[lang] = true;
      langDefaultCase = '\n        case \'' + lang + '\':\n      ';
    }
    return langDefaultCase + '\n          case \'' + locale + '\': {' + code + '\n            break;\n          }';
  });
  return (0, _dedent2.default)(_templateObject, cases.join(''));
}
//# sourceMappingURL=index.js.map
