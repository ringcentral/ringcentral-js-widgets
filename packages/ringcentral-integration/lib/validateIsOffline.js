export default (message) => {
  const offlineMessagesList = [
    'Failed to fetch',
    'The Internet connection appears to be offline.',
    'NetworkError when attempting to fetch resource.',
    'Network Error 0x2ee7, Could not complete the operation due to error 00002ee7.',
    'A server with the specified hostname could not be found.', // DNS matching failed
    'Network request failed', // IE
    'Type error', // Safari
    'The request timed out.', // Safari
  ];
  return !!offlineMessagesList.find((item) => item === message);
};
