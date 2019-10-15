"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.reduce");

require("regenerator-runtime/runtime");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = _interopRequireDefault(require("../PopupModal/styles.scss"));

var _DropDialInNumberList = _interopRequireDefault(require("../DropDialInNumberList"));

var _DropAdditionalValues = _interopRequireDefault(require("../DropAdditionalValues"));

var _MultipleSelect = _interopRequireDefault(require("../MultipleSelect"));

var _Switch = _interopRequireDefault(require("../Switch"));

var _DialInNumberDropdown = _interopRequireDefault(require("../DialInNumberDropdown"));

var _Title = _interopRequireDefault(require("../Title"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ConferencePanel =
/*#__PURE__*/
function (_Component) {
  _inherits(ConferencePanel, _Component);

  function ConferencePanel(props) {
    var _this;

    _classCallCheck(this, ConferencePanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConferencePanel).call(this, props));

    _this.onUpdate =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(key, value) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.setState(_defineProperty({}, key, value));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.onUpdateAllowJoinBeforeHost =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(checked) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this.props.updateEnableJoinBeforeHost(checked);

              case 2:
                result = _context2.sent;

                if (!(result === null)) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return");

              case 5:
                _this.setState({
                  allowJoinBeforeHost: result.allowJoinBeforeHost
                });

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x3) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.renderValue = function () {
      var _this$state = _this.state,
          dialInNumber = _this$state.dialInNumber,
          additionalNumbers = _this$state.additionalNumbers,
          dialInNumbers = _this$state.dialInNumbers;
      var additionalNumberObjs = (additionalNumbers || []).reduce(function (res, curr) {
        if (curr !== dialInNumber) {
          return res.concat(dialInNumbers.find(function (e) {
            return e.phoneNumber === curr;
          }));
        }

        return res;
      }, []);
      return _react["default"].createElement("div", {
        className: _styles["default"].additionalValueList
      }, _react["default"].createElement(_DropAdditionalValues["default"], {
        dialInNumbers: additionalNumberObjs,
        selected: additionalNumbers,
        onChange: function onChange(numbers) {
          return _this.onUpdate('additionalNumbers', numbers);
        }
      }));
    };

    _this.renderDropdownMenu = function (open) {
      var _this$state2 = _this.state,
          dialInNumber = _this$state2.dialInNumber,
          additionalNumbers = _this$state2.additionalNumbers,
          dialInNumbers = _this$state2.dialInNumbers;
      return _react["default"].createElement(_DropDialInNumberList["default"], {
        open: open,
        dialInNumbers: dialInNumbers.filter(function (item) {
          return item.phoneNumber !== dialInNumber;
        }),
        selected: additionalNumbers,
        onChange: function onChange(numbers) {
          return _this.onUpdate('additionalNumbers', numbers);
        }
      });
    };

    _this.getDatas = function () {
      var _this$state3 = _this.state,
          dialInNumber = _this$state3.dialInNumber,
          additionalNumbers = _this$state3.additionalNumbers,
          allowJoinBeforeHost = _this$state3.allowJoinBeforeHost;
      return {
        dialInNumber: dialInNumber,
        additionalNumbers: additionalNumbers,
        allowJoinBeforeHost: allowJoinBeforeHost
      };
    };

    _this.state = {
      dialInNumber: props.dialInNumber,
      dialInNumbers: props.dialInNumbers,
      additionalNumbers: props.additionalNumbers,
      allowJoinBeforeHost: props.allowJoinBeforeHost
    };
    return _this;
  }

  _createClass(ConferencePanel, [{
    key: "render",
    value: function render() {
      var i18n = this.props.i18n;
      var _this$state4 = this.state,
          dialInNumber = _this$state4.dialInNumber,
          dialInNumbers = _this$state4.dialInNumbers,
          additionalNumbers = _this$state4.additionalNumbers,
          allowJoinBeforeHost = _this$state4.allowJoinBeforeHost;
      return _react["default"].createElement("div", {
        className: _styles["default"].form
      }, _react["default"].createElement("div", {
        className: _styles["default"].formGroup
      }, _react["default"].createElement(_Title["default"], {
        label: i18n.dialInNumber
      }), _react["default"].createElement(_DialInNumberDropdown["default"], {
        onUpdate: this.onUpdate,
        dialInNumber: dialInNumber,
        dialInNumbers: dialInNumbers
      })), _react["default"].createElement("div", {
        className: _styles["default"].formGroup
      }, _react["default"].createElement(_Title["default"], {
        label: i18n.addinalDialInNumbers
      }), _react["default"].createElement("span", null, _react["default"].createElement(_MultipleSelect["default"], {
        dataSign: "conferenceDropdownSelect",
        label: i18n.selectNumbers,
        dropdownAlign: "left",
        renderValue: this.renderValue,
        renderDropdownMenu: this.renderDropdownMenu
      }))), _react["default"].createElement("div", {
        className: _styles["default"].formGroup
      }, _react["default"].createElement(_Title["default"], {
        label: i18n.meetingOptions
      }), _react["default"].createElement("div", {
        className: _styles["default"].flex
      }, _react["default"].createElement("div", null, i18n.enableJoinBeforeHost), _react["default"].createElement("span", null, _react["default"].createElement(_Switch["default"], {
        checked: allowJoinBeforeHost,
        dataSign: "enableJoinToggle",
        onChange: this.onUpdateAllowJoinBeforeHost
      })))));
    }
  }]);

  return ConferencePanel;
}(_react.Component);

ConferencePanel.propTypes = {
  dialInNumbers: _propTypes["default"].array,
  dialInNumber: _propTypes["default"].string.isRequired,
  additionalNumbers: _propTypes["default"].array.isRequired,
  i18n: _propTypes["default"].object.isRequired,
  allowJoinBeforeHost: _propTypes["default"].bool.isRequired,
  updateEnableJoinBeforeHost: _propTypes["default"].func.isRequired
};
ConferencePanel.defaultProps = {
  dialInNumbers: []
};
var _default = ConferencePanel;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
