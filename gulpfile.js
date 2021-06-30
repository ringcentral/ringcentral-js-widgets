"use strict";

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.release = exports.build = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.regexp.replace");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.map");

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

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      .", " {\n        composes: icon;\n      }\n      .", ":before "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
  return _gulp["default"].src(['./**', '!./**/*.js', '!./test{/**,}', '!./coverage{/**,}', '!./node_modules{/**,}', '!package-lock.json']).pipe(_gulp["default"].dest(BUILD_PATH));
}

function preBuild() {
  return _gulp["default"].src(['./**/*.js', './**/*.ts', './**/*.tsx', './**/*.jsx', '!./**/*.test.js', '!./test{/**,}', '!./coverage{/**,}', '!./node_modules{/**,}', '!gulpfile.babel.js']).pipe((0, _transformLoader["default"])(_objectSpread({}, _localeSettings["default"]))).pipe(_gulpSourcemaps["default"].init()).pipe((0, _gulpBabel["default"])()).pipe(_gulpSourcemaps["default"].write('.')).pipe(_gulp["default"].dest(BUILD_PATH));
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
