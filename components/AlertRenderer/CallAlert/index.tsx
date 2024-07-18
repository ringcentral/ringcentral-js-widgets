import { callErrors } from '@ringcentral-integration/commons/modules/Call';
import React from 'react';

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
export const CallAlert: React.FC<CallAlertProps> = ({
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
        // @ts-expect-error TS(2339): Property 'name' does not exist on type 'object'.
        values={{ brand: brand.name }}
      />
    );
  }
  return <span>{i18n.getString(message, currentLocale)}</span>;
};
CallAlert.defaultProps = {
  onAreaCodeLinkClick: undefined,
};
// @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
CallAlert.handleMessage = ({ message }: any) =>
  message === callErrors.emergencyNumber ||
  message === callErrors.noToNumber ||
  message === callErrors.noAreaCode ||
  message === callErrors.connectFailed ||
  message === callErrors.internalError ||
  message === callErrors.notAnExtension ||
  message === callErrors.networkError ||
  message === callErrors.noInternational ||
  message === callErrors.noRingoutEnable ||
  message === callErrors.numberParseError ||
  message === callErrors.fromAndToNumberIsSame;
export default CallAlert;
