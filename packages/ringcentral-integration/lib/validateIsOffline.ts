export default (message) => {
  if (!message) {
    return false;
  }
  const offlineMessagesList = [
    'Failed to fetch',
    'Network Error',
    'Unable to access the network',
    'Your connection was interrupted',
    'The Internet connection appears to be offline.',
    'NetworkError when attempting to fetch resource.',
    'A server with the specified hostname could not be found.', // DNS matching failed
    'Network request failed', // IE
    'Type error', // Safari
    'The request timed out.', // Safari
  ];
  return !!offlineMessagesList.find((item) => message.indexOf(item) > -1);
};
