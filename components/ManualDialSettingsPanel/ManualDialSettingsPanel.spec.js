"use strict";

require("core-js/modules/es.array.find");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("regenerator-runtime/runtime");
var _juno = require("@ringcentral/juno");
var _enzyme = require("enzyme");
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("../../modules/EvManualDialSettingsUI/i18n"));
var _ManualDialSettingsPanel = require("./ManualDialSettingsPanel");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var wrapper;
var currentLocale = 'en-US';
var pickListItems = [{
  key: '101',
  label: 'work',
  name: 'work name',
  wholeName: 'work name whole'
}, {
  key: '102',
  label: 'study',
  name: 'studyname',
  wholeName: 'studyname  whole'
}];
var defaultSettingFields = [{
  dataSign: 'callerId',
  onChange: function onChange() {
    return null;
  },
  value: undefined,
  select: {
    label: 'Call ID',
    required: true,
    options: pickListItems
  }
}, {
  dataSign: 'ringTime',
  onChange: function onChange() {
    return null;
  },
  value: undefined,
  input: {
    required: true,
    label: 'Ring time (seconds)',
    type: 'text',
    placeholder: 'input holder'
  }
}];
function setup(_ref) {
  var _ref$goBack = _ref.goBack,
    goBack = _ref$goBack === void 0 ? function () {} : _ref$goBack,
    _ref$settingFields = _ref.settingFields,
    settingFields = _ref$settingFields === void 0 ? defaultSettingFields : _ref$settingFields;
  return (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_ManualDialSettingsPanel.ManualDialSettingsPanel, {
    currentLocale: currentLocale,
    goBack: goBack,
    settingFields: settingFields,
    init: function init() {},
    save: function save() {}
  })));
}
afterEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          wrapper.unmount();
        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
describe('<ManualDialSettingsPanel />', function () {
  it('Display Back Button and when user click it, function goBack will be called', function () {
    var goBack = jest.fn();
    wrapper = setup({
      goBack: goBack
    });
    expect(wrapper.find('.title').text()).toBe(_i18n["default"].getString('manualDialSettings', currentLocale));
    wrapper.find('[data-sign="backButton"]').at(0).find('button').simulate('click');
    expect(goBack).toHaveBeenCalled();
  });

  // Declan: I thinks that is not need, that is too detail about render, just using snapshot is ok

  // it('Can render select, input list respectively', () => {
  //   wrapper = setup({});
  //   defaultSettingFields.forEach((field) => {
  //     if (field.select) {
  //       const pickList = wrapper.find(
  //         `PickList[data-sign="${field.dataSign}"]`,
  //       );
  //       expect(pickList).toHaveLength(1);
  //       expect(pickList.find('label').text()).toContain(field.select.label);
  //       expect(pickList.find('label').text()).toContain('*');
  //       expect(pickList.find('input').prop('value')).toBe('');
  //     }
  //     if (field.input) {
  //       const rcTextField = wrapper.find(
  //         `RcTextField[data-sign="${field.dataSign}"]`,
  //       );
  //       expect(rcTextField).toHaveLength(1);
  //       expect(rcTextField.find('label').text()).toContain(field.input.label);
  //       expect(rcTextField.find('label').text()).toContain('*');
  //       expect(rcTextField.find('input').prop('value')).toBe('');
  //     }
  //   });
  // });

  // it('Check PickList from settingFields can render correctly', () => {
  //   const customSelect = {
  //     dataSign: 'callerId',
  //     value: '101',
  //     onChange: jest.fn(),
  //     select: {
  //       options: pickListItems,
  //       label: 'Color Dropdown',
  //       required: false,
  //       optionValueKey: 'key',
  //       optionKey: 'name',
  //       renderValue: jest.fn(
  //         (n) => pickListItems.find((item) => item.key === n).name,
  //       ),
  //       renderItem: jest.fn((item) => item.wholeName),
  //     },
  //   };

  //   wrapper = setup({
  //     settingFields: [customSelect],
  //   });
  //   const pickList = wrapper.find(
  //     `PickList[data-sign="${customSelect.dataSign}"]`,
  //   );
  //   expect(pickList.find('label').text()).toContain(customSelect.select.label);
  //   expect(pickList.find('label').text()).not.toContain('*');
  //   expect(pickList.find('input').prop('value')).toBe(customSelect.value);
  //   const baseButton = wrapper.find('[role="button"]');
  //   expect(baseButton.text()).toBe(
  //     customSelect.select.renderValue(customSelect.value),
  //   );
  //   baseButton.simulate('click');
  //   const menuItems = document.body.querySelectorAll<HTMLInputElement>(
  //     '[role="presentation"] li[role="option"]',
  //   );
  //   expect(customSelect.select.renderItem).toHaveBeenCalledTimes(
  //     pickListItems.length,
  //   );
  //   expect(menuItems).toHaveLength(pickListItems.length);
  //   menuItems.forEach((el, index) => {
  //     expect(el.textContent).toBe(
  //       customSelect.select.renderItem(pickListItems[index]),
  //     );
  //     expect(el.dataset.value).toBe(
  //       pickListItems[index][customSelect.select.optionValueKey],
  //     );
  //   });
  //   const selectIndex = 1;
  //   menuItems[selectIndex].click();
  //   expect(customSelect.onChange).toHaveBeenCalledWith(
  //     pickListItems[selectIndex][customSelect.select.optionValueKey],
  //   );
  // });

  it('Check input can render correctly', function () {
    var customInput = {
      dataSign: 'ringTime',
      value: '30',
      onChange: jest.fn(),
      onBlur: jest.fn(),
      input: {
        type: 'number',
        label: 'Ring time (seconds)',
        required: false,
        placeholder: 'Ring time (seconds)',
        min: 20,
        max: 120
      }
    };
    wrapper = setup({
      settingFields: [customInput]
    });
    var rcTextField = wrapper.find("RcTextField[data-sign=\"".concat(customInput.dataSign, "\"]"));
    var input = rcTextField.find('input');
    expect(rcTextField.find('label').text()).toContain(customInput.input.label);
    expect(rcTextField.find('label').text()).not.toContain('*');
    expect(input.prop('required')).toBe(customInput.input.required);
    expect(input.prop('value')).toBe(customInput.value);
    expect(input.prop('placeholder')).toBe(customInput.input.placeholder);
    expect(input.prop('type')).toBe(customInput.input.type);
    expect(input.prop('min')).toBe(customInput.input.min);
    expect(input.prop('max')).toBe(customInput.input.max);
    input.simulate('blur');
    expect(customInput.onBlur).toHaveBeenCalled();
    var changeValue = 35;
    input.simulate('change', {
      target: {
        value: changeValue
      }
    });
    expect(customInput.onChange).toHaveBeenCalledWith(changeValue);
  });
});
//# sourceMappingURL=ManualDialSettingsPanel.spec.js.map
