"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inboundQueuesPanelCases = exports.CheckInboundQueuesPanel = void 0;

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _juno = require("@ringcentral/juno");

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function renderFunction(option) {
  return option.gateName;
}

function searchOption(option, text) {
  var _option$gateName;

  return option === null || option === void 0 ? void 0 : (_option$gateName = option.gateName) === null || _option$gateName === void 0 ? void 0 : _option$gateName.toLowerCase().includes(text.toLowerCase());
}

var currentLocale = 'en-US';

function setInboundQueues() {
  console.log('====setInboundQueues');
}

function getAssignedInboundQueues(inboundQueues) {
  return inboundQueues.filter(function (_ref) {
    var checked = _ref.checked;
    return checked;
  });
}

function isAllAssign(assignedInboundQueues, inboundQueues) {
  return !!assignedInboundQueues.length && assignedInboundQueues.length === inboundQueues.length;
}

function isSeveralAssign(assignedInboundQueues, inboundQueues) {
  return !!assignedInboundQueues.length && assignedInboundQueues.length !== inboundQueues.length;
}

function checkBoxOnChange(gateId, inboundQueuesState, setInboundQueuesState) {
  var inboundQueues = _toConsumableArray(inboundQueuesState);

  var index = inboundQueues.findIndex(function (option) {
    return option.gateId === gateId;
  });
  inboundQueues[index].checked = !inboundQueues[index].checked;
  setInboundQueuesState(inboundQueues);
}

function allCheckBoxOnChange(severalAssign, inboundQueuesState, setInboundQueuesState) {
  var inboundQueues = inboundQueuesState.map(function (option) {
    option.checked = severalAssign || !option.checked;
    return option;
  });
  setInboundQueuesState(inboundQueues);
}

var goBack = function goBack() {};

function setup(inboundQueues) {
  var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_index.InboundQueuesPanel, {
    renderFunction: renderFunction,
    searchOption: searchOption,
    currentLocale: currentLocale,
    inboundQueues: inboundQueues,
    submitInboundQueues: setInboundQueues,
    getAssignedInboundQueues: getAssignedInboundQueues,
    isAllAssign: isAllAssign,
    isSeveralAssign: isSeveralAssign,
    checkBoxOnChange: checkBoxOnChange,
    allCheckBoxOnChange: allCheckBoxOnChange,
    goBack: goBack
  })));
  return wrapper;
}

var inboundQueuesPanelCases = [{
  title: 'Assignment checkbox: indeterminate',
  assignment: 1,
  indeterminate: true,
  checked: false,
  bulkClick: false,
  list: [{
    checked: false,
    gateId: '001',
    gateName: 'gateName1'
  }, {
    checked: false,
    gateId: '002',
    gateName: 'gateName2'
  }, {
    checked: true,
    gateId: '003',
    gateName: 'gateName3'
  }]
}, {
  title: 'Assignment checkbox: indeterminate -> all select',
  assignment: 3,
  indeterminate: false,
  checked: true,
  bulkClick: true,
  list: [{
    checked: false,
    gateId: '001',
    gateName: 'gateName1'
  }, {
    checked: false,
    gateId: '002',
    gateName: 'gateName2'
  }, {
    checked: true,
    gateId: '003',
    gateName: 'gateName3'
  }]
}, {
  title: 'click Assignment checkbox: all select -> all unselect',
  assignment: 0,
  indeterminate: false,
  checked: false,
  bulkClick: true,
  list: [{
    checked: true,
    gateId: '001',
    gateName: 'gateName1'
  }, {
    checked: true,
    gateId: '002',
    gateName: 'gateName2'
  }, {
    checked: true,
    gateId: '003',
    gateName: 'gateName3'
  }]
}, {
  title: 'click Assignment checkbox: all unselect -> all select',
  assignment: 3,
  indeterminate: false,
  checked: true,
  bulkClick: true,
  list: [{
    checked: false,
    gateId: '001',
    gateName: 'gateName1'
  }, {
    checked: false,
    gateId: '002',
    gateName: 'gateName2'
  }, {
    checked: false,
    gateId: '003',
    gateName: 'gateName3'
  }]
}];
exports.inboundQueuesPanelCases = inboundQueuesPanelCases;

function findElement(wrapper, dataSign) {
  return wrapper.find("[data-sign=\"".concat(dataSign, "\"]")).at(0);
}

var CheckInboundQueuesPanel = function CheckInboundQueuesPanel(_ref2) {
  var list = _ref2.list,
      assignment = _ref2.assignment,
      indeterminate = _ref2.indeterminate,
      checked = _ref2.checked,
      bulkClick = _ref2.bulkClick;
  var wrapper = setup(list);

  if (bulkClick) {
    findElement(wrapper, 'bulkChangeCheckBox').find('input').simulate('click');
  }

  expect(findElement(wrapper, 'selectedTips').text()).toBe("".concat(assignment, " of ").concat(list.length, " Selected"));
  var bulkChangeCheckBox = findElement(wrapper, 'bulkChangeCheckBox');
  expect(bulkChangeCheckBox.prop('indeterminate')).toBe(indeterminate);
  expect(bulkChangeCheckBox.prop('checked')).toBe(checked);
};

exports.CheckInboundQueuesPanel = CheckInboundQueuesPanel;
//# sourceMappingURL=InboundQueuesPanel.ut.js.map
