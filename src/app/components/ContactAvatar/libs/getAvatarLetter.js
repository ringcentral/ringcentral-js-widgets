"use strict";

require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.string.trim.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAvatarLetter = void 0;
require("core-js/modules/es.array.join.js");
var _ramda = require("ramda");
var _runes = _interopRequireDefault(require("runes"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// @ts-ignore

function beSplitChar(_char) {
  return _char !== ' ' && _char !== '.' && _char !== '-' && _char !== '_';
}
function addChar(_char2, finalTwoChars) {
  if (beSplitChar(_char2)) {
    finalTwoChars.push(_char2.toUpperCase());
  }
}
/**
 * Extracts the initial letters from a given name to be used as an avatar letter.
 *
 * @param name - The name from which to extract the initial letters. If the name is not provided or is empty, an empty string is returned.
 * @returns The initial letters of the name in uppercase. If the name has only two characters, those characters are used directly. If the name is longer, it is split by spaces or dots into at most two parts, and the initial letters of these parts are returned.
 *
 * @example
 * ```typescript
 * getAvatarLetter("John Doe"); // Returns "JD"
 * getAvatarLetter("Jane"); // Returns "J"
 * getAvatarLetter("A.B."); // Returns "AB"
 * getAvatarLetter(""); // Returns ""
 * ```
 */
var getAvatarLetter = exports.getAvatarLetter = function getAvatarLetter(name) {
  try {
    var pureName = name && (0, _ramda.trim)(name);
    if (!pureName || !pureName.length) {
      return '';
    }

    // runes('Emoji 🤖') => ['E', 'm', 'o', 'j', 'i', ' ', '🤖']
    var emojiAsOneCharArr = (0, _runes["default"])(name);
    var finalTwoChars = [];
    for (var i = 0; i < emojiAsOneCharArr.length; i++) {
      var _char3 = emojiAsOneCharArr[i];
      if (finalTwoChars.length === 0) {
        addChar(_char3, finalTwoChars);
      }
      // if we got the first char already, find the second char which is not a space or a dot then add the next char as the second char
      else if (finalTwoChars.length === 1 && !beSplitChar(_char3) && i + 1 < emojiAsOneCharArr.length) {
        var nextChar = emojiAsOneCharArr[i + 1];
        addChar(nextChar, finalTwoChars);
      }
      if (finalTwoChars.length === 2) {
        break;
      }
    }
    return finalTwoChars.join('');
  } catch (e) {
    console.error('getAvatarLetter|error', e);
    return '';
  }
};
//# sourceMappingURL=getAvatarLetter.js.map
