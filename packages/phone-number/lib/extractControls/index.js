import { reduce } from 'ramda';

const pauseRegex = /,/g;
const controlRegex = /[^0-9*#]/g;

export default function extractExtendedControls(input = '') {
  const [
    phoneNumber,
    ...tokens
  ] = input.split(pauseRegex);
  return {
    input,
    phoneNumber,
    extendedControls: reduce(
      (output, token) => {
        output.push(',');
        const cleanControl = token.replace(controlRegex, '');
        if (cleanControl.length) {
          output.push(cleanControl);
        }
        return output;
      },
      [],
      tokens,
    ),
  };
}
