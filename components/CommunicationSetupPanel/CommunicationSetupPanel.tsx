import type UserPhoneNumberInfo from '@rc-ex/core/lib/definitions/UserPhoneNumberInfo';
import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import { BLOCKED_ID_VALUE } from '@ringcentral-integration/commons/modules/CallingSettings';
import type { ToNumber } from '@ringcentral-integration/commons/modules/ComposeText';
import {
  RcDialDelete,
  RcIconButton,
  RcListItemText,
  RcMenuItem,
  RcSelect,
  RcText,
  useDebounce,
  useDepsChange,
  useRefState,
} from '@ringcentral/juno';
import { DeleteCircle } from '@ringcentral/juno-icon';
import type { FunctionComponent } from 'react';
import React, { useMemo, useRef, useState } from 'react';

import { useCommunicationSetupContext } from '../../contexts';
import type { TabsEnumType } from '../ContactSearchPanel/ContactSearchPanelEnum';
import { TabsEnum } from '../ContactSearchPanel/ContactSearchPanelEnum';
import fromFieldI18n from '../FromField/i18n';
import inputI18n from '../RecipientsInput/i18n';

import { CommunicationSetupProvider } from './CommunicationSetupProvider';
import ContactSearchContainer from './ContactSearchContainer';
import { isSplitterKey } from './helper';
import i18n, { type I18nKey } from './i18n';
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
}) => {
  return (
    <FieldLine>
      <RcText variant="caption1" color="neutral.b04">
        {`${fromFieldI18n.getString('from', currentLocale)}:`}
      </RcText>
      <RcSelect
        fullWidth
        textVariant="caption1"
        data-sign="phoneNumber"
        renderValue={(val) => {
          const text =
            val === BLOCKED_ID_VALUE ? blockedLabel : formatPhone(val);
          return <span data-sign="fromLabel">{text}</span>;
        }}
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
        {options.map((item, index) => (
          <RcMenuItem
            onClick={() => changeFromNumber(item)}
            value={item.phoneNumber}
            key={item.phoneNumber}
            data-sign={`selectMenuItem${index}`}
          >
            {item.phoneNumber === BLOCKED_ID_VALUE ? (
              <RcListItemText primary={blockedLabel} />
            ) : (
              <RcListItemText
                primary={formatPhone(item.phoneNumber)}
                secondary={fromFieldI18n.getString(
                  item.usageType as never,
                  currentLocale,
                )}
              />
            )}
          </RcMenuItem>
        ))}
      </RcSelect>
    </FieldLine>
  );
};

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
  triggerEventTracking: (eventName: string, contactType: string) => any;
  setRecipient: (...args: any[]) => any;
  clearRecipient: (...args: any[]) => any;
  autoFocus?: boolean;
  multiple?: boolean;
  directlyProceedType?: I18nKey;
  inputFullWidth: boolean;
  filterCallQueueExtension?: boolean;
  // From field
  showAnonymous?: boolean;
  fromNumber?: string;
  fromNumbers?: UserPhoneNumberInfo[];
  changeFromNumber?: (...args: any[]) => any;
  formatPhone?: (...args: any[]) => string;
  detectPhoneNumbers?: (...args: any[]) => any;
  showFromField?: boolean;
  disableFromField?: boolean;
  // Common
  currentLocale: string;
  defaultTab?: TabsEnumType;
  ContactSearch?: FunctionComponent<any>;
};

const CommunicationSetupWrapper: FunctionComponent<
  CommunicationSetupPanelProps
> = (props) => {
  const {
    currentLocale,
    onToNumberChange,
    triggerEventTracking,
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
    placeholder = `${inputI18n.getString('enterNameOrNumber', currentLocale)}`,
    detectPhoneNumbers,
    defaultTab = TabsEnum.thirdParty,
    inputFullWidth,
    filterCallQueueExtension,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const [innerToNumber, setInnerToNumber, { updating: startTyping }] =
    useAsyncTextFieldState(toNumber);

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
    setInnerToNumber('');
    setOpenSearchPage(false);
    onToNumberChange('');
    inputRef.current?.blur();
  };

  const hasTags = recipients.length > 0;

  const hiddenInput = !multiple && hasTags;

  const options = useMemo(() => {
    if (showAnonymous) {
      return [
        // @ts-ignore
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
    startTyping(value);

    if (value.trim()) {
      setOpenSearchPage(true);
    } else {
      setOpenSearchPage(false);
    }

    onToNumberChange(value);
  };

  const ContactSearch = props.ContactSearch ?? ContactSearchContainer;
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
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus={autoFocus}
                fullWidth
                size="small"
                variant="borderLess"
                textVariant="body1"
                onKeyDown={keyDownHandler}
                value={innerToNumber}
                onChange={inputChangeHandler}
                placeholder={
                  inputFullWidth && !!recipients.length
                    ? undefined
                    : placeholder ?? undefined
                }
                title={placeholder ?? undefined}
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
            <ContactSearch
              triggerEventTracking={triggerEventTracking}
              filterCallQueueExtension={filterCallQueueExtension}
              optionClickHandler={setRecipientHandler}
              inputRef={inputRef}
              userInput={toNumber}
              defaultTab={defaultTab}
              directlyProceedText={i18n.getString(
                directlyProceedType,
                currentLocale,
              )}
            />
          </ResultContainer>
        )}
        {children}
      </FullSizeWrapper>
    </RootWrapper>
  );
};

export const CommunicationSetupPanel: FunctionComponent<
  CommunicationSetupPanelProps
> = (props) => (
  <CommunicationSetupProvider>
    <CommunicationSetupWrapper {...props} />
  </CommunicationSetupProvider>
);

/**
 * Custom hook for managing async text field control state.
 *
 * use for update value in sync way when using `updating` method,
 * in typing mode, that will not update the value immediately, that will wait for 500ms to update the value, to avoid too many rerender and async cause input cursor jump
 *
 * @param initValue - The initial value for the control state.
 */
const useAsyncTextFieldState = (initValue: string) => {
  const [state, _setState] = useRefState(initValue);

  const debouncingRef = useRef(false);
  const setState = (val: string, isUpdate?: boolean | undefined) => {
    debouncingRef.current = false;
    debounceSetState.cancel();
    _setState(val, isUpdate);
  };

  const debounceSetState = useDebounce(() => {
    setState(initValue);
  }, 500);

  useDepsChange(() => {
    if (state.current === initValue) {
      debouncingRef.current = false;

      return;
    }

    // when be empty from outside, cancel previous debounce prevent update show again
    if (state.current !== '' && initValue === '') {
      setState('', false);
    } else if (debouncingRef.current) {
      // use debounce to avoid too many rerender and async cause input cursor jump
      debounceSetState();
    } else {
      setState(initValue, false);
    }
  }, [initValue]);

  return [
    state.current,
    setState,
    {
      updating: (value: string) => {
        debouncingRef.current = value !== '';
        _setState(value);
      },
    },
  ] as const;
};
