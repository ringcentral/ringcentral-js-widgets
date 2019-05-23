import React from 'react';
import PropTypes from 'prop-types';
import i18n from './i18n';

function Eula(props) {
  const {
    currentLocale, className, onLinkClicked, brandId,
    useEulaAbbreviation, dataSign,
  } = props;
  let labelId = useEulaAbbreviation ? 'eulaAbbr' : 'eula';
  let link;
  const isFr = currentLocale.substr(0, 2).toLowerCase() === 'fr';

  switch (brandId) {
    case '3420': // att
      labelId = 'serviceTerms';
      link = 'http://www.att.com/officeathandpolicy';
      break;
    case '7710': // bt
      labelId = 'termsOfService';
      link = 'https://business.bt.com/terms/';
      break;
    case '7310': // telus
      labelId = 'serviceTerms';
      link = isFr ?
        'https://business.telus.com/fr/campaigns/business-connect-service-terms?INTCMP=VAN_businessconnect_fr_serviceterms' :
        'https://business.telus.com/en/support/global/legal/business-connect-service-terms?INTCMP=VAN_businessconnect_serviceterms';
      break;
    default:
      link = 'https://www.ringcentral.com/legal/eulatos.html';
      break;
  }

  return (
    <a
      className={className}
      href={link}
      rel="noopener noreferrer"
      target="_blank"
      onClick={(onLinkClicked ? (e => props.onLinkClicked(e, link)) : null)}
      data-sign={dataSign}
    >
      {i18n.getString(labelId)}
    </a>
  );
}

Eula.propTypes = {
  dataSign: PropTypes.string,
  brandId: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  className: PropTypes.string,
  onLinkClicked: PropTypes.func,
  useEulaAbbreviation: PropTypes.bool,
};

Eula.defaultProps = {
  dataSign: null,
  className: '',
  onLinkClicked() { },
  useEulaAbbreviation: false
};

export default Eula;
