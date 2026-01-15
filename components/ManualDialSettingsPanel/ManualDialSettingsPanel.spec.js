"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
var _juno = require("@ringcentral/juno");
var _enzyme = require("enzyme");
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("../../modules/EvManualDialSettingsUI/i18n"));
var _ManualDialSettingsPanel = require("./ManualDialSettingsPanel");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
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
  return (0, _enzyme.mount)(/*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_ManualDialSettingsPanel.ManualDialSettingsPanel, {
    currentLocale: currentLocale,
    goBack: goBack,
    settingFields: settingFields,
    init: function init() {},
    save: function save() {}
  })));
}
afterEach(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
  return _regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        wrapper.unmount();
      case 1:
        return _context.a(2);
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
