import { RcButton } from '@ringcentral-integration/rcui';
import React, { FunctionComponent, useState } from 'react';
import BackHeader from 'ringcentral-widgets/components/BackHeaderV2';
import { DialPad } from 'ringcentral-widgets/components/Rcui/DialPad';
import { RecipientsInput } from 'ringcentral-widgets/components/Rcui/RecipientsInput';

import {
  EvTransferCallUIFunctions,
  EvTransferCallUIProps,
} from '../../interfaces';
import i18n from './i18n';
import styles from './styles.scss';
import { Dialer } from '../DialerPanel';

export type ManualEntryPanelProps = Pick<
  EvTransferCallUIProps & EvTransferCallUIFunctions,
  | 'currentLocale'
  | 'goBack'
  | 'transferRecipientCountryId'
  | 'changeRecipientNumber'
  | 'changeRecipientCountryId'
  | 'transferCountryOptions'
  | 'transferRecipientNumber'
  | 'allowManualInternationalTransfer'
>;

const ManualEntryPanel: FunctionComponent<ManualEntryPanelProps> = ({
  currentLocale,
  goBack,
  transferRecipientCountryId,
  changeRecipientNumber,
  changeRecipientCountryId,
  transferCountryOptions,
  transferRecipientNumber,
  allowManualInternationalTransfer,
}) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [inputValue, setInputValue] = useState(transferRecipientNumber);
  return (
    <>
      <BackHeader
        currentLocale={currentLocale}
        title={i18n.getString('callRecipient', currentLocale)}
        onBackClick={goBack}
        className={styles.backHeader}
      />
      {/* Note: Now temporarily don't support the international number  */}
      {/* {allowManualInternationalTransfer && (
          <PickList
            data-sign="transferCountry"
            options={transferCountryOptions}
            label={i18n.getString('transferCountry', currentLocale)}
            optionValueKey="countryId"
            renderItem={({ countryName }) => countryName}
            value={transferRecipientCountryId}
            onChange={(countryId) => {
              changeRecipientCountryId(countryId);
            }}
          />
        )} */}
      <Dialer
        value={inputValue}
        setValue={setInputValue}
        placeholder={i18n.getString('dialPlaceholder', currentLocale)}
      >
        <div className={styles.actionContainer}>
          <div className={styles.button}>
            <RcButton
              data-sign="nextButton"
              size="medium"
              fullWidth
              disabled={!inputValue}
              onClick={() => changeRecipientNumber(inputValue)}
            >
              {i18n.getString('next', currentLocale)}
            </RcButton>
          </div>
        </div>
      </Dialer>
    </>
  );
};

export { ManualEntryPanel };
