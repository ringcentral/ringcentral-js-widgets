"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
