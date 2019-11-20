"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clean = clean;
exports.copy = copy;
exports.compile = compile;
exports.releaseClean = releaseClean;
exports.releaseCopy = releaseCopy;
exports.generatePackage = generatePackage;
exports.exportLocale = exportLocale;
exports.exportFullLocale = exportFullLocale;
exports.exportTranslatedLocale = exportTranslatedLocale;
exports.importLocale = importLocale;
exports.consolidateLocale = consolidateLocale;
exports.release = exports.build = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

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

var localeLoader = _interopRequireWildcard(require("@ringcentral-integration/locale-loader"));

var _localeSettings = _interopRequireDefault(require("@ringcentral-integration/locale-settings"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
          tag = tag.replace(/\r?\n|\r/g, '');

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

var BUILD_PATH = _path["default"].resolve(__dirname, '../../build/glip-widgets');

function clean() {
  return _fsExtra["default"].remove(BUILD_PATH);
}

function copy() {
  return _gulp["default"].src(['./**', '!./**/*.js', '!./test{/**,}', '!./coverage{/**,}', '!./node_modules{/**,}', '!package-lock.json']).pipe(_gulp["default"].dest(BUILD_PATH));
}

function compile() {
  return _gulp["default"].src(['./**/*.js', '!./**/*.test.js', '!./coverage{/**,}', '!./node_modules{/**,}', '!gulpfile.babel.js']).pipe(localeLoader.transformLoader(_objectSpread({}, _localeSettings["default"]))).pipe(_gulpSourcemaps["default"].init()).pipe((0, _gulpBabel["default"])()).pipe(_gulpSourcemaps["default"].write('.')).pipe(_gulp["default"].dest(BUILD_PATH));
}

var build = _gulp["default"].series(clean, _gulp["default"].parallel(copy, compile));

exports.build = build;

var RELEASE_PATH = _path["default"].resolve(__dirname, '../../release/glip-widgets');

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

function generatePackage() {
  var packageInfo, version;
  return regeneratorRuntime.async(function generatePackage$(_context3) {
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

var release = _gulp["default"].series(_gulp["default"].parallel(build, releaseClean), _gulp["default"].parallel(releaseCopy, generatePackage));

exports.release = release;

function exportLocale() {
  return localeLoader.exportLocale(_objectSpread({}, _localeSettings["default"]));
}

function exportFullLocale() {
  return localeLoader.exportLocale(_objectSpread({}, _localeSettings["default"], {
    exportType: 'full'
  }));
}

function exportTranslatedLocale() {
  return localeLoader.exportLocale(_objectSpread({}, _localeSettings["default"], {
    exportType: 'translated'
  }));
}

function importLocale() {
  return localeLoader.importLocale(_objectSpread({}, _localeSettings["default"]));
}

function consolidateLocale() {
  return localeLoader.consolidateLocale(_objectSpread({}, _localeSettings["default"], {
    sourceFolder: _path["default"].resolve(__dirname, 'lib/countryNames')
  }));
}
//# sourceMappingURL=gulpfile.js.map
