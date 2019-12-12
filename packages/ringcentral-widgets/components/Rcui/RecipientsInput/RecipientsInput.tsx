import {
  RcTextField,
  RcTextFieldProps,
  RcIconButton,
} from '@ringcentral-integration/rcui';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';

import i18n from './i18n';
import styles from './styles.scss';

type RecipientsInputProps = {
  recipients?: {
    phoneNumber: string;
    name?: string;
  }[];
  currentLocale: string;
  onChange(value?: string): any;
  onDelete(): any;
  onClear(): any;
} & Omit<RcTextFieldProps, 'onChange'>;

const throttledTime = 1000;

export const RecipientsInput: FunctionComponent<RecipientsInputProps> = ({
  placeholder,
  value,
  currentLocale,
  onChange,
  onFocus,
  onDelete,
  onClear,
}) => {
  const inputRef = useRef<HTMLInputElement>();
  const [remainSpace, setRemainSpace] = useState(0);
  const [mouseDownTime, setMouseDownTime] = useState<number>(null);
  const [timer, setTimer] = useState(null);
  const deleteRef = useRef<HTMLDivElement>();

  const hasDeletetn = !!value;

  useEffect(() => {
    inputRef.current.focus();
    onFocus(null);
  }, [value]);

  useEffect(() => {
    setRemainSpace(deleteRef.current.clientWidth);
  }, [hasDeletetn]);

  const mouseDown = () => {
    setMouseDownTime(+new Date());

    setTimer(
      setTimeout(() => {
        onClear();
        setTimer(null);
      }, throttledTime),
    );
  };

  const mouseUp = () => {
    const curTime = +new Date();
    if (mouseDownTime && curTime - mouseDownTime >= throttledTime) {
      return;
    }

    clearTimeout(timer);
    onDelete();
  };

  return (
    <>
      <i style={{ width: remainSpace }} />
      <div className={styles.inputRoot}>
        <RcTextField
          placeholder={
            placeholder || i18n.getString('dialPlaceholder', currentLocale)
          }
          value={value}
          inputProps={{
            maxLength: 30,
          }}
          fullWidth
          inputRef={inputRef}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          data-sign="numberField"
          onFocus={onFocus}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          InputProps={{
            disableUnderline: true,
            classes: {
              root: styles.root,
              input: styles.input,
            },
          }}
          autoComplete="off"
        />
      </div>
      <div className={styles.deleteIcon} ref={deleteRef}>
        {hasDeletetn && (
          <RcIconButton
            variant="plain"
            size="small"
            icon="deletenumber"
            data-sign="deleteButton"
            onMouseUp={mouseUp}
            onMouseDown={mouseDown}
          />
        )}
      </div>
    </>
  );
};
