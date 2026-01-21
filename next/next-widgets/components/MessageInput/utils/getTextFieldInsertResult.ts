import { getSelectionPosition } from '@ringcentral/juno';
// @ts-ignore
import runes from 'runes';

type GetTextFieldInsertResultOptions = {
  input: HTMLInputElement | HTMLTextAreaElement;
  insertValue: string;
  sourcePosition: ReturnType<typeof getSelectionPosition> | null;
};

/**
 * handle emoji with textfield selection insert logic
 */
export const getTextFieldInsertResult = ({
  input,
  insertValue,
  sourcePosition,
}: GetTextFieldInsertResultOptions) => {
  const currentText = input.value;
  // when not have source position and is not activeElement
  // insert at end of current text
  if (!sourcePosition && input !== document.activeElement) {
    return {
      value: currentText + insertValue,
    };
  }

  const currentPositionInfo = sourcePosition || getSelectionPosition(input);
  const position = currentPositionInfo.position;
  // https://www.npmjs.com/package/runes
  // light separate string with emojis
  // runes('Emoji 🤖') => ['E', 'm', 'o', 'j', 'i', ' ', '🤖']
  const emojiAsOneCharArr: string[] = runes(currentText);

  let count = 0;
  let start = 0;
  let end = 0;

  if (position.start !== 0 || position.end !== 0) {
    for (let i = 0; i < emojiAsOneCharArr.length; i++) {
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
    value: [
      emojiAsOneCharArr.slice(0, start),
      insertValue,
      emojiAsOneCharArr.slice(end),
    ]
      .flat()
      .join(''),
  };
};
