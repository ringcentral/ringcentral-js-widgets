"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("regenerator-runtime/runtime");
var _utils = require("@ringcentral-integration/utils");
var _react = _interopRequireWildcard(require("react"));
var _reactUse = require("react-use");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var TiffViewer = function TiffViewer(_ref) {
  var tiffUrl = _ref.tiffUrl,
    onLoad = _ref.onLoad;
  var canvasRef = (0, _react.useRef)(null);
  var wrapperRef = (0, _react.useRef)(null);
  var mounted = (0, _reactUse.usePromise)();
  (0, _react.useEffect)(function () {
    _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var result, _wrapperRef$current$c, _wrapperRef$current, width, height, rgba, canvas, ctx, wrapperWidth, scale, offCanvas, offCtx, imageData;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return mounted((0, _utils.getTiffInfoWithCache)(tiffUrl));
            case 2:
              result = _context.sent;
              if (result) {
                try {
                  width = result.width, height = result.height, rgba = result.rgba;
                  canvas = canvasRef.current;
                  ctx = canvas.getContext('2d'); // Get the width of the wrapper div
                  wrapperWidth = (_wrapperRef$current$c = (_wrapperRef$current = wrapperRef.current) === null || _wrapperRef$current === void 0 ? void 0 : _wrapperRef$current.clientWidth) !== null && _wrapperRef$current$c !== void 0 ? _wrapperRef$current$c : 0; // Calculate the scale to fit the image within the wrapper
                  scale = wrapperWidth / width; // Set canvas size based on the scale factor
                  canvas.width = width * scale;
                  canvas.height = height * scale;
                  offCanvas = document.createElement('canvas');
                  offCanvas.width = width;
                  offCanvas.height = height;
                  offCtx = offCanvas.getContext('2d');
                  imageData = offCtx === null || offCtx === void 0 ? void 0 : offCtx.createImageData(width, height);
                  imageData.data.set(rgba);
                  offCtx.putImageData(imageData, 0, 0);
                  ctx.drawImage(offCanvas, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
                  onLoad === null || onLoad === void 0 ? void 0 : onLoad();
                } catch (error) {
                  console.error('Draw canvas fail', error);
                }
              }
            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }, [mounted, tiffUrl, onLoad]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: wrapperRef,
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/_react["default"].createElement("canvas", {
    ref: canvasRef,
    style: {
      width: '100%',
      height: 'auto'
    }
  }));
};
var _default = TiffViewer;
exports["default"] = _default;
//# sourceMappingURL=TiffViewer.js.map
