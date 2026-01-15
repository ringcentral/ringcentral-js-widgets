"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inboundQueuesPanelCases = exports.CheckInboundQueuesPanel = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.includes.js");
var _juno = require("@ringcentral/juno");
var _enzyme = require("enzyme");
var _react = _interopRequireDefault(require("react"));
var _index = require("./index");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
  var wrapper = (0, _enzyme.mount)(/*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_index.InboundQueuesPanel, {
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
var inboundQueuesPanelCases = exports.inboundQueuesPanelCases = [{
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
function findElement(wrapper, dataSign) {
  return wrapper.find("[data-sign=\"".concat(dataSign, "\"]")).at(0);
}
var CheckInboundQueuesPanel = exports.CheckInboundQueuesPanel = function CheckInboundQueuesPanel(_ref2) {
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
//# sourceMappingURL=InboundQueuesPanel.ut.js.map
