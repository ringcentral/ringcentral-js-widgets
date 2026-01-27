"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarouselModalPanel = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _IconButton = require("@ringcentral/juno/es6/components/Buttons/IconButton/IconButton.js");
var _useEventListener = require("@ringcentral/juno/es6/foundation/hooks/useEventListener/useEventListener.js");
var _useKeyboardMoveFocus2 = require("@ringcentral/juno/es6/foundation/hooks/useKeyboardMoveFocus/useKeyboardMoveFocus.js");
var _ArrowLeft = _interopRequireDefault(require("@ringcentral/juno-icon/es6/ArrowLeft2.js"));
var _ArrowRight = _interopRequireDefault(require("@ringcentral/juno-icon/es6/ArrowRight.js"));
var _Close = _interopRequireDefault(require("@ringcentral/juno-icon/es6/Close.js"));
var _react = _interopRequireDefault(require("react"));
var _ModalView = require("../../ModalView");
var _CarouselModalItem = require("./CarouselModalItem");
var _styles = require("./styles");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var CarouselModalPanel = exports.CarouselModalPanel = function CarouselModalPanel(_ref) {
  var activeIndex = _ref.activeIndex,
    getContainerSize = _ref.getContainerSize,
    setActiveIndex = _ref.setActiveIndex,
    onLoadFail = _ref.onLoadFail,
    invisible = _ref.invisible;
  var _useModalItemView = (0, _ModalView.useModalItemView)(),
    action = _useModalItemView.action,
    props = _useModalItemView.props;
  var payload = props.payload;
  var data = payload.data,
    showLoading = payload.showLoading;
  var totalLength = data.length;
  var moreThenHalf = activeIndex >= totalLength / 2;
  var _useKeyboardMoveFocus = (0, _useKeyboardMoveFocus2.useKeyboardMoveFocus)({
      options: data,
      columns: totalLength,
      focusedIndexRef: {
        current: activeIndex
      },
      infinite: false,
      onFocusedIndexChange: function onFocusedIndexChange(event, toIndex) {
        setActiveIndex(toIndex);
        event === null || event === void 0 ? void 0 : event.preventDefault();
      }
    }),
    onKeyFocusedIndexHandle = _useKeyboardMoveFocus.onKeyFocusedIndexHandle;
  (0, _useEventListener.useEventListener)(global.document, 'keydown', function (e) {
    onKeyFocusedIndexHandle(e);
  });
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, invisible ? /*#__PURE__*/_react["default"].createElement(_styles.CarouselModalDialogInvisibleGlobalStyle, null) : null, /*#__PURE__*/_react["default"].createElement(_ModalView.DialogContentReset, null, /*#__PURE__*/_react["default"].createElement(_styles.CloseWrap, null, /*#__PURE__*/_react["default"].createElement(_IconButton.RcIconButton, {
    symbol: _Close["default"],
    variant: "outline",
    radius: "circle",
    size: "small",
    color: "neutral.f06",
    onClick: function onClick() {
      action === null || action === void 0 ? void 0 : action.close();
    }
  })), activeIndex !== 0 ? /*#__PURE__*/_react["default"].createElement(_styles.ButtonWrap, {
    direction: "left"
  }, /*#__PURE__*/_react["default"].createElement(_IconButton.RcIconButton, {
    symbol: _ArrowLeft["default"],
    variant: "inverse",
    size: "xlarge",
    color: "neutral.f11",
    onClick: function onClick() {
      setActiveIndex(activeIndex - 1);
    }
  })) : null, data.map(function (_ref2, i) {
    var url = _ref2.url,
      size = _ref2.size;
    return /*#__PURE__*/_react["default"].createElement(_CarouselModalItem.CarouselModalItem
    // here index never be change, so use i is find
    // eslint-disable-next-line react/no-array-index-key
    , {
      key: i,
      url: url,
      show: i === activeIndex,
      size: size,
      showLoading: showLoading,
      onLoadFail: onLoadFail,
      getContainerSize: getContainerSize
    });
  }), activeIndex !== totalLength - 1 ? /*#__PURE__*/_react["default"].createElement(_styles.ButtonWrap, {
    direction: "right"
  }, /*#__PURE__*/_react["default"].createElement(_IconButton.RcIconButton, {
    symbol: _ArrowRight["default"],
    variant: "inverse",
    size: "xlarge",
    color: "neutral.f11",
    onClick: function onClick() {
      setActiveIndex(activeIndex + 1);
    }
  })) : null, totalLength > 1 ? /*#__PURE__*/_react["default"].createElement(_styles.DotWrap, null, /*#__PURE__*/_react["default"].createElement(_styles.DotItem, {
    active: !moreThenHalf,
    onClick: function onClick() {
      setActiveIndex(0);
    }
  }), /*#__PURE__*/_react["default"].createElement(_styles.DotItem, {
    active: moreThenHalf,
    onClick: function onClick() {
      setActiveIndex(totalLength - 1);
    }
  })) : null));
};
//# sourceMappingURL=CarouselModalPanel.js.map
