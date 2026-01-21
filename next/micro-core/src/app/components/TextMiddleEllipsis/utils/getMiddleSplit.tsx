const DEFAULT_MAX_LENGTH = 22;
const DEFAULT_MIDDLE = -8;

type GetMiddleSplitOptions = {
  max?: number;
  middle?: number;
};

export function getMiddleSplit(
  text: string,
  { max = DEFAULT_MAX_LENGTH, middle = DEFAULT_MIDDLE }: GetMiddleSplitOptions,
) {
  if ((text || '').trim() === '') {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        '[getMiddleSplit] please make sure your input value must have string',
      );
    }
    return { left: '', right: '' };
  }

  let left = text;
  let right = '';

  if (text.length > max) {
    right = text.slice(middle);
    left = text.replace(right, '');
  }

  return { left, right };
}
