export const getRuntimeLocation = () => {
  if (typeof window !== 'undefined' && window.location) {
    return window.location;
  }

  return globalThis.location;
};

export const reloadRuntimeLocation = () => {
  getRuntimeLocation()?.reload();
};
