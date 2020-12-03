export const camelcase = (str: string, pascalCase = false) => {
  if (Array.isArray(str)) {
    str = str
      .map((x) => x.trim())
      .filter((x) => x.length)
      .join(' ');
  } else {
    str = str.trim();
  }

  return str
    .replace(/[A-Z]{2,}[a-z]/g, ($1) => {
      // if there is 2 or more upper chars and next char is lower, preserve the penult
      return `${$1.slice(0, $1.length - 2)}-${$1.slice($1.length - 2)}`;
    })
    .replace(/[a-z][A-Z]/g, ($1) => {
      // if the prefix is lower and current is upper, preserve it
      return `${$1.slice(0, $1.length - 1)}-${$1.slice($1.length - 1)}`;
    })
    .replace(/[_-]+/g, ' ') // replace '-_' with space
    .toLowerCase()
    .replace(/\s(.)/g, ($1) => {
      return $1.toUpperCase(); // use camelcase for every split string
    })
    .replace(/\d+[a-z]/g, ($1) => $1.toUpperCase())
    .replace(/\s/g, '') // combine
    .replace(/^(.)/, ($1) => {
      return pascalCase ? $1.toUpperCase() : $1.toLowerCase(); // option for first char is upper or not
    });
};
