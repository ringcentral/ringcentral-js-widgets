import { RcIconButton, RcTextField, RcTextFieldProps } from '@ringcentral/juno';
import deletenumberSvg from '@ringcentral/juno/icon/Deletenumber';
import classNames from 'classnames';
import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import i18n from './i18n';
import styles from './styles.scss';

export type RecipientsInputProps = {
  recipients?: {
    phoneNumber: string;
    name?: string;
  }[];
  /** if you need default placeholder, you need pass currentLocal */
  currentLocale?: string;
  onChange(value?: string): any;
  onDelete(): any;
  onClear(): any;
  className?: string;
} & Omit<RcTextFieldProps, 'onChange'>;

const throttledTime = 1000;

export const RecipientsInput: FunctionComponent<RecipientsInputProps> = ({
  placeholder,
  value,
  currentLocale,
  onChange,
  onFocus,
  onBlur,
  onDelete,
  onClear,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>();
  const [mouseDownTime, setMouseDownTime] = useState<number>(null);
  const [timer, setTimer] = useState(null);

  const haveDeleteButton = !!value;

  useEffect(() => {
    inputRef.current.focus();
    onFocus(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const mouseDown = useMemo(
    () => () => {
      setMouseDownTime(+new Date());

      setTimer(
        setTimeout(() => {
          onClear();
          setTimer(null);
        }, throttledTime),
      );
    },
    [onClear],
  );

  const mouseUp = useMemo(
    () => () => {
      const curTime = +new Date();
      if (mouseDownTime && curTime - mouseDownTime >= throttledTime) {
        return;
      }

      clearTimeout(timer);
      onDelete();
    },
    [mouseDownTime, onDelete, timer],
  );

  return (
    <div className={classNames(className, styles.inputRoot)}>
      <RcTextField
        placeholder={
          placeholder || i18n.getString('dialPlaceholder', currentLocale)
        }
        value={value}
        inputProps={{
          maxLength: 30,
        }}
        fullWidth
        clearBtn={false}
        inputRef={inputRef}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        classes={{
          root: styles.textFieldRoot,
        }}
        data-sign="numberField"
        onFocus={onFocus}
        onBlur={onBlur}
        InputProps={{
          disableUnderline: true,
          classes: {
            root: styles.root,
            input: styles.input,
          },
          endAdornment: haveDeleteButton && (
            <RcIconButton
              variant="plain"
              size="large"
              color="grey.400"
              symbol={deletenumberSvg}
              data-sign="deleteButton"
              onMouseUp={mouseUp}
              onMouseDown={mouseDown}
            />
          ),
        }}
        autoComplete="off"
      />
    </div>
  );
};
