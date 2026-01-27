"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProfileImage = exports.CONTACT_AVATAR_SIZE_MAP = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url.js");
require("core-js/modules/web.url.to-json.js");
require("core-js/modules/web.url-search-params.js");
var CONTACT_AVATAR_SIZE_MAP = exports.CONTACT_AVATAR_SIZE_MAP = {
  xsmall: '90x90',
  small: '195x195',
  large: '584x584',
  original: 'original'
};
var getProfileImage = exports.getProfileImage = function getProfileImage(_ref) {
  var profileImage = _ref.profileImage,
    accessToken = _ref.accessToken,
    size = _ref.size;
  var uri = profileImage === null || profileImage === void 0 ? void 0 : profileImage.uri;
  var etag = profileImage.etag;
  if (!accessToken || !uri ||
  // in platform must have etag means that the image is valid and exist, not have may not have image due to the backend sync image issue
  !etag) return undefined;
  try {
    var url = new URL(uri);

    // add size to pathname
    if (size) {
      url.pathname = "".concat(url.pathname, "/").concat(CONTACT_AVATAR_SIZE_MAP[size]);
    }
    url.searchParams.append('access_token', accessToken);
    url.searchParams.append('etag', etag);
    return url.toString();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("[getProfileImage] getProfileImageSync error");
    return undefined;
  }
};
//# sourceMappingURL=getProfileImage.js.map
