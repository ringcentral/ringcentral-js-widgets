'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Eula(props) {
  var labelId = 'eula';
  var link = void 0;
  var isFr = props.currentLocale.substr(0, 2).toLowerCase() === 'fr';

  switch (props.brandId) {
    case '3420':
      // att
      link = 'https://asecare.att.com/tutorials/ringcentral-officehand-from-att-end-user-licensing-agreement/?product=ringcentral-officehand-from-att-end-user-licensing-agreement';
      break;
    case '7710':
      // bt
      link = 'http://www.productsandservices.bt.com/products/static/terms/terms-of-use.html';
      break;
    case '7310':
      // telus
      labelId = 'serviceTerms';
      link = isFr ? 'http://business.telus.com/fr/campaigns/business-connect-service-terms?INTCMP=VAN_businessconnect_fr_serviceterms' : 'http://business.telus.com/en/support/global/legal/business-connect-service-terms?INTCMP=VAN_businessconnect_serviceterms';
      break;
    default:
      link = 'https://www.ringcentral.com/legal/eulatos.html';
      break;
  }
  return _react2.default.createElement(
    'a',
    {
      className: props.className,
      href: link,
      rel: 'noopener noreferrer',
      target: '_blank'
    },
    _i18n2.default.getString(labelId)
  );
}

Eula.propTypes = {
  brandId: _propTypes2.default.string.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  className: _propTypes2.default.string
};

exports.default = Eula;
//# sourceMappingURL=index.js.map
