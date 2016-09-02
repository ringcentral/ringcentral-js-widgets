export default (arr, prefix) =>
  arr.reduce((acc, name) => Object.assign(acc, { [name]: `${prefix}__${name}` }), {});
