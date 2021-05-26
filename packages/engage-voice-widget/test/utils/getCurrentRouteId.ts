export const getCurrentRouteId = (url: string) => {
  const params = url.split('/');
  if (/\/activeCallList$/.test(url)) {
    return params.slice(-2)[0];
  }
  if (/\/history\/callLog/.test(url)) {
    return params.slice(-2)[0];
  }
  return params.pop();
};
