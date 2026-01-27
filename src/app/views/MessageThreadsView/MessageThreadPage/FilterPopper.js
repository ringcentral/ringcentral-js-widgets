"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterPopper = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.every.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("../../ConversationsViewSpring/ConversationsPage/i18n"));
var _utils = require("../utils");
var _i18n2 = _interopRequireDefault(require("./i18n"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var assignmentOptions = [_utils.assignmentOptionMap.currentUser, _utils.assignmentOptionMap.assignedToOthers, _utils.assignmentOptionMap.unassigned];
var footerClassName = 'px-3 pt-2 border-t border-neutral-b4 flex items-center justify-end gap-3';
var FilterPopper = exports.FilterPopper = function FilterPopper(_ref) {
  var anchorEl = _ref.anchorEl,
    open = _ref.open,
    _onClose = _ref.onClose,
    selectedAssignees = _ref.selectedAssignees,
    statusFilter = _ref.statusFilter,
    _ref$callQueues = _ref.callQueues,
    callQueues = _ref$callQueues === void 0 ? [] : _ref$callQueues,
    selectedCallQueues = _ref.selectedCallQueues,
    filter = _ref.filter,
    onSharedSearchFormUpdate = _ref.onSharedSearchFormUpdate;
  var _useLocale = (0, _hooks.useLocale)(_i18n2["default"], _i18n["default"]),
    t = _useLocale.t;
  var _useState = (0, _react.useState)('main'),
    _useState2 = _slicedToArray(_useState, 2),
    view = _useState2[0],
    setView = _useState2[1];
  var _useState3 = (0, _react.useState)(selectedAssignees),
    _useState4 = _slicedToArray(_useState3, 2),
    tempSelectedAssignees = _useState4[0],
    setTempSelectedAssignees = _useState4[1];
  var _useState5 = (0, _react.useState)(selectedCallQueues),
    _useState6 = _slicedToArray(_useState5, 2),
    tempSelectedCallQueues = _useState6[0],
    setTempSelectedCallQueues = _useState6[1];
  var _useState7 = (0, _react.useState)(statusFilter),
    _useState8 = _slicedToArray(_useState7, 2),
    tempStatusFilter = _useState8[0],
    setTempStatusFilter = _useState8[1];
  var _useState9 = (0, _react.useState)(''),
    _useState0 = _slicedToArray(_useState9, 2),
    searchQuery = _useState0[0],
    setSearchQuery = _useState0[1];
  (0, _react.useEffect)(function () {
    if (open) {
      setView('main');
      setTempSelectedAssignees(selectedAssignees);
      setTempSelectedCallQueues(selectedCallQueues);
      setSearchQuery('');
    } else {
      setView('main');
    }
  }, [open, selectedAssignees, selectedCallQueues]);
  var isShowAllSelected = (0, _react.useMemo)(function () {
    return assignmentOptions.every(function (option) {
      return tempSelectedAssignees.includes(option.value);
    });
  }, [tempSelectedAssignees]);
  var isShowAllIndeterminate = (0, _react.useMemo)(function () {
    var selectedCount = assignmentOptions.filter(function (option) {
      return tempSelectedAssignees.includes(option.value);
    }).length;
    return selectedCount > 0 && selectedCount < assignmentOptions.length;
  }, [tempSelectedAssignees]);
  var handleAssignmentClick = function handleAssignmentClick(e) {
    e.stopPropagation();
    setView('assignment');
  };
  var handleBackToMainAssignment = function handleBackToMainAssignment() {
    setTempSelectedAssignees(selectedAssignees);
    setTempSelectedCallQueues(selectedCallQueues);
    setSearchQuery('');
    setView('main');
  };
  var handleShowAllChange = function handleShowAllChange(checked) {
    var allOptions = assignmentOptions.map(function (option) {
      return option.value;
    });
    setTempSelectedAssignees(checked ? allOptions : []);
  };
  var handleDone = function handleDone() {
    onSharedSearchFormUpdate === null || onSharedSearchFormUpdate === void 0 ? void 0 : onSharedSearchFormUpdate({
      selectedAssignees: tempSelectedAssignees
    });
    setView('main');
    _onClose === null || _onClose === void 0 ? void 0 : _onClose();
  };
  var handleSharedWithMeClick = function handleSharedWithMeClick(e) {
    e.stopPropagation();
    setView('sharedWithMe');
  };
  var handleBackToMainFromShared = function handleBackToMainFromShared() {
    setTempSelectedCallQueues(selectedCallQueues);
    setSearchQuery('');
    setView('main');
  };
  var handleSharedWithMeDone = function handleSharedWithMeDone() {
    onSharedSearchFormUpdate === null || onSharedSearchFormUpdate === void 0 ? void 0 : onSharedSearchFormUpdate({
      selectedCallQueues: tempSelectedCallQueues
    });
    setView('main');
    _onClose === null || _onClose === void 0 ? void 0 : _onClose();
  };
  var handleShowAllCallQueuesChange = function handleShowAllCallQueuesChange(checked) {
    if (checked) {
      var allQueueIds = callQueues.map(function (queue) {
        return queue.id;
      });
      setTempSelectedCallQueues(allQueueIds);
    } else {
      setTempSelectedCallQueues([]);
    }
  };
  var filteredCallQueues = (0, _react.useMemo)(function () {
    if (!searchQuery.trim()) {
      return callQueues;
    }
    var lowerQuery = searchQuery.toLowerCase();
    return callQueues.filter(function (queue) {
      var _queue$site;
      return queue.name.toLowerCase().includes(lowerQuery) || queue.extensionNumber.toLowerCase().includes(lowerQuery) || ((_queue$site = queue.site) === null || _queue$site === void 0 ? void 0 : _queue$site.name.toLowerCase().includes(lowerQuery));
    });
  }, [callQueues, searchQuery]);
  var isShowAllCallQueuesSelected = (0, _react.useMemo)(function () {
    if (callQueues.length === 0) return false;
    return tempSelectedCallQueues.length === callQueues.length && callQueues.every(function (queue) {
      return tempSelectedCallQueues.includes(queue.id);
    });
  }, [tempSelectedCallQueues, callQueues]);
  var isShowAllCallQueuesIndeterminate = (0, _react.useMemo)(function () {
    if (callQueues.length === 0) return false;
    var selectedCount = tempSelectedCallQueues.length;
    return selectedCount > 0 && selectedCount < callQueues.length;
  }, [tempSelectedCallQueues, callQueues]);
  var getSharedWithMeText = (0, _react.useMemo)(function () {
    if (tempSelectedCallQueues.length === 0 ||
    // If all call queues are selected, show "show all"
    callQueues.length > 0 && tempSelectedCallQueues.length === callQueues.length) {
      return t('all');
    }
    if (tempSelectedCallQueues.length === 1) {
      var queue = callQueues.find(function (q) {
        return q.id === tempSelectedCallQueues[0];
      });
      var displayName = queue ? queue.site ? "".concat(queue.name, " | ").concat(queue.site.name) : queue.name : '';
      return displayName;
    }
    var firstQueue = callQueues.find(function (q) {
      return q.id === tempSelectedCallQueues[0];
    });
    var firstDisplayName = firstQueue ? firstQueue.site ? "".concat(firstQueue.name, " | ").concat(firstQueue.site.name) : firstQueue.name : '';
    return "".concat(firstDisplayName, " + ").concat(tempSelectedCallQueues.length - 1, " ").concat(t('more'));
  }, [tempSelectedCallQueues, callQueues, t]);

  // Get assignment filter text
  var getAssignmentText = (0, _react.useMemo)(function () {
    if (tempSelectedAssignees.length === 0 ||
    // If all assignees are selected, show "show all"
    assignmentOptions.every(function (option) {
      return tempSelectedAssignees.includes(option.value);
    })) {
      return t('all');
    }

    // Collect labels and sort by priority order (using assignmentOptions order)
    var filterLabels = [];
    var selectedOptions = assignmentOptions.filter(function (option) {
      return tempSelectedAssignees.includes(option.value);
    });
    selectedOptions.forEach(function (option) {
      filterLabels.push(t(option.labelKey));
    });
    if (filterLabels.length === 1) {
      return filterLabels[0];
    }
    return "".concat(filterLabels[0], " + ").concat(filterLabels.length - 1, " ").concat(t('more'));
  }, [tempSelectedAssignees, t]);
  var statusFilterList = (0, _react.useMemo)(function () {
    return [{
      key: 'Open',
      label: t('open'),
      dataSign: 'statusOpen'
    }, {
      key: 'Resolved',
      label: t('resolved'),
      dataSign: 'statusResolved'
    }];
  }, [t]);
  var mainFilterList = (0, _react.useMemo)(function () {
    return [{
      key: 'AssignedToMe',
      label: t('assignedToMe'),
      dataSign: 'filterAssignedToMe',
      updates: {
        filter: 'AssignedToMe',
        selectedAssignees: ['__CURRENT_USER__']
      }
    }, {
      key: 'Unread',
      label: t('unread'),
      dataSign: 'filterUnread',
      updates: {
        filter: 'Unread'
      }
    }];
  }, [t]);
  return /*#__PURE__*/_react["default"].createElement(_springUi.Menu, {
    open: open,
    variant: "pointed",
    anchorEl: anchorEl,
    onClose: function onClose() {
      // when close always reset value
      setView('main');
      setTempSelectedAssignees(selectedAssignees);
      setTempSelectedCallQueues(selectedCallQueues);
      setTempStatusFilter(statusFilter);
      setSearchQuery('');
      _onClose === null || _onClose === void 0 ? void 0 : _onClose();
    },
    placement: "bottom-end",
    onClick: function onClick(e) {
      e.stopPropagation();
    },
    "data-sign": "statusFilterMenu",
    className: "overflow-hidden"
    // eslint-disable-next-line jsx-a11y/no-autofocus
    ,
    autoFocus: false
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative w-[268px]"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('transition-all duration-300 ease-in-out', view === 'main' ? 'translate-x-0 opacity-100 relative z-10 pointer-events-auto' : '-translate-x-full opacity-0 absolute inset-0 pointer-events-none z-0 invisible')
  }, /*#__PURE__*/_react["default"].createElement(_springUi.MenuList, null, mainFilterList.map(function (_ref2) {
    var key = _ref2.key,
      label = _ref2.label,
      dataSign = _ref2.dataSign,
      updates = _ref2.updates;
    return /*#__PURE__*/_react["default"].createElement(_springUi.MenuItem, {
      key: key,
      highlighted: filter === key,
      onClick: function onClick(e) {
        e.stopPropagation();
        onSharedSearchFormUpdate === null || onSharedSearchFormUpdate === void 0 ? void 0 : onSharedSearchFormUpdate(updates);
        _onClose === null || _onClose === void 0 ? void 0 : _onClose();
      },
      "data-sign": dataSign
    }, /*#__PURE__*/_react["default"].createElement(_springUi.MenuItemText, null, label));
  }), /*#__PURE__*/_react["default"].createElement(_springUi.MenuDivider, null), /*#__PURE__*/_react["default"].createElement(_springUi.MenuItem, {
    disabled: true
  }, /*#__PURE__*/_react["default"].createElement(_springUi.MenuItemText, {
    className: "typography-descriptor text-neutral-b2"
  }, t('status'))), statusFilterList.map(function (_ref3) {
    var key = _ref3.key,
      label = _ref3.label,
      dataSign = _ref3.dataSign;
    var isSelected = tempStatusFilter.includes(key);
    var isDisabled = tempStatusFilter.length === 1 && isSelected;
    return /*#__PURE__*/_react["default"].createElement(_springUi.MenuItem, {
      key: key,
      onClick: function onClick(e) {
        e.stopPropagation();
        // Prevent unchecking if it's the only selected option
        if (isDisabled) return;
        var newStatusFilter = isSelected ? tempStatusFilter.filter(function (status) {
          return status !== key;
        }) : [].concat(_toConsumableArray(tempStatusFilter), [key]);
        setTempStatusFilter(newStatusFilter);
        onSharedSearchFormUpdate === null || onSharedSearchFormUpdate === void 0 ? void 0 : onSharedSearchFormUpdate({
          statusFilter: newStatusFilter
        });
      },
      autoClose: false,
      "data-sign": dataSign
    }, /*#__PURE__*/_react["default"].createElement(_springUi.MenuItemText, {
      info: isSelected ? /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
        symbol: _springIcon.CheckMd,
        className: "text-neutral-b0",
        size: "small"
      }) : undefined
    }, label));
  }), /*#__PURE__*/_react["default"].createElement(_springUi.MenuDivider, null), /*#__PURE__*/_react["default"].createElement(_springUi.MenuItem, {
    onClick: handleAssignmentClick,
    "data-sign": "assignmentMenuItem",
    autoClose: false
  }, /*#__PURE__*/_react["default"].createElement(_springUi.MenuItemText, {
    info: /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
      symbol: _springIcon.CaretRightMd,
      className: "text-neutral-b0",
      size: "small"
    })
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "typography-descriptor text-neutral-b2"
  }, t('assignment')), /*#__PURE__*/_react["default"].createElement("span", null, getAssignmentText))), /*#__PURE__*/_react["default"].createElement(_springUi.MenuItem, {
    onClick: handleSharedWithMeClick,
    "data-sign": "sharedWithMeMenuItem",
    autoClose: false
  }, /*#__PURE__*/_react["default"].createElement(_springUi.MenuItemText, {
    info: /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
      symbol: _springIcon.CaretRightMd,
      className: "text-neutral-b0",
      size: "small"
    })
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "typography-descriptor text-neutral-b2"
  }, t('sharedWithMe')), /*#__PURE__*/_react["default"].createElement("span", null, getSharedWithMeText))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('transition-all duration-300 ease-in-out', view === 'assignment' ? 'translate-x-0 opacity-100 relative z-10 pointer-events-auto' : '-translate-x-full opacity-0 absolute inset-0 pointer-events-none z-0 invisible')
  }, /*#__PURE__*/_react["default"].createElement(_springUi.MenuHeader, {
    start: /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
      color: "secondary",
      variant: "icon",
      size: "small",
      symbol: _springIcon.CaretLeftMd,
      onClick: function onClick(e) {
        e.stopPropagation();
        handleBackToMainAssignment();
      },
      "data-sign": "assignmentMenuBack"
    })
  }, t('assignment')), /*#__PURE__*/_react["default"].createElement(_springUi.MenuList, null, /*#__PURE__*/_react["default"].createElement(_springUi.MenuItem, {
    onClick: function onClick(e) {
      e.stopPropagation();
      handleShowAllChange(!isShowAllSelected);
    },
    autoClose: false,
    "data-sign": "assignmentMenuShowAll"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.MenuItemText, {
    className: "flex-1"
  }, t('selectAll')), /*#__PURE__*/_react["default"].createElement(_springUi.Checkbox, {
    inputProps: {
      tabIndex: -1
    },
    checked: isShowAllSelected,
    indeterminate: isShowAllIndeterminate,
    onChange: function onChange(e) {
      e.stopPropagation();
      handleShowAllChange(e.target.checked);
    }
  })), /*#__PURE__*/_react["default"].createElement(_springUi.MenuDivider, null), assignmentOptions.map(function (option) {
    var isSelected = tempSelectedAssignees.includes(option.value);
    return /*#__PURE__*/_react["default"].createElement(_springUi.MenuItem, {
      key: option.value,
      onClick: function onClick(e) {
        e.stopPropagation();
        var newAssignees = isSelected ? tempSelectedAssignees.filter(function (id) {
          return id !== option.value;
        }) : [].concat(_toConsumableArray(tempSelectedAssignees), [option.value]);
        setTempSelectedAssignees(newAssignees);
      },
      autoClose: false,
      "data-sign": option.dataSign
    }, /*#__PURE__*/_react["default"].createElement(_springUi.MenuItemText, {
      className: "flex-1"
    }, t(option.labelKey)), /*#__PURE__*/_react["default"].createElement(_springUi.Checkbox, {
      inputProps: {
        tabIndex: -1
      },
      checked: isSelected,
      onChange: function onChange(e) {
        e.stopPropagation();
        var newAssignees = e.target.checked ? [].concat(_toConsumableArray(tempSelectedAssignees), [option.value]) : tempSelectedAssignees.filter(function (id) {
          return id !== option.value;
        });
        setTempSelectedAssignees(newAssignees);
      }
    }));
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: footerClassName
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
    variant: "text",
    size: "medium",
    fullWidth: true,
    onClick: function onClick(e) {
      e.stopPropagation();
      handleBackToMainAssignment();
    },
    "data-sign": "assignmentMenuBackToMain"
  }, t('cancel')), /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
    variant: "contained",
    size: "medium",
    disabled: tempSelectedAssignees.length === 0,
    onClick: function onClick(e) {
      e.stopPropagation();
      handleDone();
    },
    fullWidth: true,
    "data-sign": "assignmentMenuDone"
  }, t('done')))), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('transition-all duration-300 ease-in-out', view === 'sharedWithMe' ? 'translate-x-0 opacity-100 relative z-10 pointer-events-auto' : '-translate-x-full opacity-0 absolute inset-0 pointer-events-none z-0 invisible')
  }, /*#__PURE__*/_react["default"].createElement(_springUi.MenuHeader, {
    start: /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
      color: "secondary",
      variant: "icon",
      size: "small",
      symbol: _springIcon.CaretLeftMd,
      onClick: function onClick(e) {
        e.stopPropagation();
        handleBackToMainFromShared();
      }
    })
  }, t('sharedWithMe')), /*#__PURE__*/_react["default"].createElement("div", {
    className: "px-4 py-2"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.TextField, {
    placeholder: t('search'),
    startAdornment: /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
      symbol: _springIcon.SearchMd,
      size: "small"
    }),
    fullWidth: true,
    size: "medium",
    value: searchQuery,
    onChange: function onChange(e) {
      e.stopPropagation();
      setSearchQuery(e.target.value);
    },
    inputProps: {
      'data-sign': 'sharedWithMeSearch'
    },
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  })), searchQuery.trim().length === 0 ? /*#__PURE__*/_react["default"].createElement(_springUi.MenuItem, {
    onClick: function onClick(e) {
      e.stopPropagation();
      handleShowAllCallQueuesChange(!isShowAllCallQueuesSelected);
    }
    // eslint-disable-next-line jsx-a11y/no-autofocus
    ,
    autoFocus: false,
    autoClose: false,
    "data-sign": "sharedWithMeShowAll"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.MenuItemText, {
    className: "flex-1"
  }, t('selectAll')), /*#__PURE__*/_react["default"].createElement(_springUi.Checkbox, {
    inputProps: {
      tabIndex: -1
    },
    checked: isShowAllCallQueuesSelected,
    indeterminate: isShowAllCallQueuesIndeterminate,
    onChange: function onChange(e) {
      e.stopPropagation();
      handleShowAllCallQueuesChange(e.target.checked);
    }
  })) : null, /*#__PURE__*/_react["default"].createElement(_springUi.MenuDivider, null), searchQuery.trim().length > 0 && filteredCallQueues.length === 0 ? /*#__PURE__*/_react["default"].createElement(_springUi.MenuItem, {
    disabled: true
  }, /*#__PURE__*/_react["default"].createElement(_springUi.MenuItemText, {
    className: "typography-descriptor text-neutral-b2 text-center mb-2"
  }, t('noSearchResults'))) : filteredCallQueues.length > 0 && /*#__PURE__*/_react["default"].createElement(_springUi.MenuList
  // eslint-disable-next-line jsx-a11y/no-autofocus
  , {
    autoFocus: false,
    className: "max-h-[200px] overflow-y-auto"
  }, filteredCallQueues.map(function (queue) {
    var isSelected = tempSelectedCallQueues.includes(queue.id);
    var displayName = queue.site ? "".concat(queue.name, " | ").concat(queue.site.name) : queue.name;
    return /*#__PURE__*/_react["default"].createElement(_springUi.MenuItem, {
      key: queue.id
      // eslint-disable-next-line jsx-a11y/no-autofocus
      ,
      autoFocus: false,
      onClick: function onClick(e) {
        e.stopPropagation();
        var newSelected = isSelected ? tempSelectedCallQueues.filter(function (id) {
          return id !== queue.id;
        }) : [].concat(_toConsumableArray(tempSelectedCallQueues), [queue.id]);
        setTempSelectedCallQueues(newSelected);
      },
      autoClose: false,
      "data-sign": "sharedWithMeQueue-".concat(queue.id)
    }, /*#__PURE__*/_react["default"].createElement(_springUi.MenuItemText, {
      className: "flex-1"
    }, displayName), /*#__PURE__*/_react["default"].createElement(_springUi.Checkbox, {
      inputProps: {
        tabIndex: -1
      },
      checked: isSelected,
      onChange: function onChange(e) {
        e.stopPropagation();
        var newSelected = e.target.checked ? [].concat(_toConsumableArray(tempSelectedCallQueues), [queue.id]) : tempSelectedCallQueues.filter(function (id) {
          return id !== queue.id;
        });
        setTempSelectedCallQueues(newSelected);
      }
    }));
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: footerClassName
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
    variant: "text",
    size: "medium",
    fullWidth: true,
    onClick: function onClick(e) {
      e.stopPropagation();
      handleBackToMainFromShared();
    },
    "data-sign": "sharedWithMeMenuBackToMain"
  }, t('cancel')), /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
    variant: "contained",
    size: "medium",
    fullWidth: true,
    disabled: tempSelectedCallQueues.length === 0,
    onClick: function onClick(e) {
      e.stopPropagation();
      handleSharedWithMeDone();
    },
    "data-sign": "sharedWithMeMenuDone"
  }, t('done'))))));
};
//# sourceMappingURL=FilterPopper.js.map
