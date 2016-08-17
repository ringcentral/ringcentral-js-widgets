function mapping(key) {
  if (key === 'FUNCTION') {
    return function anomy() {};
  } else if (key === 'ELEMENT') {
    // TODO
  } else if (key === 'NODE') {
    // TODO
  }
  return key;
}

export function postProcess(obj) {
  const result = {};
  Object.keys(obj).forEach(key => {
    result[key] = mapping(obj[key]);
  });
  return result;
}
