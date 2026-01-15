"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.release = exports.build = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.split.js");
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
var _templateObject;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
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
  _getVersionFromTag = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
    var tag, _t2;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          tag = process.env.TRAVIS_TAG;
          if (!(tag && /^\d+.\d+.\d+/.test(tag))) {
            _context7.n = 1;
            break;
          }
          return _context7.a(2, tag);
        case 1:
          _context7.p = 1;
          _context7.n = 2;
          return _execa["default"].command('git describe --exact-match --tags $(git rev-parse HEAD)', {
            shell: true
          });
        case 2:
          tag = _context7.v;
          tag = tag.stdout.replace(/\r?\n|\r/g, '');
          if (!/^\d+.\d+.\d+/.test(tag)) {
            _context7.n = 3;
            break;
          }
          return _context7.a(2, tag);
        case 3:
          _context7.n = 5;
          break;
        case 4:
          _context7.p = 4;
          _t2 = _context7.v;
          console.error(_t2);
        case 5:
          return _context7.a(2, null);
      }
    }, _callee7, null, [[1, 4]]);
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
var build = exports.build = _gulp["default"].series(clean, copy, preBuild);
function releaseClean() {
  return _releaseClean.apply(this, arguments);
}
function _releaseClean() {
  _releaseClean = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
    var files, _iterator, _step, file, _t3;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.p = _context8.n) {
        case 0:
          _context8.n = 1;
          return _fsExtra["default"].exists(RELEASE_PATH);
        case 1:
          if (_context8.v) {
            _context8.n = 2;
            break;
          }
          _context8.n = 2;
          return _execa["default"].command("mkdir -p ".concat(RELEASE_PATH), {
            shell: true
          });
        case 2:
          _context8.n = 3;
          return _fsExtra["default"].readdir(RELEASE_PATH);
        case 3:
          files = _context8.v.filter(function (file) {
            return !/^\./.test(file);
          });
          _iterator = _createForOfIteratorHelper(files);
          _context8.p = 4;
          _iterator.s();
        case 5:
          if ((_step = _iterator.n()).done) {
            _context8.n = 7;
            break;
          }
          file = _step.value;
          _context8.n = 6;
          return _fsExtra["default"].remove(_path["default"].resolve(RELEASE_PATH, file));
        case 6:
          _context8.n = 5;
          break;
        case 7:
          _context8.n = 9;
          break;
        case 8:
          _context8.p = 8;
          _t3 = _context8.v;
          _iterator.e(_t3);
        case 9:
          _context8.p = 9;
          _iterator.f();
          return _context8.f(9);
        case 10:
          return _context8.a(2);
      }
    }, _callee8, null, [[4, 8, 9, 10]]);
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
  _preRelease = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
    var packageInfo, version, _t4;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.n) {
        case 0:
          _t4 = JSON;
          _context9.n = 1;
          return _fsExtra["default"].readFile(_path["default"].resolve(BUILD_PATH, 'package.json'));
        case 1:
          packageInfo = _t4.parse.call(_t4, _context9.v);
          delete packageInfo.scripts;
          delete packageInfo.jest;
          _context9.n = 2;
          return getVersionFromTag();
        case 2:
          version = _context9.v;
          console.log('version:', version);
          if (version) {
            packageInfo.version = version;
            packageInfo.name = '@ringcentral-integration/widgets';
          }
          _context9.n = 3;
          return _fsExtra["default"].writeFile(_path["default"].resolve(RELEASE_PATH, 'package.json'), JSON.stringify(packageInfo, null, 2));
        case 3:
          return _context9.a(2);
      }
    }, _callee9);
  }));
  return _preRelease.apply(this, arguments);
}
var release = exports.release = _gulp["default"].series(_gulp["default"].parallel(build, releaseClean), releaseCopy, preRelease);
function normalizeName(str) {
  return str.split(/[-_]/g).map(function (token, idx) {
    return "".concat(idx > 0 ? token[0].toUpperCase() : token[0].toLowerCase()).concat(token.toLowerCase().substr(1));
  }).join('');
}
exports['generate-font'] = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
  var cssLocation, content, output, regExp, match, _match, _match2, target, name, normalizedName, newContent, _t;
  return _regenerator().w(function (_context) {
    while (1) switch (_context.p = _context.n) {
      case 0:
        _context.p = 0;
        cssLocation = _path["default"].resolve(__dirname, 'assets/DynamicsFont/style.css');
        _context.n = 1;
        return _fsExtra["default"].readFile(cssLocation, 'utf8');
      case 1:
        content = _context.v;
        output = content.replace(/url\('fonts\/dynamics_icon/g, "url('./fonts/dynamics_icon").replace('[class^="icon-"], [class*=" icon-"]', '.icon');
        regExp = /\.icon-(.*):before/;
        do {
          match = regExp.exec(output);
          if (match) {
            _match = match, _match2 = _slicedToArray(_match, 2), target = _match2[0], name = _match2[1];
            normalizedName = normalizeName(name);
            newContent = (0, _dedent["default"])(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      .", " {\n        composes: icon;\n      }\n      .", ":before "])), normalizedName, normalizedName);
            output = output.replace(target, newContent);
          }
        } while (match);
        _context.n = 2;
        return _fsExtra["default"].writeFile(_path["default"].resolve(__dirname, 'assets/DynamicsFont/DynamicsFont.scss'), output, 'utf8');
      case 2:
        _context.n = 4;
        break;
      case 3:
        _context.p = 3;
        _t = _context.v;
        console.log(_t);
      case 4:
        return _context.a(2);
    }
  }, _callee, null, [[0, 3]]);
}));
exports['export-locale'] = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
  return _regenerator().w(function (_context2) {
    while (1) switch (_context2.n) {
      case 0:
        return _context2.a(2, (0, _exportLocale["default"])(_objectSpread({}, _localeSettings["default"])));
    }
  }, _callee2);
}));
exports['export-locale-full'] = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
  return _regenerator().w(function (_context3) {
    while (1) switch (_context3.n) {
      case 0:
        return _context3.a(2, (0, _exportLocale["default"])(_objectSpread(_objectSpread({}, _localeSettings["default"]), {}, {
          exportType: 'full'
        })));
    }
  }, _callee3);
}));
exports['export-locale-translated'] = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
  return _regenerator().w(function (_context4) {
    while (1) switch (_context4.n) {
      case 0:
        return _context4.a(2, (0, _exportLocale["default"])(_objectSpread(_objectSpread({}, _localeSettings["default"]), {}, {
          exportType: 'translated'
        })));
    }
  }, _callee4);
}));
exports['import-locale'] = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
  return _regenerator().w(function (_context5) {
    while (1) switch (_context5.n) {
      case 0:
        return _context5.a(2, (0, _importLocale["default"])(_objectSpread({}, _localeSettings["default"])));
    }
  }, _callee5);
}));
exports['consolidate-locale'] = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
  return _regenerator().w(function (_context6) {
    while (1) switch (_context6.n) {
      case 0:
        return _context6.a(2, (0, _consolidateLocale["default"])(_objectSpread(_objectSpread({}, _localeSettings["default"]), {}, {
          sourceFolder: _path["default"].resolve(__dirname, 'lib/countryNames')
        })));
    }
  }, _callee6);
}));
//# sourceMappingURL=gulpfile.js.map
