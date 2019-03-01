"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Eula(props) {
  var currentLocale = props.currentLocale,
      className = props.className,
      onLinkClicked = props.onLinkClicked,
      brandId = props.brandId;
  var labelId = 'eula';
  var link;
  var isFr = currentLocale.substr(0, 2).toLowerCase() === 'fr';

  switch (brandId) {
    case '3420':
      // att
      labelId = 'serviceTerms';
      link = 'http://www.att.com/officeathandpolicy';
      break;

    case '7710':
      // bt
      labelId = 'termsOfService';
      link = 'https://business.bt.com/terms/';
      break;

    case '7310':
      // telus
      labelId = 'serviceTerms';
      link = isFr ? 'https://business.telus.com/fr/campaigns/business-connect-service-terms?INTCMP=VAN_businessconnect_fr_serviceterms' : 'https://business.telus.com/en/support/global/legal/business-connect-service-terms?INTCMP=VAN_businessconnect_serviceterms';
      break;

    default:
      link = 'https://www.ringcentral.com/legal/eulatos.html';
      break;
  }

  return _react.default.createElement("a", {
    className: className,
    href: link,
    rel: "noopener noreferrer",
    target: "_blank",
    onClick: onLinkClicked ? function (e) {
      return props.onLinkClicked(e, link);
    } : null
  }, _i18n.default.getString(labelId));
}

Eula.propTypes = {
  brandId: _propTypes.default.string.isRequired,
  currentLocale: _propTypes.default.string.isRequired,
  className: _propTypes.default.string,
  onLinkClicked: _propTypes.default.func
};
Eula.defaultProps = {
  className: _propTypes.default.string,
  onLinkClicked: _propTypes.default.func
};
var _default = Eula;
exports.default = _default;
//# sourceMappingURL=index.js.map
