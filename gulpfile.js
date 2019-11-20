"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.release = exports.build = void 0;

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.function.name");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.regexp.replace");

require("regenerator-runtime/runtime");

var _gulp = _interopRequireDefault(require("gulp"));

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _gulpBabel = _interopRequireDefault(require("gulp-babel"));

var _gulpSourcemaps = _interopRequireDefault(require("gulp-sourcemaps"));

var _execa = _interopRequireDefault(require("execa"));

var _transformLoader = _interopRequireDefault(require("@ringcentral-integration/locale-loader/lib/transformLoader"));

var _dedent = _interopRequireDefault(require("dedent"));

var _exportLocale = _interopRequireDefault(require("@ringcentral-integration/locale-loader/lib/exportLocale"));

var _importLocale = _interopRequireDefault(require("@ringcentral-integration/locale-loader/lib/importLocale"));

var _consolidateLocale = _interopRequireDefault(require("@ringcentral-integration/locale-loader/lib/consolidateLocale"));

var _localeSettings = _interopRequireDefault(require("@ringcentral-integration/locale-settings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      .", " {\n        composes: icon;\n      }\n      .", ":before "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BUILD_PATH = _path["default"].resolve(__dirname, '../../build/ringcentral-widgets');

var RELEASE_PATH = _path["default"].resolve(__dirname, '../../release/ringcentral-widgets');

function getVersionFromTag() {
  var tag;
  return regeneratorRuntime.async(function getVersionFromTag$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          tag = process.env.TRAVIS_TAG;

          if (!(tag && /^\d+.\d+.\d+/.test(tag))) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", tag);

        case 3:
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(_execa["default"].shell('git describe --exact-match --tags $(git rev-parse HEAD)'));

        case 6:
          tag = _context.sent;
          tag = tag.stdout.replace(/\r?\n|\r/g, '');

          if (!/^\d+.\d+.\d+/.test(tag)) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", tag);

        case 10:
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](3);
          console.error(_context.t0);

        case 15:
          return _context.abrupt("return", null);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 12]]);
}

function clean() {
  return _fsExtra["default"].remove(BUILD_PATH);
}

function copy() {
  return _gulp["default"].src(['./**', '!./**/*.js', '!./test{/**,}', '!./coverage{/**,}', '!./node_modules{/**,}', '!package-lock.json']).pipe(_gulp["default"].dest(BUILD_PATH));
}

function preBuild() {
  return _gulp["default"].src(['./**/*.js', './**/*.ts', './**/*.tsx', '!./**/*.test.js', '!./test{/**,}', '!./coverage{/**,}', '!./node_modules{/**,}', '!gulpfile.babel.js']).pipe((0, _transformLoader["default"])(_objectSpread({}, _localeSettings["default"]))).pipe(_gulpSourcemaps["default"].init()).pipe((0, _gulpBabel["default"])()).pipe(_gulpSourcemaps["default"].write('.')).pipe(_gulp["default"].dest(BUILD_PATH));
}

var build = _gulp["default"].series(clean, copy, preBuild);

exports.build = build;

function releaseClean() {
  var files, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file;

  return regeneratorRuntime.async(function releaseClean$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_fsExtra["default"].exists(RELEASE_PATH));

        case 2:
          if (_context2.sent) {
            _context2.next = 5;
            break;
          }

          _context2.next = 5;
          return regeneratorRuntime.awrap(_execa["default"].shell("mkdir -p ".concat(RELEASE_PATH)));

        case 5:
          _context2.next = 7;
          return regeneratorRuntime.awrap(_fsExtra["default"].readdir(RELEASE_PATH));

        case 7:
          _context2.t0 = function (file) {
            return !/^\./.test(file);
          };

          files = _context2.sent.filter(_context2.t0);
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context2.prev = 12;
          _iterator = files[Symbol.iterator]();

        case 14:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context2.next = 21;
            break;
          }

          file = _step.value;
          _context2.next = 18;
          return regeneratorRuntime.awrap(_fsExtra["default"].remove(_path["default"].resolve(RELEASE_PATH, file)));

        case 18:
          _iteratorNormalCompletion = true;
          _context2.next = 14;
          break;

        case 21:
          _context2.next = 27;
          break;

        case 23:
          _context2.prev = 23;
          _context2.t1 = _context2["catch"](12);
          _didIteratorError = true;
          _iteratorError = _context2.t1;

        case 27:
          _context2.prev = 27;
          _context2.prev = 28;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 30:
          _context2.prev = 30;

          if (!_didIteratorError) {
            _context2.next = 33;
            break;
          }

          throw _iteratorError;

        case 33:
          return _context2.finish(30);

        case 34:
          return _context2.finish(27);

        case 35:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[12, 23, 27, 35], [28,, 30, 34]]);
}

function releaseCopy() {
  return _gulp["default"].src(["".concat(BUILD_PATH, "/**"), "".concat(__dirname, "/README.md"), "".concat(__dirname, "/LICENSE")]).pipe(_gulp["default"].dest(RELEASE_PATH));
}

function preRelease() {
  var packageInfo, version;
  return regeneratorRuntime.async(function preRelease$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.t0 = JSON;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_fsExtra["default"].readFile(_path["default"].resolve(BUILD_PATH, 'package.json')));

        case 3:
          _context3.t1 = _context3.sent;
          packageInfo = _context3.t0.parse.call(_context3.t0, _context3.t1);
          delete packageInfo.scripts;
          delete packageInfo.jest;
          _context3.next = 9;
          return regeneratorRuntime.awrap(getVersionFromTag());

        case 9:
          version = _context3.sent;
          console.log('version:', version);

          if (version) {
            packageInfo.version = version;
            packageInfo.name = 'ringcentral-widgets';
          }

          _context3.next = 14;
          return regeneratorRuntime.awrap(_fsExtra["default"].writeFile(_path["default"].resolve(RELEASE_PATH, 'package.json'), JSON.stringify(packageInfo, null, 2)));

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  });
}

var release = _gulp["default"].series(_gulp["default"].parallel(build, releaseClean), releaseCopy, preRelease);

exports.release = release;

function normalizeName(str) {
  return str.split(/[-_]/g).map(function (token, idx) {
    return "".concat(idx > 0 ? token[0].toUpperCase() : token[0].toLowerCase()).concat(token.toLowerCase().substr(1));
  }).join('');
}

exports['generate-font'] = function _callee() {
  var cssLocation, content, output, regExp, match, _match, _match2, target, name, normalizedName, newContent;

  return regeneratorRuntime.async(function _callee$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          cssLocation = _path["default"].resolve(__dirname, 'assets/DynamicsFont/style.css');
          _context4.next = 4;
          return regeneratorRuntime.awrap(_fsExtra["default"].readFile(cssLocation, 'utf8'));

        case 4:
          content = _context4.sent;
          output = content.replace(/url\('fonts\/dynamics_icon/g, "url('./fonts/dynamics_icon").replace('[class^="icon-"], [class*=" icon-"]', '.icon');
          regExp = /\.icon-(.*):before/;

          do {
            match = regExp.exec(output);

            if (match) {
              _match = match, _match2 = _slicedToArray(_match, 2), target = _match2[0], name = _match2[1];
              normalizedName = normalizeName(name);
              newContent = (0, _dedent["default"])(_templateObject(), normalizedName, normalizedName);
              output = output.replace(target, newContent);
            }
          } while (match);

          _context4.next = 10;
          return regeneratorRuntime.awrap(_fsExtra["default"].writeFile(_path["default"].resolve(__dirname, 'assets/DynamicsFont/DynamicsFont.scss'), output, 'utf8'));

        case 10:
          _context4.next = 15;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports['export-locale'] = function _callee2() {
  return regeneratorRuntime.async(function _callee2$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", (0, _exportLocale["default"])(_objectSpread({}, _localeSettings["default"])));

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports['export-locale-full'] = function _callee3() {
  return regeneratorRuntime.async(function _callee3$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          return _context6.abrupt("return", (0, _exportLocale["default"])(_objectSpread({}, _localeSettings["default"], {
            exportType: 'full'
          })));

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports['export-locale-translated'] = function _callee4() {
  return regeneratorRuntime.async(function _callee4$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          return _context7.abrupt("return", (0, _exportLocale["default"])(_objectSpread({}, _localeSettings["default"], {
            exportType: 'translated'
          })));

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
};

exports['import-locale'] = function _callee5() {
  return regeneratorRuntime.async(function _callee5$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          return _context8.abrupt("return", (0, _importLocale["default"])(_objectSpread({}, _localeSettings["default"])));

        case 1:
        case "end":
          return _context8.stop();
      }
    }
  });
};

exports['consolidate-locale'] = function _callee6() {
  return regeneratorRuntime.async(function _callee6$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          return _context9.abrupt("return", (0, _consolidateLocale["default"])(_objectSpread({}, _localeSettings["default"], {
            sourceFolder: _path["default"].resolve(__dirname, 'lib/countryNames')
          })));

        case 1:
        case "end":
          return _context9.stop();
      }
    }
  });
};
//# sourceMappingURL=gulpfile.js.map
