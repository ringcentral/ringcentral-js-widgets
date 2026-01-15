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
require("core-js/modules/es.object.to-string.js");
var _juno = require("@ringcentral/juno");
var _enzyme = require("enzyme");
var _react = _interopRequireDefault(require("react"));
var _SessionConfigPanel = require("./SessionConfigPanel");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var wrapper;
var currentLocale = 'en-US';
var defaultSkillProfileList = [{
  profileId: '1001',
  profileName: 'Work',
  isDefault: '1',
  profileDesc: 'like to work'
}, {
  profileId: '1002',
  profileName: 'eat',
  isDefault: '1',
  profileDesc: 'fat man'
}, {
  profileId: '1003',
  profileName: 'play',
  isDefault: '1',
  profileDesc: 'like to work'
}];
var defaultLoginTypeList = [{
  label: 'externalPhone',
  id: '101'
}, {
  label: 'externalPhone2',
  id: '102'
}];
var defaultSelectedAgent = {
  accountId: '15240001',
  accountName: 'RC Internal QA C02',
  agentGroupId: null,
  agentId: '1364338',
  agentRank: null,
  agentType: 'AGENT',
  allowLoginControl: true,
  allowLoginUpdates: true,
  altDefaultLoginDest: null,
  directAgentExtension: null,
  email: 'kiwi.lin+11564@ringcentral.onmicrosoft.com',
  enableSoftphone: null,
  externalAgentId: null,
  firstName: 'Kiwi',
  ghostRnaAction: null,
  initLoginBaseState: null,
  lastName: 'Lin',
  location: null,
  manualOutboundDefaultCallerId: null,
  maxChats: null,
  password: null,
  phoneLoginPin: null,
  rcUserId: 62710741028,
  team: null,
  username: 'kiwi.lin+11564+15240001_1364338@ringcentral.com'
};
function setup(_ref) {
  var _ref$selectedSkillPro = _ref.selectedSkillProfileId,
    selectedSkillProfileId = _ref$selectedSkillPro === void 0 ? '1002' : _ref$selectedSkillPro,
    _ref$skillProfileList = _ref.skillProfileList,
    skillProfileList = _ref$skillProfileList === void 0 ? defaultSkillProfileList : _ref$skillProfileList,
    _ref$setSkillProfileI = _ref.setSkillProfileId,
    setSkillProfileId = _ref$setSkillProfileI === void 0 ? function () {} : _ref$setSkillProfileI,
    _ref$loginTypeList = _ref.loginTypeList,
    loginTypeList = _ref$loginTypeList === void 0 ? defaultLoginTypeList : _ref$loginTypeList,
    _ref$loginType = _ref.loginType,
    loginType = _ref$loginType === void 0 ? '102' : _ref$loginType,
    _ref$setLoginType = _ref.setLoginType,
    setLoginType = _ref$setLoginType === void 0 ? function () {} : _ref$setLoginType,
    _ref$extensionNumber = _ref.extensionNumber,
    extensionNumber = _ref$extensionNumber === void 0 ? '' : _ref$extensionNumber,
    _ref$setExtensionNumb = _ref.setExtensionNumber,
    setExtensionNumber = _ref$setExtensionNumb === void 0 ? function () {} : _ref$setExtensionNumb,
    _ref$setConfigure = _ref.setConfigure,
    setConfigure = _ref$setConfigure === void 0 ? function () {
      return null;
    } : _ref$setConfigure,
    _ref$inboundQueuesFie = _ref.inboundQueuesFieldText,
    inboundQueuesFieldText = _ref$inboundQueuesFie === void 0 ? '' : _ref$inboundQueuesFie,
    _ref$isLoading = _ref.isLoading,
    isLoading = _ref$isLoading === void 0 ? false : _ref$isLoading,
    _ref$isExtensionNumbe = _ref.isExtensionNumber,
    isExtensionNumber = _ref$isExtensionNumbe === void 0 ? false : _ref$isExtensionNumbe,
    _ref$autoAnswer = _ref.autoAnswer,
    autoAnswer = _ref$autoAnswer === void 0 ? true : _ref$autoAnswer,
    _ref$setAutoAnswer = _ref.setAutoAnswer,
    setAutoAnswer = _ref$setAutoAnswer === void 0 ? function () {} : _ref$setAutoAnswer,
    searchOption = _ref.searchOption,
    _ref$inboundQueues = _ref.inboundQueues,
    inboundQueues = _ref$inboundQueues === void 0 ? [] : _ref$inboundQueues,
    submitInboundQueues = _ref.submitInboundQueues,
    _ref$getAssignedInbou = _ref.getAssignedInboundQueues,
    getAssignedInboundQueues = _ref$getAssignedInbou === void 0 ? function () {
      return [];
    } : _ref$getAssignedInbou,
    _ref$isAllAssign = _ref.isAllAssign,
    isAllAssign = _ref$isAllAssign === void 0 ? function () {
      return true;
    } : _ref$isAllAssign,
    _ref$isSeveralAssign = _ref.isSeveralAssign,
    isSeveralAssign = _ref$isSeveralAssign === void 0 ? function () {
      return false;
    } : _ref$isSeveralAssign,
    checkBoxOnChange = _ref.checkBoxOnChange,
    allCheckBoxOnChange = _ref.allCheckBoxOnChange,
    _ref$showInboundQueue = _ref.showInboundQueues,
    showInboundQueues = _ref$showInboundQueue === void 0 ? true : _ref$showInboundQueue,
    _ref$showSkillProfile = _ref.showSkillProfile,
    showSkillProfile = _ref$showSkillProfile === void 0 ? true : _ref$showSkillProfile,
    _ref$showAutoAnswer = _ref.showAutoAnswer,
    showAutoAnswer = _ref$showAutoAnswer === void 0 ? true : _ref$showAutoAnswer,
    _ref$onAccountReChoos = _ref.onAccountReChoose,
    onAccountReChoose = _ref$onAccountReChoos === void 0 ? function () {} : _ref$onAccountReChoos,
    _ref$selectedAgent = _ref.selectedAgent,
    selectedAgent = _ref$selectedAgent === void 0 ? defaultSelectedAgent : _ref$selectedAgent,
    _ref$showReChooseAcco = _ref.showReChooseAccount,
    showReChooseAccount = _ref$showReChooseAcco === void 0 ? true : _ref$showReChooseAcco;
  return (0, _enzyme.mount)(/*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_SessionConfigPanel.SessionConfigPanel, {
    onAccountReChoose: onAccountReChoose,
    selectedAgent: selectedAgent,
    currentLocale: currentLocale,
    selectedSkillProfileId: selectedSkillProfileId,
    skillProfileList: skillProfileList,
    setSkillProfileId: setSkillProfileId,
    loginTypeList: loginTypeList,
    loginType: loginType,
    setLoginType: setLoginType,
    extensionNumber: extensionNumber,
    setExtensionNumber: setExtensionNumber,
    setConfigure: setConfigure,
    inboundQueuesFieldText: inboundQueuesFieldText,
    isExtensionNumber: isExtensionNumber,
    isLoading: isLoading,
    showReChooseAccount: showReChooseAccount
    // takingCall={takingCall}
    // setTakingCall={setTakingCall}
    ,
    autoAnswer: autoAnswer,
    setAutoAnswer: setAutoAnswer,
    searchOption: searchOption,
    inboundQueues: inboundQueues,
    submitInboundQueues: submitInboundQueues,
    getAssignedInboundQueues: getAssignedInboundQueues,
    isAllAssign: isAllAssign,
    isSeveralAssign: isSeveralAssign,
    checkBoxOnChange: checkBoxOnChange,
    allCheckBoxOnChange: allCheckBoxOnChange,
    showInboundQueues: showInboundQueues,
    showSkillProfile: showSkillProfile,
    showAutoAnswer: showAutoAnswer
  })));
}
var getConfigureButton = function getConfigureButton() {
  return wrapper.find('RcButton[data-sign="setConfigure"]').at(0).find('button');
};
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
describe('<SessionConfigPanel />', function () {
  it('When user click setConfigure Button, setConfigure is to be called', function () {
    var setConfigure = jest.fn();
    wrapper = setup({
      setConfigure: setConfigure
    });
    var configureButton = getConfigureButton();
    configureButton.simulate('click');
    expect(setConfigure).toHaveBeenCalled();
  });
  it('When loading, setConfigure Button is in loading state, and setConfigure cannot be fired', function () {
    var setConfigure = jest.fn();
    var isLoading = true;
    wrapper = setup({
      setConfigure: setConfigure,
      isLoading: isLoading
    });
    var configureButton = getConfigureButton();
    expect(configureButton.find('RcCircularProgress')).toHaveLength(1);
    expect(configureButton.prop('disabled')).toBe(isLoading);
    configureButton.simulate('click');
    expect(setConfigure).not.toHaveBeenCalled();
  });
});
//# sourceMappingURL=SessionConfigPanel.spec.js.map
