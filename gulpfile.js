"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.filter");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.build = void 0;
exports.clean = clean;
exports.compile = compile;
exports.consolidateLocale = consolidateLocale;
exports.copy = copy;
exports.exportFullLocale = exportFullLocale;
exports.exportLocale = exportLocale;
exports.exportTranslatedLocale = exportTranslatedLocale;
exports.generatePackage = generatePackage;
exports.importLocale = importLocale;
exports.release = void 0;
exports.releaseClean = releaseClean;
exports.releaseCopy = releaseCopy;
require("regenerator-runtime/runtime");
var _path = _interopRequireDefault(require("path"));
var _gulp = _interopRequireDefault(require("gulp"));
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _gulpBabel = _interopRequireDefault(require("gulp-babel"));
var _gulpSourcemaps = _interopRequireDefault(require("gulp-sourcemaps"));
var _execa = _interopRequireDefault(require("execa"));
var localeLoader = _interopRequireWildcard(require("@ringcentral-integration/locale-loader"));
var _localeSettings = _interopRequireDefault(require("@ringcentral-integration/locale-settings"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function getVersionFromTag() {
  return _getVersionFromTag.apply(this, arguments);
}
function _getVersionFromTag() {
  _getVersionFromTag = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var tag;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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
            return _execa["default"].command('git describe --exact-match --tags $(git rev-parse HEAD)', {
              shell: true
            });
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
    }, _callee, null, [[3, 12]]);
  }));
  return _getVersionFromTag.apply(this, arguments);
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
  return _releaseClean.apply(this, arguments);
}
function _releaseClean() {
  _releaseClean = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var files, _iterator, _step, file;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _fsExtra["default"].exists(RELEASE_PATH);
          case 2:
            if (_context2.sent) {
              _context2.next = 5;
              break;
            }
            _context2.next = 5;
            return _execa["default"].command("mkdir -p ".concat(RELEASE_PATH), {
              shell: true
            });
          case 5:
            _context2.next = 7;
            return _fsExtra["default"].readdir(RELEASE_PATH);
          case 7:
            files = _context2.sent.filter(function (file) {
              return !/^\./.test(file);
            });
            _iterator = _createForOfIteratorHelper(files);
            _context2.prev = 9;
            _iterator.s();
          case 11:
            if ((_step = _iterator.n()).done) {
              _context2.next = 17;
              break;
            }
            file = _step.value;
            _context2.next = 15;
            return _fsExtra["default"].remove(_path["default"].resolve(RELEASE_PATH, file));
          case 15:
            _context2.next = 11;
            break;
          case 17:
            _context2.next = 22;
            break;
          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](9);
            _iterator.e(_context2.t0);
          case 22:
            _context2.prev = 22;
            _iterator.f();
            return _context2.finish(22);
          case 25:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[9, 19, 22, 25]]);
  }));
  return _releaseClean.apply(this, arguments);
}
function releaseCopy() {
  return _gulp["default"].src(["".concat(BUILD_PATH, "/**"), "".concat(__dirname, "/README.md"), "".concat(__dirname, "/LICENSE")]).pipe(_gulp["default"].dest(RELEASE_PATH));
}
function generatePackage() {
  return _generatePackage.apply(this, arguments);
}
function _generatePackage() {
  _generatePackage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var packageInfo, version;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = JSON;
            _context3.next = 3;
            return _fsExtra["default"].readFile(_path["default"].resolve(BUILD_PATH, 'package.json'));
          case 3:
            _context3.t1 = _context3.sent;
            packageInfo = _context3.t0.parse.call(_context3.t0, _context3.t1);
            delete packageInfo.scripts;
            delete packageInfo.jest;
            _context3.next = 9;
            return getVersionFromTag();
          case 9:
            version = _context3.sent;
            console.log('version:', version);
            if (version) {
              packageInfo.version = version;
              packageInfo.name = '@ringcentral-integration/glip-widgets';
            }
            _context3.next = 14;
            return _fsExtra["default"].writeFile(_path["default"].resolve(RELEASE_PATH, 'package.json'), JSON.stringify(packageInfo, null, 2));
          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _generatePackage.apply(this, arguments);
}
var release = _gulp["default"].series(_gulp["default"].parallel(build, releaseClean), _gulp["default"].parallel(releaseCopy, generatePackage));
exports.release = release;
function exportLocale() {
  return localeLoader.exportLocale(_objectSpread({}, _localeSettings["default"]));
}
function exportFullLocale() {
  return localeLoader.exportLocale(_objectSpread(_objectSpread({}, _localeSettings["default"]), {}, {
    exportType: 'full'
  }));
}
function exportTranslatedLocale() {
  return localeLoader.exportLocale(_objectSpread(_objectSpread({}, _localeSettings["default"]), {}, {
    exportType: 'translated'
  }));
}
function importLocale() {
  return localeLoader.importLocale(_objectSpread({}, _localeSettings["default"]));
}
function consolidateLocale() {
  return localeLoader.consolidateLocale(_objectSpread(_objectSpread({}, _localeSettings["default"]), {}, {
    sourceFolder: _path["default"].resolve(__dirname, 'lib/countryNames')
  }));
}
//# sourceMappingURL=gulpfile.js.map
