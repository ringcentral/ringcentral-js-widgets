"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
var _juno = require("@ringcentral/juno");
var _enzyme = require("enzyme");
var _react = _interopRequireDefault(require("react"));
var _PickList = require("./PickList");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
  return (0, _enzyme.mount)(/*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_PickList.PickList, {
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
    }).label);
    // baseButton.simulate('click');
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
    // expect(onChange).toHaveBeenCalledWith(defaultOptions[selectIndex].id);
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
    expect(baseButton.text()).toBe('​');
    // baseButton.simulate('click');
    // const menuItems = document.body.querySelectorAll<HTMLInputElement>(
    //   '[role="presentation"] li[role="option"]',
    // );
    // expect(menuItems).toHaveLength(defaultOptions.length);
    // const selectIndex = 2;
    // menuItems[selectIndex].click();
    // expect(onChange).toHaveBeenCalledWith(defaultOptions[selectIndex].id);
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
    expect(renderValue).toHaveBeenCalledWith(value);
    var baseButton = wrapper.find('[role="button"]');
    expect(baseButton.text()).toBe(renderValue(value));
    // baseButton.simulate('click');
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
    }).wholeName);
    // baseButton.simulate('click');
    // const menuItems = document.body.querySelectorAll<HTMLInputElement>(
    //   '[role="presentation"] li[role="option"]',
    // );
    // expect(renderItem).toHaveBeenCalledTimes(defaultOptions.length);
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
    })[optionLabelKey]);
    // baseButton.simulate('click');
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
    expect(baseButton.text()).toBe(renderValue(value));
    // baseButton.simulate('click');
    // const menuItems = document.body.querySelectorAll<HTMLInputElement>(
    //   '[role="presentation"] li[role="option"]',
    // );
    // expect(renderItem).toHaveBeenCalledTimes(customOptions.length);
    // expect(menuItems).toHaveLength(customOptions.length);
    // menuItems.forEach((el, index) => {
    //   expect(el.textContent).toBe(customOptions[index].wholeName);
    //   expect(el.dataset.value).toBe(customOptions[index][optionValueKey]);
    // });
  });
});
//# sourceMappingURL=PickList.spec.js.map
