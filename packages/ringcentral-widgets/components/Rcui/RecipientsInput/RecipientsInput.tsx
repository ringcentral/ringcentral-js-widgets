import {
  combineProps,
  RcBaseProps,
  RcIconButton,
  RcIconButtonProps,
  RcTextField,
  RcTextFieldProps,
  useEventCallback,
} from '@ringcentral/juno';
import deletenumberSvg from '@ringcentral/juno/icon/Deletenumber';
import classNames from 'classnames';
import React, {
  forwardRef,
  useEffect,
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
  /** props for `deleteIcon` */
  deleteIconProps?: RcBaseProps<RcIconButtonProps, 'variant' | 'size'>;
  className?: string;
} & Omit<RcTextFieldProps, 'onChange'>;

const throttledTime = 1000;
// FunctionComponent<RecipientsInputProps>
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
    const defaultRef = useRef<HTMLInputElement>();
    const inputRef = ref || defaultRef;
    const [mouseDownTime, setMouseDownTime] = useState<number>(null);
    const [timer, setTimer] = useState(null);

    const haveDeleteButton = !!value;

    const handleMouseDown = useEventCallback(() => {
      setMouseDownTime(+new Date());

      setTimer(
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

      clearTimeout(timer);
      onDelete();
    });

    useEffect(() => {
      inputRef.current.focus();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

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
          InputProps={{
            disableUnderline: true,
            classes: {
              root: styles.root,
              input: styles.input,
            },
            endAdornment: haveDeleteButton && (
              <RcIconButton
                color="neutral.f03"
                symbol={deletenumberSvg}
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
