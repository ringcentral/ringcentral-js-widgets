import { trim } from 'ramda';
// @ts-ignore
import runes from 'runes';

function beSplitChar(char: string) {
  return char !== ' ' && char !== '.' && char !== '-' && char !== '_';
}

function addChar(char: string, finalTwoChars: string[]) {
  if (beSplitChar(char)) {
    finalTwoChars.push(char.toUpperCase());
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
export const getAvatarLetter = (name?: string) => {
  try {
    const pureName = name && trim(name);
    if (!pureName || !pureName.length) {
      return '';
    }

    // runes('Emoji 🤖') => ['E', 'm', 'o', 'j', 'i', ' ', '🤖']
    const emojiAsOneCharArr: string[] = runes(name);

    const finalTwoChars: string[] = [];

    for (let i = 0; i < emojiAsOneCharArr.length; i++) {
      const char = emojiAsOneCharArr[i];

      if (finalTwoChars.length === 0) {
        addChar(char, finalTwoChars);
      }
      // if we got the first char already, find the second char which is not a space or a dot then add the next char as the second char
      else if (
        finalTwoChars.length === 1 &&
        !beSplitChar(char) &&
        i + 1 < emojiAsOneCharArr.length
      ) {
        const nextChar = emojiAsOneCharArr[i + 1];
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
