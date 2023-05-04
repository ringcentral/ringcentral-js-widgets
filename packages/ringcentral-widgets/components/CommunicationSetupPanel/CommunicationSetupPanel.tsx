import React, { FunctionComponent, useMemo, useRef, useState } from 'react';

import { BLOCKED_ID_VALUE } from '@ringcentral-integration/commons/modules/CallingSettings';
import type { ToNumber } from '@ringcentral-integration/commons/modules/ComposeText';
import {
  RcDialDelete,
  RcIconButton,
  RcListItemText,
  RcMenuItem,
  RcSelect,
  RcText,
} from '@ringcentral/juno';
import { DeleteCircle } from '@ringcentral/juno-icon';

import { useCommunicationSetupContext } from '../../contexts';
import {
  TabsEnum,
  TabsEnumType,
} from '../ContactSearchPanel/ContactSearchPanelEnum';
import fromFieldI18n from '../FromField/i18n';
import inputI18n from '../RecipientsInput/i18n';
import { CommunicationSetupProvider } from './CommunicationSetupProvider';
import ContactSearchContainer from './ContactSearchContainer';
import { isSplitterKey } from './helper';
import i18n from './i18n';
import {
  CallFields,
  FieldLine,
  FullSizeWrapper,
  ResultContainer,
  RootWrapper,
  StyledRcChip,
  StyledRcDialTextField,
  StyledRecipientsWrapper,
  StyledToInputWrapper,
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
  inputRef: React.RefObject<HTMLInputElement>;
}

const FromField: FunctionComponent<FromFieldProps> = ({
  currentLocale,
  disableFromField,
  fromNumber,
  formatPhone,
  changeFromNumber,
  options,
  blockedLabel,
  inputRef,
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
      MenuProps={{
        TransitionProps: {
          onExited: () => {
            inputRef.current?.focus();
          },
        },
      }}
    >
      {options.map((item) => (
        <RcMenuItem
          onClick={() => changeFromNumber(item)}
          value={item.phoneNumber}
          key={item.phoneNumber}
          data-sign="selectMenuItem"
        >
          {item.phoneNumber === BLOCKED_ID_VALUE ? (
            <RcListItemText primary={blockedLabel} />
          ) : (
            <RcListItemText
              primary={formatPhone(item.phoneNumber)}
              // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
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

export type CommunicationSetupPanelProps = {
  // To field
  onToNumberChange: (...args: any[]) => any;
  label?: string;
  placeholder?: string | null;
  recipients: ToNumber[];
  toNumber: string;
  setRecipient: (...args: any[]) => any;
  clearRecipient: (...args: any[]) => any;
  autoFocus?: boolean;
  multiple?: boolean;
  directlyProceedType?: string;
  inputFullWidth: boolean;
  // From field
  showAnonymous?: boolean;
  fromNumber?: string;
  fromNumbers?: { phoneNumber: string; usageType?: string }[];
  changeFromNumber?: (...args: any[]) => any;
  formatPhone?: (...args: any[]) => string;
  detectPhoneNumbers?: (...args: any[]) => any;
  showFromField?: boolean;
  disableFromField?: boolean;
  // Common
  currentLocale: string;
  defaultTab?: TabsEnumType;
};

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
      directlyProceedType = 'dial',
      setRecipient,
      clearRecipient,
      autoFocus,
      showFromField = true,
      disableFromField = false,
      children,
      showAnonymous,
      label = `${inputI18n.getString('to', currentLocale)}:`,
      placeholder = `${inputI18n.getString(
        'enterNameOrNumber',
        currentLocale,
      )}`,
      detectPhoneNumbers,
      defaultTab = TabsEnum.thirdParty,
      inputFullWidth,
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    const [openSearchPage, setOpenSearchPage] = useState<boolean>(false);
    const showSearchPage = openSearchPage && !!toNumber.trim();
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

    const hasTags = recipients.length > 0;

    const hiddenInput = !multiple && hasTags;

    const options = useMemo(() => {
      if (showAnonymous) {
        return [
          // @ts-expect-error TS(2488): Type '{ phoneNumber: string; usageType?: string | ... Remove this comment to see the full error message
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
      onChange: (...args: any[]) => {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        inputPropsRef?.current?.onChange.apply(null, args);
      },
      onKeyDown: (...args: any[]) => {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        inputPropsRef?.current?.onKeyDown.apply(null, args);
      },
    };

    const RecipientComponent = useMemo(
      () =>
        !!recipients.length && (
          <StyledRecipientsWrapper>
            {recipients.map((item, index) => (
              <StyledRcChip
                data-sign="recipientsChip"
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

    const inputChangeHandler = (value: string) => {
      if (value.trim()) {
        setOpenSearchPage(true);
      } else {
        setOpenSearchPage(false);
      }

      onToNumberChange(value);
    };

    return (
      <RootWrapper>
        <CallFields>
          <FieldLine>
            <RcText color="neutral.b05">{label}</RcText>
            <StyledToInputWrapper inputFullWidth={inputFullWidth}>
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
                  onChange={inputChangeHandler}
                  // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
                  placeholder={
                    inputFullWidth && !!recipients.length ? null : placeholder
                  }
                  onPaste={async (ev) => {
                    if (
                      detectPhoneNumbers &&
                      ev.clipboardData &&
                      ev.clipboardData.getData
                    ) {
                      const pastedText = ev.clipboardData.getData('text/plain');
                      ev.preventDefault();
                      const result = await detectPhoneNumbers(pastedText);
                      !result && inputChangeHandler(pastedText);
                    }
                  }}
                  InputProps={{
                    ...InputProps,
                    endAdornment: !!toNumber.length && (
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
                      if (toNumber.trim()) {
                        setOpenSearchPage(true);
                      }
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
              inputRef={inputRef}
              currentLocale={currentLocale}
              disableFromField={disableFromField}
              // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
              fromNumber={fromNumber}
              // @ts-expect-error TS(2322): Type '((...args: any[]) => string) | undefined' is... Remove this comment to see the full error message
              formatPhone={formatPhone}
              // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
              changeFromNumber={changeFromNumber}
              // @ts-expect-error TS(2322): Type 'any[] | undefined' is not assignable to type... Remove this comment to see the full error message
              options={options}
              blockedLabel={blockedLabel}
            />
          )}
        </CallFields>
        <FullSizeWrapper>
          {showSearchPage && (
            <ResultContainer>
              <ContactSearchContainer
                optionClickHandler={setRecipientHandler}
                inputRef={inputRef}
                userInput={toNumber}
                defaultTab={defaultTab}
                directlyProceedText={`${i18n.getString(
                  directlyProceedType,
                  currentLocale,
                )}`}
              />
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
