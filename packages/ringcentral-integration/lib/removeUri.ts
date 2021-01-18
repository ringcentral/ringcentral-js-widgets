export default function removeUri<T extends { uri?: any }>(options: T) {
  // TODO: remove default {}
  const { uri, ...data } = options ?? ({} as Pick<T, Exclude<keyof T, 'uri'>>);
  return data;
}
