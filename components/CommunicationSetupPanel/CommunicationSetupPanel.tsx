import React, { FunctionComponent, useMemo, useRef, useState } from 'react';

import { BLOCKED_ID_VALUE } from '@ringcentral-integration/commons/modules/CallingSettingsV2';
import {
  RcDialDelete,
  RcIconButton,
  RcListItemText,
  RcMenuItem,
  RcSelect,
  RcText,
} from '@ringcentral/juno';
import { DeleteCircle } from '@ringcentral/juno/icon';

import { CommunicationSetupProvider } from './CommunicationSetupProvider';
import { useCommunicationSetupContext } from '../../contexts';

import fromFieldI18n from '../FromField/i18n';
import i18n from '../RecipientsInput/i18n';
import { DirectlyProceedLine } from './DirectlyProceedLine';
import ContactSearchContainer from './ContactSearchContainer';
import { isSplitterKey, validateValidChars } from './helper';
import {
  CallFields,
  FieldLine,
  FullSizeWrapper,
  ResultContainer,
  RootWrapper,
  StyledRcDialTextField,
  StyledToInputWrapper,
  StyledRecipientsWrapper,
  StyledRcChip,
} from './styles';

const maxLength = 30;

interface FromFieldProps {
  currentLocale: string;
  disableFromField: boolean;
  fromNumber: string;
  formatPhone: (...args: any[]) => string;
  changeFromNumber: (...args: any[]) => any;
  options: {
    phoneNumber: string;
    usageType?: string;
  }[];
  blockedLabel: string;
}

const FromField: FunctionComponent<FromFieldProps> = ({
  currentLocale,
  disableFromField,
  fromNumber,
  formatPhone,
  changeFromNumber,
  options,
  blockedLabel,
}) => (
  <FieldLine>
    <RcText variant="caption1" color="neutral.b04">
      {`${fromFieldI18n.getString('from', currentLocale)}:`}
    </RcText>
    <RcSelect
      fullWidth
      textVariant="caption1"
      data-sign="phoneNumber"
      renderValue={(val) =>
        val === BLOCKED_ID_VALUE ? blockedLabel : formatPhone(val)
      }
      disabled={disableFromField}
      value={fromNumber}
      InputProps={{
        // classes: customSelectInputClasses,
        disableUnderline: true,
      }}
    >
      {options.map((item) => (
        <RcMenuItem
          onClick={() => changeFromNumber(item)}
          value={item.phoneNumber}
          key={item.phoneNumber}
        >
          {item.phoneNumber === BLOCKED_ID_VALUE ? (
            <RcListItemText primary={blockedLabel} />
          ) : (
            <RcListItemText
              primary={formatPhone(item.phoneNumber)}
              secondary={fromFieldI18n.getString(item.usageType, currentLocale)}
            />
          )}
        </RcMenuItem>
      ))}
    </RcSelect>
  </FieldLine>
);

// TODO: keep original style, wait check with designer
// const CustomSelect = styled(RcSelect)``;
// const customSelectInputClasses = RcClasses<RcSelectProps['InputProps']>(
//   ['input'],
//   'custom-select-input',
// );
// const CustomSelect = styled(RcSelect)`
//   && {
//     .${customSelectInputClasses.input} {
//       background-color: transparent;
//     }
//   }
// `;

interface CommunicationSetupPanelProps {
  // To field
  onToNumberChange: (...args: any[]) => any;
  label?: string;
  placeholder?: string;
  recipients?: {
    phoneNumber: string;
    name?: string;
    isWarning?: boolean;
  }[];
  toNumber: string;
  setRecipient: (...args: any[]) => any;
  clearRecipient: (...args: any[]) => any;
  autoFocus?: boolean;
  multiple?: boolean;
  // From field
  showAnonymous: boolean;
  fromNumber: string;
  fromNumbers: { phoneNumber: string; usageType?: string }[];
  changeFromNumber: (...args: any[]) => any;
  formatPhone: (...args: any[]) => string;
  detectPhoneNumbers: (...args: any[]) => any;
  showFromField: boolean;
  disableFromField?: boolean;
  // Common
  currentLocale: string;
}

const CommunicationSetupWrapper: FunctionComponent<CommunicationSetupPanelProps> =
  (props) => {
    const {
      currentLocale,
      onToNumberChange,
      toNumber,
      fromNumber,
      fromNumbers,
      changeFromNumber,
      formatPhone,
      recipients,
      multiple = false,
      setRecipient,
      clearRecipient,
      autoFocus,
      showFromField = true,
      disableFromField = false,
      children,
      showAnonymous,
      label = `${i18n.getString('to', currentLocale)}:`,
      placeholder = `${i18n.getString('enterNameOrNumber', currentLocale)}`,
      detectPhoneNumbers,
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    const [openSearchPage, setOpenSearchPage] = useState<boolean>(false);

    const setRecipientByChars = (Chars: string) => {
      setOpenSearchPage(false);
      setRecipient({
        name: Chars,
        phoneNumber: Chars,
      });
      inputRef.current?.blur();
    };

    const setRecipientHandler = (optionItem: any) => {
      setOpenSearchPage(false);
      setRecipient(optionItem);
      inputRef.current?.blur();
    };

    const keyDownHandler = (e: React.KeyboardEvent) => {
      if (isSplitterKey(e) && !!toNumber.trim()) {
        e.preventDefault();
        setRecipientByChars(toNumber);
      }
    };

    const closeSearchPage = () => {
      setOpenSearchPage(false);
      onToNumberChange('');
      inputRef.current?.blur();
    };

    const showDirectlyLine = validateValidChars(toNumber);
    const hasTags = recipients.length > 0;

    const hiddenInput = !multiple && hasTags;

    const options = useMemo(() => {
      if (showAnonymous) {
        return [
          ...fromNumbers,
          {
            phoneNumber: BLOCKED_ID_VALUE,
          },
        ];
      }

      return fromNumbers;
    }, [fromNumbers, showAnonymous]);

    const blockedLabel = fromFieldI18n.getString('Blocked', currentLocale);
    const { inputPropsRef } = useCommunicationSetupContext();

    const InputProps = {
      onChange: (...args) => {
        inputPropsRef?.current?.onChange.apply(null, args);
      },
      onKeyDown: (...args: any[]) => {
        inputPropsRef?.current?.onKeyDown.apply(null, args);
      },
    };

    const RecipientComponent = useMemo(
      () =>
        !!recipients.length && (
          <StyledRecipientsWrapper>
            {recipients.map((item, index) => (
              <StyledRcChip
                deleteIconProps={{ size: 'small' }}
                style={{ fontSize: '14px' }}
                onDelete={() => clearRecipient(item)}
                label={item.name || item.phoneNumber}
                key={`${item.phoneNumber} - ${index}`}
                error={item.isWarning}
              />
            ))}
          </StyledRecipientsWrapper>
        ),
      [recipients, clearRecipient],
    );

    return (
      <RootWrapper>
        <CallFields>
          <FieldLine>
            <RcText color="neutral.b05">{label}</RcText>
            <StyledToInputWrapper>
              {RecipientComponent}
              {!hiddenInput && (
                <StyledRcDialTextField
                  inputRef={inputRef}
                  autoFocus={autoFocus}
                  fullWidth
                  size="small"
                  variant="borderLess"
                  textVariant="body1"
                  onKeyDown={keyDownHandler}
                  value={toNumber}
                  onChange={onToNumberChange}
                  placeholder={placeholder}
                  onPaste={async (ev) => {
                    if (
                      detectPhoneNumbers &&
                      ev.clipboardData &&
                      ev.clipboardData.getData
                    ) {
                      const pastedText = ev.clipboardData.getData('text/plain');
                      const result = await detectPhoneNumbers(pastedText);
                      result && ev.preventDefault();
                    }
                  }}
                  InputProps={{
                    ...InputProps,
                    endAdornment: openSearchPage && (
                      <RcDialDelete
                        onDelete={(e) => {
                          e.preventDefault();
                          closeSearchPage();
                        }}
                      >
                        <RcIconButton
                          symbol={DeleteCircle}
                          data-sign="deleteButton"
                          title="Delete"
                          variant="plain"
                          size="medium"
                        />
                      </RcDialDelete>
                    ),
                    onFocus: () => {
                      setOpenSearchPage(true);
                    },
                  }}
                  inputProps={{
                    'data-sign': 'recipientsInput',
                    maxLength,
                  }}
                />
              )}
            </StyledToInputWrapper>
          </FieldLine>
          {showFromField && (
            <FromField
              currentLocale={currentLocale}
              disableFromField={disableFromField}
              fromNumber={fromNumber}
              formatPhone={formatPhone}
              changeFromNumber={changeFromNumber}
              options={options}
              blockedLabel={blockedLabel}
            />
          )}
        </CallFields>
        <FullSizeWrapper>
          {openSearchPage && (
            <ResultContainer>
              <FullSizeWrapper>
                <ContactSearchContainer
                  optionClickHandler={setRecipientHandler}
                  inputRef={inputRef}
                  userInput={toNumber}
                />
              </FullSizeWrapper>
              {showDirectlyLine && (
                <DirectlyProceedLine
                  inMessagePage={multiple}
                  currentLocale={currentLocale}
                  number={toNumber}
                  onClick={() => setRecipientByChars(toNumber)}
                />
              )}
            </ResultContainer>
          )}
          {children}
        </FullSizeWrapper>
      </RootWrapper>
    );
  };

export const CommunicationSetupPanel: FunctionComponent<CommunicationSetupPanelProps> =
  (props) => (
    <CommunicationSetupProvider>
      <CommunicationSetupWrapper {...props} />
    </CommunicationSetupProvider>
  );
