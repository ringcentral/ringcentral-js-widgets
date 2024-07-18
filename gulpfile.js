"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.join");
require("core-js/modules/es.array.map");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
require("core-js/modules/es.string.split");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.release = exports.build = void 0;
require("regenerator-runtime/runtime");
var _path = _interopRequireDefault(require("path"));
var _dedent = _interopRequireDefault(require("dedent"));
var _execa = _interopRequireDefault(require("execa"));
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _gulp = _interopRequireDefault(require("gulp"));
var _gulpBabel = _interopRequireDefault(require("gulp-babel"));
var _gulpSourcemaps = _interopRequireDefault(require("gulp-sourcemaps"));
var _consolidateLocale = _interopRequireDefault(require("@ringcentral-integration/locale-loader/lib/consolidateLocale"));
var _exportLocale = _interopRequireDefault(require("@ringcentral-integration/locale-loader/lib/exportLocale"));
var _importLocale = _interopRequireDefault(require("@ringcentral-integration/locale-loader/lib/importLocale"));
var _transformLoader = _interopRequireDefault(require("@ringcentral-integration/locale-loader/lib/transformLoader"));
var _localeSettings = _interopRequireDefault(require("@ringcentral-integration/locale-settings"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      .", " {\n        composes: icon;\n      }\n      .", ":before "]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var BUILD_PATH = _path["default"].resolve(__dirname, '../../build/ringcentral-widgets');
var RELEASE_PATH = _path["default"].resolve(__dirname, '../../release/ringcentral-widgets');
function getVersionFromTag() {
  return _getVersionFromTag.apply(this, arguments);
}
function _getVersionFromTag() {
  _getVersionFromTag = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    var tag;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            tag = process.env.TRAVIS_TAG;
            if (!(tag && /^\d+.\d+.\d+/.test(tag))) {
              _context7.next = 3;
              break;
            }
            return _context7.abrupt("return", tag);
          case 3:
            _context7.prev = 3;
            _context7.next = 6;
            return _execa["default"].command('git describe --exact-match --tags $(git rev-parse HEAD)', {
              shell: true
            });
          case 6:
            tag = _context7.sent;
            tag = tag.stdout.replace(/\r?\n|\r/g, '');
            if (!/^\d+.\d+.\d+/.test(tag)) {
              _context7.next = 10;
              break;
            }
            return _context7.abrupt("return", tag);
          case 10:
            _context7.next = 15;
            break;
          case 12:
            _context7.prev = 12;
            _context7.t0 = _context7["catch"](3);
            console.error(_context7.t0);
          case 15:
            return _context7.abrupt("return", null);
          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[3, 12]]);
  }));
  return _getVersionFromTag.apply(this, arguments);
}
function clean() {
  return _fsExtra["default"].remove(BUILD_PATH);
}
function copy() {
  return _gulp["default"].src(['./**', '!./**/*.js', '!./test{/**,}', '!./coverage{/**,}', '!./node_modules{/**,}', '!./html-report{/**,}', '!package-lock.json']).pipe(_gulp["default"].dest(BUILD_PATH));
}
function preBuild() {
  return _gulp["default"].src(['./**/*.js', './**/*.ts', './**/*.tsx', './**/*.jsx', '!./**/*.test.js', '!./test{/**,}', '!./coverage{/**,}', '!./node_modules{/**,}', '!./html-report{/**,}', '!gulpfile.babel.js']).pipe((0, _transformLoader["default"])(_objectSpread({}, _localeSettings["default"]))).pipe(_gulpSourcemaps["default"].init()).pipe((0, _gulpBabel["default"])()).pipe(_gulpSourcemaps["default"].write('.')).pipe(_gulp["default"].dest(BUILD_PATH));
}
var build = _gulp["default"].series(clean, copy, preBuild);
exports.build = build;
function releaseClean() {
  return _releaseClean.apply(this, arguments);
}
function _releaseClean() {
  _releaseClean = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    var files, _iterator, _step, file;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _fsExtra["default"].exists(RELEASE_PATH);
          case 2:
            if (_context8.sent) {
              _context8.next = 5;
              break;
            }
            _context8.next = 5;
            return _execa["default"].command("mkdir -p ".concat(RELEASE_PATH), {
              shell: true
            });
          case 5:
            _context8.next = 7;
            return _fsExtra["default"].readdir(RELEASE_PATH);
          case 7:
            files = _context8.sent.filter(function (file) {
              return !/^\./.test(file);
            });
            _iterator = _createForOfIteratorHelper(files);
            _context8.prev = 9;
            _iterator.s();
          case 11:
            if ((_step = _iterator.n()).done) {
              _context8.next = 17;
              break;
            }
            file = _step.value;
            _context8.next = 15;
            return _fsExtra["default"].remove(_path["default"].resolve(RELEASE_PATH, file));
          case 15:
            _context8.next = 11;
            break;
          case 17:
            _context8.next = 22;
            break;
          case 19:
            _context8.prev = 19;
            _context8.t0 = _context8["catch"](9);
            _iterator.e(_context8.t0);
          case 22:
            _context8.prev = 22;
            _iterator.f();
            return _context8.finish(22);
          case 25:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[9, 19, 22, 25]]);
  }));
  return _releaseClean.apply(this, arguments);
}
function releaseCopy() {
  return _gulp["default"].src(["".concat(BUILD_PATH, "/**"), "".concat(__dirname, "/README.md"), "".concat(__dirname, "/LICENSE")]).pipe(_gulp["default"].dest(RELEASE_PATH));
}
function preRelease() {
  return _preRelease.apply(this, arguments);
}
function _preRelease() {
  _preRelease = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
    var packageInfo, version;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.t0 = JSON;
            _context9.next = 3;
            return _fsExtra["default"].readFile(_path["default"].resolve(BUILD_PATH, 'package.json'));
          case 3:
            _context9.t1 = _context9.sent;
            packageInfo = _context9.t0.parse.call(_context9.t0, _context9.t1);
            delete packageInfo.scripts;
            delete packageInfo.jest;
            _context9.next = 9;
            return getVersionFromTag();
          case 9:
            version = _context9.sent;
            console.log('version:', version);
            if (version) {
              packageInfo.version = version;
              packageInfo.name = '@ringcentral-integration/widgets';
            }
            _context9.next = 14;
            return _fsExtra["default"].writeFile(_path["default"].resolve(RELEASE_PATH, 'package.json'), JSON.stringify(packageInfo, null, 2));
          case 14:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _preRelease.apply(this, arguments);
}
var release = _gulp["default"].series(_gulp["default"].parallel(build, releaseClean), releaseCopy, preRelease);
exports.release = release;
function normalizeName(str) {
  return str.split(/[-_]/g).map(function (token, idx) {
    return "".concat(idx > 0 ? token[0].toUpperCase() : token[0].toLowerCase()).concat(token.toLowerCase().substr(1));
  }).join('');
}
exports['generate-font'] = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var cssLocation, content, output, regExp, match, _match, _match2, target, name, normalizedName, newContent;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          cssLocation = _path["default"].resolve(__dirname, 'assets/DynamicsFont/style.css');
          _context.next = 4;
          return _fsExtra["default"].readFile(cssLocation, 'utf8');
        case 4:
          content = _context.sent;
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
          _context.next = 10;
          return _fsExtra["default"].writeFile(_path["default"].resolve(__dirname, 'assets/DynamicsFont/DynamicsFont.scss'), output, 'utf8');
        case 10:
          _context.next = 15;
          break;
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 12]]);
}));
exports['export-locale'] = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", (0, _exportLocale["default"])(_objectSpread({}, _localeSettings["default"])));
        case 1:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
}));
exports['export-locale-full'] = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", (0, _exportLocale["default"])(_objectSpread(_objectSpread({}, _localeSettings["default"]), {}, {
            exportType: 'full'
          })));
        case 1:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
}));
exports['export-locale-translated'] = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
  return regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", (0, _exportLocale["default"])(_objectSpread(_objectSpread({}, _localeSettings["default"]), {}, {
            exportType: 'translated'
          })));
        case 1:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4);
}));
exports['import-locale'] = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
  return regeneratorRuntime.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", (0, _importLocale["default"])(_objectSpread({}, _localeSettings["default"])));
        case 1:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5);
}));
exports['consolidate-locale'] = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
  return regeneratorRuntime.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          return _context6.abrupt("return", (0, _consolidateLocale["default"])(_objectSpread(_objectSpread({}, _localeSettings["default"]), {}, {
            sourceFolder: _path["default"].resolve(__dirname, 'lib/countryNames')
          })));
        case 1:
        case "end":
          return _context6.stop();
      }
    }
  }, _callee6);
}));
//# sourceMappingURL=gulpfile.js.map
