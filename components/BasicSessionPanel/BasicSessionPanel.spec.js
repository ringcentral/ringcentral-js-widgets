"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.find");

require("regenerator-runtime/runtime");

var _juno = require("@ringcentral/juno");

var _enzyme = require("enzyme");

var _react = _interopRequireDefault(require("react"));

var _BasicSessionPanel = require("./BasicSessionPanel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
    setExtensionNumber: setExtensionNumber // takingCall={takingCall}
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
describe('<BasicSessionPanel />', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
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
          //   expect(gotoInboundQueuesPage).toBeCalled();
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
            expect(setExtensionNumber).toBeCalledWith(newExtensionNumber);
            wrapper = setup({
              setExtensionNumber: setExtensionNumber,
              extensionNumber: extensionNumber,
              isExtensionNumber: false
            });
            var extensionNumberField2 = extensionNumberFieldFn();
            expect(extensionNumberField2).toHaveLength(0);
          }); // [true, false].forEach((takingCall) => {
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
          //     expect(setTakingCall).toBeCalledWith(!takingCall);
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
          //     expect(setAutoAnswer).toBeCalledWith(!autoAnswer);
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
            expect(skillProfilePickList.find('.RcLineSelect-select').text()).toBe(defaultSkillProfileList.find(function (x) {
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
            expect(setLoginType).toBeCalledWith(changeLoginType);
          });

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
//# sourceMappingURL=BasicSessionPanel.spec.js.map
