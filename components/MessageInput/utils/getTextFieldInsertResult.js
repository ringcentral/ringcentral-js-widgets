"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTextFieldInsertResult = void 0;
require("core-js/modules/es.array.flat.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.unscopables.flat.js");
var _selectionHandler = require("@ringcentral/juno/es6/foundation/utils/selectionHandler.js");
var _runes = _interopRequireDefault(require("runes"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// @ts-ignore

/**
 * handle emoji with textfield selection insert logic
 */
var getTextFieldInsertResult = exports.getTextFieldInsertResult = function getTextFieldInsertResult(_ref) {
  var input = _ref.input,
    insertValue = _ref.insertValue,
    sourcePosition = _ref.sourcePosition;
  var currentText = input.value;
  // when not have source position and is not activeElement
  // insert at end of current text
  if (!sourcePosition && input !== document.activeElement) {
    return {
      value: currentText + insertValue
    };
  }
  var currentPositionInfo = sourcePosition || (0, _selectionHandler.getSelectionPosition)(input);
  var position = currentPositionInfo.position;
  // https://www.npmjs.com/package/runes
  // light separate string with emojis
  // runes('Emoji 🤖') => ['E', 'm', 'o', 'j', 'i', ' ', '🤖']
  var emojiAsOneCharArr = (0, _runes["default"])(currentText);
  var count = 0;
  var start = 0;
  var end = 0;
  if (position.start !== 0 || position.end !== 0) {
    for (var i = 0; i < emojiAsOneCharArr.length; i++) {
      count += emojiAsOneCharArr[i].length;
      if (start === 0 && position.start !== 0 && count >= position.start) {
        start = i + 1;
      }
      if (position.end !== 0 && count >= position.end) {
        end = i + 1;
        break;
      }
    }
  }
  return {
    start: position.start + insertValue.length,
    value: [emojiAsOneCharArr.slice(0, start), insertValue, emojiAsOneCharArr.slice(end)].flat().join('')
  };
};
//# sourceMappingURL=getTextFieldInsertResult.js.map
