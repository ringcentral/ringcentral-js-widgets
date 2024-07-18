"use strict";

require("core-js/modules/es.array.find");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("regenerator-runtime/runtime");
var _juno = require("@ringcentral/juno");
var _enzyme = require("enzyme");
var _react = _interopRequireDefault(require("react"));
var _BasicSessionPanel = require("./BasicSessionPanel");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
    _ref$autoAnswer = _ref.autoAnswer,
    autoAnswer = _ref$autoAnswer === void 0 ? true : _ref$autoAnswer,
    _ref$setAutoAnswer = _ref.setAutoAnswer,
    setAutoAnswer = _ref$setAutoAnswer === void 0 ? function () {} : _ref$setAutoAnswer,
    _ref$inboundQueuesFie = _ref.inboundQueuesFieldText,
    inboundQueuesFieldText = _ref$inboundQueuesFie === void 0 ? '' : _ref$inboundQueuesFie,
    _ref$isExtensionNumbe = _ref.isExtensionNumber,
    isExtensionNumber = _ref$isExtensionNumbe === void 0 ? false : _ref$isExtensionNumbe,
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
    showAutoAnswer = _ref$showAutoAnswer === void 0 ? true : _ref$showAutoAnswer;
  return (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_BasicSessionPanel.BasicSessionPanel, {
    currentLocale: currentLocale,
    selectedSkillProfileId: selectedSkillProfileId,
    skillProfileList: skillProfileList,
    setSkillProfileId: setSkillProfileId,
    loginTypeList: loginTypeList,
    loginType: loginType,
    setLoginType: setLoginType,
    extensionNumber: extensionNumber,
    setExtensionNumber: setExtensionNumber
    // takingCall={takingCall}
    // setTakingCall={setTakingCall}
    ,
    autoAnswer: autoAnswer,
    setAutoAnswer: setAutoAnswer,
    inboundQueuesFieldText: inboundQueuesFieldText,
    isExtensionNumber: isExtensionNumber,
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
describe('<BasicSessionPanel />', function () {
  // TODO

  // it("Page display user's selected Inbound queue, and navigate to InboundQueuesPage when click the field.", () => {
  //   const gotoInboundQueuesPage = jest.fn();
  //   const inboundQueuesFieldText = 'AmyTestQueue';
  //   wrapper = setup({
  //     inboundQueuesFieldText,
  //     gotoInboundQueuesPage,
  //   });
  //   const inboundQueuesField = wrapper
  //     .find('RcTextField[data-sign="inboundQueues"]')
  //     .at(0)
  //     .find('input')
  //     .at(0);

  //   expect(inboundQueuesField.prop('value')).toEqual(inboundQueuesFieldText);
  //   inboundQueuesField.simulate('click');
  //   expect(gotoInboundQueuesPage).toHaveBeenCalled();
  // });

  it('Can display extensionNumber correctly, and can be changed.', function () {
    var setExtensionNumber = jest.fn();
    var extensionNumber = '65787344333';
    wrapper = setup({
      setExtensionNumber: setExtensionNumber,
      extensionNumber: extensionNumber,
      isExtensionNumber: true
    });
    var extensionNumberFieldFn = function extensionNumberFieldFn() {
      return wrapper.find('input[data-sign="extensionNumber"]').at(0);
    };
    var extensionNumberField = extensionNumberFieldFn();
    expect(extensionNumberField.prop('value')).toEqual(extensionNumber);
    var newExtensionNumber = '65787344366';
    extensionNumberField.simulate('change', {
      target: {
        value: newExtensionNumber
      }
    });
    expect(setExtensionNumber).toHaveBeenCalledWith(newExtensionNumber);
    wrapper = setup({
      setExtensionNumber: setExtensionNumber,
      extensionNumber: extensionNumber,
      isExtensionNumber: false
    });
    var extensionNumberField2 = extensionNumberFieldFn();
    expect(extensionNumberField2).toHaveLength(0);
  });

  // [true, false].forEach((takingCall) => {
  //   it(`When click the takingCall, setTakingCall to be called. (with initial state: ${takingCall})`, () => {
  //     const setTakingCall = jest.fn();
  //     wrapper = setup({
  //       takingCall,
  //       setTakingCall,
  //     });
  //     const takingCallToggle = wrapper
  //       .find('ToggleButton[data-sign="takingCall"]')
  //       .at(0)
  //       .find('input[type="checkbox"]')
  //       .at(0);
  //     expect(takingCallToggle.prop('checked')).toEqual(takingCall);
  //     takingCallToggle.simulate('change', { target: { value: !takingCall } });
  //     expect(setTakingCall).toHaveBeenCalledWith(!takingCall);
  //   });
  // });

  // [true, false].forEach((autoAnswer) => {
  //   it(`When click the autoAnswer, setAutoAnswer to be called. (with initial state: ${autoAnswer})`, () => {
  //     const setAutoAnswer = jest.fn();
  //     wrapper = setup({
  //       autoAnswer,
  //       setAutoAnswer,
  //     });
  //     const autoAnswerToggle = wrapper
  //       .find('ToggleButton[data-sign="autoAnswer"]')
  //       .at(0)
  //       .find('input[type="checkbox"]')
  //       .at(0);
  //     expect(autoAnswerToggle.prop('checked')).toEqual(autoAnswer);
  //     autoAnswerToggle.simulate('change', { target: { value: !autoAnswer } });
  //     expect(setAutoAnswer).toHaveBeenCalledWith(!autoAnswer);
  //   });
  // });

  it('Can display skillProfile correctly, and can be changed.', function () {
    var setSkillProfileId = jest.fn();
    var selectedSkillProfileId = '1002';
    wrapper = setup({
      setSkillProfileId: setSkillProfileId,
      selectedSkillProfileId: selectedSkillProfileId
    });
    var skillProfilePickList = wrapper.find('PickList[data-sign="skillProfile"]');
    expect(skillProfilePickList.prop('value')).toBe(selectedSkillProfileId);
    expect(skillProfilePickList.find('RcSelect').find('[aria-haspopup="listbox"]').text()).toBe(defaultSkillProfileList.find(function (x) {
      return x.profileId === selectedSkillProfileId;
    }).profileName);
    expect(skillProfilePickList.prop('options')).toHaveLength(defaultSkillProfileList.length);
  });
  it.skip('Can display loginType correctly, and can be changed.', function () {
    var setLoginType = jest.fn();
    var loginType = '102';
    wrapper = setup({
      setLoginType: setLoginType,
      loginType: loginType
    });
    var loginTypePickList = wrapper.find('PickList[data-sign="loginType"]');
    expect(loginTypePickList.prop('value')).toBe(loginType);
    expect(loginTypePickList.find('[role="button"]').text()).toBe(defaultLoginTypeList.find(function (x) {
      return x.id === loginType;
    }).label);
    var changeLoginType = '101';
    loginTypePickList.find('[role="button"]').simulate('click');
    var menuItems = document.body.querySelectorAll('[role="presentation"] li[role="option"]');
    expect(menuItems).toHaveLength(defaultLoginTypeList.length);
    document.body.querySelector("li[data-value=\"".concat(changeLoginType, "\"]")).click();
    expect(setLoginType).toHaveBeenCalledWith(changeLoginType);
  });
});
//# sourceMappingURL=BasicSessionPanel.spec.js.map
