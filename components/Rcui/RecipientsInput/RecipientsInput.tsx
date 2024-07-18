import type {
  RcBaseProps,
  RcIconButtonProps,
  RcTextFieldProps,
} from '@ringcentral/juno';
import {
  combineProps,
  RcIconButton,
  RcTextField,
  useEventCallback,
  useForkRef,
} from '@ringcentral/juno';
import { Deletenumber } from '@ringcentral/juno-icon';
import clsx from 'clsx';
import React, { forwardRef, useEffect, useRef, useState } from 'react';

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
  /** props for `deleteIcon` */
  deleteIconProps?: RcBaseProps<RcIconButtonProps, 'variant' | 'size'>;
  className?: string;
} & Omit<RcTextFieldProps, 'onChange'>;

const throttledTime = 1000;

/** @deprecated use juno RcDialTextField directly */
export const RecipientsInput = forwardRef<
  HTMLInputElement,
  RecipientsInputProps
>(
  (
    {
      placeholder,
      value,
      currentLocale,
      onChange,
      onDelete,
      onClear,
      className,
      deleteIconProps,
      ...rest
    },
    ref,
  ) => {
    const innerRef = useRef<HTMLInputElement>();

    const inputRef = useForkRef(ref, innerRef);
    // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
    const [mouseDownTime, setMouseDownTime] = useState<number>(null);
    const [timer, setTimer] = useState(null);

    const haveDeleteButton = !!value;

    const handleMouseDown = useEventCallback(() => {
      setMouseDownTime(+new Date());

      setTimer(
        // @ts-expect-error TS(2345): Argument of type 'Timeout' is not assignable to pa... Remove this comment to see the full error message
        setTimeout(() => {
          onClear();
          setTimer(null);
        }, throttledTime),
      );
    });

    const handleMouseUp = useEventCallback(() => {
      const curTime = +new Date();
      if (mouseDownTime && curTime - mouseDownTime >= throttledTime) {
        return;
      }

      // @ts-expect-error TS(2769): No overload matches this call.
      clearTimeout(timer);
      onDelete();
    });

    useEffect(() => {
      innerRef.current!.focus();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const placeholderText =
      placeholder || i18n.getString('dialPlaceholder', currentLocale);

    return (
      <div className={clsx(className, styles.inputRoot)}>
        <RcTextField
          placeholder={placeholderText}
          title={placeholderText}
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
          InputProps={{
            disableUnderline: true,
            classes: {
              root: styles.root,
              input: styles.input,
            },
            endAdornment: haveDeleteButton && (
              <RcIconButton
                color="neutral.f03"
                symbol={Deletenumber}
                data-sign="deleteButton"
                title="delete"
                {...combineProps(
                  {
                    onMouseUp: handleMouseUp,
                    onMouseDown: handleMouseDown,
                  },
                  deleteIconProps,
                )}
                variant="plain"
                size="large"
              />
            ),
          }}
          autoComplete="off"
          {...rest}
        />
      </div>
    );
  },
);
