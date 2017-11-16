import React from 'react';
import PropTypes from 'prop-types';
import i18n from './i18n';

function Eula(props) {
  let labelId = 'eula';
  let link;
  const isFr = props.currentLocale.substr(0, 2).toLowerCase() === 'fr';

  switch (props.brandId) {
    case '3420': // att
      link = 'https://asecare.att.com/tutorials/ringcentral-officehand-from-att-end-user-licensing-agreement/?product=ringcentral-officehand-from-att-end-user-licensing-agreement';
      break;
    case '7710': // bt
      link = 'http://www.productsandservices.bt.com/products/static/terms/terms-of-use.html';
      break;
    case '7310': // telus
      labelId = 'serviceTerms';
      link = isFr ?
        'http://business.telus.com/fr/campaigns/business-connect-service-terms?INTCMP=VAN_businessconnect_fr_serviceterms' :
        'http://business.telus.com/en/support/global/legal/business-connect-service-terms?INTCMP=VAN_businessconnect_serviceterms';
      break;
    default:
      link = 'https://www.ringcentral.com/legal/eulatos.html';
      break;
  }
  return (
    <a
      className={props.className}
      href={link}
      rel="noopener noreferrer"
      target="_blank"
    >
      {i18n.getString(labelId)}
    </a>
  );
}

Eula.propTypes = {
  brandId: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Eula;
