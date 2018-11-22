import HashMap from '../lib/HashMap';

export default new HashMap({
  chrome: 'Failed to fetch',
  firefox: 'The Internet connection appears to be offline.',
  safari: 'NetworkError when attempting to fetch resource.',
  ie: 'Network Error 0x2ee7, Could not complete the operation due to error 00002ee7.',
});
