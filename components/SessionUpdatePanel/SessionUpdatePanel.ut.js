"use strict";

require("core-js/modules/es.array.find");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UTRenderUpdateSessionBtns = void 0;
var _juno = require("@ringcentral/juno");
var _enzyme = require("enzyme");
var _react = _interopRequireDefault(require("react"));
var _SessionUpdatePanel = require("./SessionUpdatePanel");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var wrapper;
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
  var _ref$currentLocale = _ref.currentLocale,
    currentLocale = _ref$currentLocale === void 0 ? 'en-US' : _ref$currentLocale,
    _ref$goToSettingsPage = _ref.goToSettingsPageWhetherSessionChanged,
    goToSettingsPageWhetherSessionChanged = _ref$goToSettingsPage === void 0 ? function () {} : _ref$goToSettingsPage,
    _ref$onSaveUpdate = _ref.onSaveUpdate,
    onSaveUpdate = _ref$onSaveUpdate === void 0 ? function () {} : _ref$onSaveUpdate,
    _ref$selectedSkillPro = _ref.selectedSkillProfileId,
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
    _ref$autoAnswer = _ref.autoAnswer,
    autoAnswer = _ref$autoAnswer === void 0 ? true : _ref$autoAnswer,
    _ref$setAutoAnswer = _ref.setAutoAnswer,
    setAutoAnswer = _ref$setAutoAnswer === void 0 ? function () {} : _ref$setAutoAnswer,
    _ref$extensionNumber = _ref.extensionNumber,
    extensionNumber = _ref$extensionNumber === void 0 ? '' : _ref$extensionNumber,
    _ref$setExtensionNumb = _ref.setExtensionNumber,
    setExtensionNumber = _ref$setExtensionNumb === void 0 ? function () {} : _ref$setExtensionNumb,
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
  return (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_SessionUpdatePanel.SessionUpdatePanel, {
    currentLocale: currentLocale,
    goToSettingsPageWhetherSessionChanged: goToSettingsPageWhetherSessionChanged,
    onSaveUpdate: onSaveUpdate,
    selectedSkillProfileId: selectedSkillProfileId,
    skillProfileList: skillProfileList,
    setSkillProfileId: setSkillProfileId,
    loginTypeList: loginTypeList,
    loginType: loginType,
    setLoginType: setLoginType,
    autoAnswer: autoAnswer,
    setAutoAnswer: setAutoAnswer,
    extensionNumber: extensionNumber,
    setExtensionNumber: setExtensionNumber,
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
var UTRenderUpdateSessionBtns = function UTRenderUpdateSessionBtns() {
  wrapper = setup({});
  expect(wrapper.find('[data-sign="saveUpdate"]').exists()).toBeTruthy();
  expect(wrapper.find('[data-sign="cancel"]').exists()).toBeTruthy();
};
exports.UTRenderUpdateSessionBtns = UTRenderUpdateSessionBtns;
//# sourceMappingURL=SessionUpdatePanel.ut.js.map
