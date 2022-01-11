"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.find");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _ThemeProvider = require("@ringcentral/juno/es6/foundation/theme/ThemeProvider.js");

var _PickList = require("./PickList");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var wrapper;
var defaultOptions = [{
  id: '101',
  label: 'work',
  name: 'work name',
  wholeName: 'work name whole'
}, {
  id: '102',
  label: 'study',
  name: 'studyname',
  wholeName: 'studyname  whole'
}, {
  id: '103',
  label: 'have fun',
  name: 'funname',
  wholeName: 'funname name whole'
}];
var customOptions = defaultOptions.map(function (item) {
  return {
    key: item.id,
    name: item.name,
    wholeName: item.wholeName
  };
});

function setup(_ref) {
  var _ref$options = _ref.options,
      options = _ref$options === void 0 ? defaultOptions : _ref$options,
      _ref$optionValueKey = _ref.optionValueKey,
      optionValueKey = _ref$optionValueKey === void 0 ? 'id' : _ref$optionValueKey,
      _ref$optionLabelKey = _ref.optionLabelKey,
      optionLabelKey = _ref$optionLabelKey === void 0 ? 'label' : _ref$optionLabelKey,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? 'pickListTest' : _ref$label,
      value = _ref.value,
      _ref$required = _ref.required,
      required = _ref$required === void 0 ? false : _ref$required,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? function () {
    return null;
  } : _ref$onChange,
      _ref$dataSign = _ref.dataSign,
      dataSign = _ref$dataSign === void 0 ? 'pickList' : _ref$dataSign,
      renderItem = _ref.renderItem,
      renderValue = _ref.renderValue;
  return (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_ThemeProvider.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_PickList.PickList, {
    options: options,
    optionValueKey: optionValueKey,
    optionLabelKey: optionLabelKey,
    label: label,
    value: value,
    required: required,
    onChange: onChange,
    dataSign: dataSign,
    renderItem: renderItem,
    renderValue: renderValue
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
describe('<PickList />', function () {
  it('PickList can render correctly with selection, and can be selected to change', function () {
    var onChange = jest.fn();
    var label = 'pickListTest2';
    var value = '102';
    wrapper = setup({
      label: label,
      value: value,
      onChange: onChange
    });
    expect(wrapper.find('label').text()).toBe(label);
    expect(wrapper.find('label').text()).not.toContain('*');
    expect(wrapper.find('label').hasClass('Mui-required')).toBe(false);
    expect(wrapper.find('input').prop('value')).toBe(value);
    var baseButton = wrapper.find('[role="button"]');
    expect(baseButton.text()).toBe(defaultOptions.find(function (option) {
      return option.id === value;
    }).label); // baseButton.simulate('click');
    // const menuItems = document.body.querySelectorAll<HTMLInputElement>(
    //   '[role="presentation"] li[role="option"]',
    // );
    // expect(menuItems).toHaveLength(defaultOptions.length);
    // menuItems.forEach((el, index) => {
    //   expect(el.textContent).toBe(defaultOptions[index].label);
    //   expect(el.dataset.value).toBe(defaultOptions[index].id);
    // });
    // const selectIndex = 2;
    // menuItems[selectIndex].click();
    // expect(onChange).toBeCalledWith(defaultOptions[selectIndex].id);
  });
  it('PickList can render correctly without selection, and can be selected to change.', function () {
    var onChange = jest.fn();
    var label = 'pickListTest2';
    wrapper = setup({
      label: label,
      onChange: onChange,
      required: true
    });
    expect(wrapper.find('label').text()).toContain(label);
    expect(wrapper.find('label').text()).toContain('*');
    expect(wrapper.find('label').hasClass('Mui-required')).toBe(true);
    expect(wrapper.find('input').prop('value')).toBe('');
    var baseButton = wrapper.find('[role="button"]');
    expect(baseButton.text()).toBe('​'); // baseButton.simulate('click');
    // const menuItems = document.body.querySelectorAll<HTMLInputElement>(
    //   '[role="presentation"] li[role="option"]',
    // );
    // expect(menuItems).toHaveLength(defaultOptions.length);
    // const selectIndex = 2;
    // menuItems[selectIndex].click();
    // expect(onChange).toBeCalledWith(defaultOptions[selectIndex].id);
  });
  it('PickList can display by using renderValue', function () {
    var onChange = jest.fn();
    var renderValue = jest.fn(function (key) {
      return defaultOptions.find(function (item) {
        return item.id === key;
      }).name;
    });
    var value = '102';
    wrapper = setup({
      onChange: onChange,
      renderValue: renderValue,
      value: value
    });
    expect(wrapper.find('input').prop('value')).toBe(value);
    expect(renderValue).toBeCalledWith(value);
    var baseButton = wrapper.find('[role="button"]');
    expect(baseButton.text()).toBe(renderValue(value)); // baseButton.simulate('click');
    // const menuItems = document.body.querySelectorAll<HTMLInputElement>(
    //   '[role="presentation"] li[role="option"]',
    // );
    // expect(menuItems).toHaveLength(defaultOptions.length);
    // menuItems.forEach((el, index) => {
    //   expect(el.textContent).toBe(defaultOptions[index].label);
    //   expect(el.dataset.value).toBe(defaultOptions[index].id);
    // });
  });
  it('PickList can display by using renderItem', function () {
    var onChange = jest.fn();
    var renderItem = jest.fn(function (item) {
      return item.wholeName;
    });
    var value = '102';
    wrapper = setup({
      onChange: onChange,
      renderItem: renderItem,
      value: value
    });
    expect(wrapper.find('input').prop('value')).toBe(value);
    var baseButton = wrapper.find('[role="button"]');
    expect(baseButton.text()).toBe(defaultOptions.find(function (option) {
      return option.id === value;
    }).wholeName); // baseButton.simulate('click');
    // const menuItems = document.body.querySelectorAll<HTMLInputElement>(
    //   '[role="presentation"] li[role="option"]',
    // );
    // expect(renderItem).toBeCalledTimes(defaultOptions.length);
    // expect(menuItems).toHaveLength(defaultOptions.length);
    // menuItems.forEach((el, index) => {
    //   expect(el.textContent).toBe(defaultOptions[index].wholeName);
    //   expect(el.dataset.value).toBe(defaultOptions[index].id);
    // });
  });
  it('PickList can using custom value, label to render.', function () {
    var onChange = jest.fn();
    var value = '102';
    var optionValueKey = 'key';
    var optionLabelKey = 'name';
    wrapper = setup({
      options: customOptions,
      optionValueKey: optionValueKey,
      optionLabelKey: optionLabelKey,
      onChange: onChange,
      value: value
    });
    expect(wrapper.find('input').prop('value')).toBe(value);
    var baseButton = wrapper.find('[role="button"]');
    expect(baseButton.text()).toBe(customOptions.find(function (option) {
      return option[optionValueKey] === value;
    })[optionLabelKey]); // baseButton.simulate('click');
    // const menuItems = document.body.querySelectorAll<HTMLInputElement>(
    //   '[role="presentation"] li[role="option"]',
    // );
    // expect(menuItems).toHaveLength(customOptions.length);
    // menuItems.forEach((el, index) => {
    //   expect(el.textContent).toBe(customOptions[index][optionLabelKey]);
    //   expect(el.dataset.value).toBe(customOptions[index][optionValueKey]);
    // });
  });
  it('When PickList use custom value, label, can also use renderValue, renderItem to render correctly', function () {
    var onChange = jest.fn();
    var renderValue = jest.fn(function (n) {
      return customOptions.find(function (item) {
        return item.key === n;
      }).name;
    });
    var renderItem = jest.fn(function (item) {
      return item.wholeName;
    });
    var value = '102';
    var optionValueKey = 'key';
    var optionLabelKey = 'name';
    wrapper = setup({
      options: customOptions,
      optionValueKey: optionValueKey,
      optionLabelKey: optionLabelKey,
      onChange: onChange,
      renderValue: renderValue,
      renderItem: renderItem,
      value: value
    });
    expect(wrapper.find('input').prop('value')).toBe(value);
    var baseButton = wrapper.find('[role="button"]');
    expect(baseButton.text()).toBe(renderValue(value)); // baseButton.simulate('click');
    // const menuItems = document.body.querySelectorAll<HTMLInputElement>(
    //   '[role="presentation"] li[role="option"]',
    // );
    // expect(renderItem).toBeCalledTimes(customOptions.length);
    // expect(menuItems).toHaveLength(customOptions.length);
    // menuItems.forEach((el, index) => {
    //   expect(el.textContent).toBe(customOptions[index].wholeName);
    //   expect(el.dataset.value).toBe(customOptions[index][optionValueKey]);
    // });
  });
});
//# sourceMappingURL=PickList.spec.js.map
