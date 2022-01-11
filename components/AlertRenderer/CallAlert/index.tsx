import React from 'react';

import callErrors from '@ringcentral-integration/commons/modules/Call/callErrors';

import FormattedMessage from '../../FormattedMessage';
import i18n from './i18n';
import styles from './styles.scss';

type CallAlertProps = {
  onAreaCodeLinkClick?: (...args: any[]) => any;
  message: {
    id: string;
    message: string;
    payload?: object;
  };
  brand: object;
  currentLocale: string;
};
export const CallAlert: React.SFC<CallAlertProps> = ({
  message: { id, message, payload },
  brand,
  onAreaCodeLinkClick,
  currentLocale,
}) => {
  if (message === callErrors.noAreaCode) {
    const areaCode = i18n.getString('areaCode', currentLocale);
    const areaCodeLink = onAreaCodeLinkClick ? (
      <a
        className={styles.link}
        onClick={(e) => {
          e.preventDefault();
          onAreaCodeLinkClick({ alertId: id });
        }}
        data-sign="setAreaCode"
      >
        {areaCode}
      </a>
    ) : (
      areaCode
    );
    return (
      <FormattedMessage
        message={i18n.getString(message, currentLocale)}
        values={{ areaCodeLink }}
      />
    );
  }
  if (message === callErrors.noInternational) {
    return (
      <FormattedMessage
        message={i18n.getString(message, currentLocale)}
        values={{ brand: brand.name }}
      />
    );
  }
  return <span>{i18n.getString(message, currentLocale)}</span>;
};
CallAlert.defaultProps = {
  onAreaCodeLinkClick: undefined,
};
CallAlert.handleMessage = ({ message }) =>
  message === callErrors.emergencyNumber ||
  message === callErrors.noToNumber ||
  message === callErrors.noAreaCode ||
  message === callErrors.connectFailed ||
  message === callErrors.internalError ||
  message === callErrors.notAnExtension ||
  message === callErrors.networkError ||
  message === callErrors.noInternational ||
  message === callErrors.noRingoutEnable;
export default CallAlert;
