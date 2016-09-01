'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = undefined;
exports.switchLanguage = switchLanguage;
exports.getString = getString;

var _actions = require('./actions');

var _data = require('./data');

var _data2 = _interopRequireDefault(_data);

var _reducer2 = require('./reducer');

var _reducer3 = _interopRequireDefault(_reducer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.reducer = _reducer3.default;
function switchLanguage(lang) {
  return {
    type: _actions.SWITCH_LANGUAGE,
    lang: lang
  };
}
function getString(lang, key) {
  return _data2.default[lang][key];
}