import {
  RcDialDelete,
  RcDialer,
  RcDialerPadSounds,
  RcDialPad,
  RcDialTextField,
  RcDialTextFieldProps,
  RcIconButton,
} from '@ringcentral/juno';
import { Deletenumber } from '@ringcentral/juno/icon';
import React, { FunctionComponent } from 'react';

import { DialerWrapper, DialPadWrapper, TextFieldWrapper } from './styles';

export type DialerProps = {
  value: string;
  setValue: (value: string) => void;
} & Pick<RcDialTextFieldProps, 'placeholder'>;

export const Dialer: FunctionComponent<DialerProps> = ({
  value,
  setValue,
  children,
  placeholder,
}) => {
  const isHaveValue = value.length > 0;

  return (
    <RcDialer>
      <DialerWrapper>
        <TextFieldWrapper isHaveValue={isHaveValue}>
          <RcDialTextField
            data-sign="numberField"
            value={value}
            textVariant="subheading1"
            align="center"
            placeholder={placeholder}
            fullWidth
            onlyAllowKeypadValue
            onChange={setValue}
            InputProps={{
              endAdornment: value.length > 0 && (
                <RcDialDelete>
                  <RcIconButton
                    symbol={Deletenumber}
                    data-sign="deleteButton"
                    color="neutral.f03"
                    title="delete"
                    variant="plain"
                    size="large"
                  />
                </RcDialDelete>
              ),
            }}
          />
        </TextFieldWrapper>
        <DialPadWrapper>
          <RcDialPad data-sign="DialPad" sounds={RcDialerPadSounds} />
        </DialPadWrapper>
        {children}
      </DialerWrapper>
    </RcDialer>
  );
};
