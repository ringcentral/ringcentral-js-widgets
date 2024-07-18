import {
  RcDialer,
  RcDialerPadSoundsMPEG,
  RcDialPad,
  RcDialTextField,
  RcIconButton,
  RcPaper,
  RcTooltip,
} from '@ringcentral/juno';
import { Close, Keypad } from '@ringcentral/juno-icon';
import type { FunctionComponent } from 'react';
import React, { useState } from 'react';

import i18n from './i18n';
import {
  Backdrop,
  Footer,
  KeyPadCloseButton,
  StyledCollapse,
  Wrapper,
} from './styles/KeyPadWrapper';

type keypadProps = {
  currentLocale: string;
  isKeypadOpen?: boolean;
  keypadValue?: string;
  setKeypadValue?: (value: string) => void;
  setKeypadIsOpen?: (status: boolean) => void;
};

export const KeypadCollapse: FunctionComponent<keypadProps> = ({
  currentLocale,
  isKeypadOpen,
  keypadValue,
  setKeypadValue,
  setKeypadIsOpen,
}) => {
  const [keypadOpenHover, setkeypadOpenHover] = useState(false);
  const [forceToolTipHide, setForceToolTipHide] = useState(false);
  return (
    <Wrapper open={isKeypadOpen}>
      <Backdrop open={isKeypadOpen} data-sign="keypadGreyBackground" />
      <StyledCollapse
        in={isKeypadOpen}
        collapsedHeight="32px"
        open={isKeypadOpen}
        onEnter={() => {
          setForceToolTipHide(true);
        }}
        onExited={() => {
          setForceToolTipHide(false);
        }}
      >
        <RcPaper elevation={0}>
          {isKeypadOpen ? (
            <KeyPadCloseButton>
              <RcIconButton
                data-sign="keypadCloseButton"
                variant="plain"
                size="medium"
                symbol={Close}
                title={i18n.getString('close', currentLocale)}
                onClick={() => {
                  setKeypadIsOpen(false);
                  setkeypadOpenHover(false);
                }}
              />
            </KeyPadCloseButton>
          ) : (
            <RcTooltip
              placement="top"
              title={i18n.getString('keypad', currentLocale)}
              open={keypadOpenHover}
              tooltipForceHide={forceToolTipHide}
            >
              <Footer
                onClick={() => {
                  if (!isKeypadOpen) {
                    setKeypadIsOpen(true);
                  }
                }}
                onMouseOver={() => {
                  if (!isKeypadOpen) {
                    setkeypadOpenHover(true);
                  }
                }}
                onMouseLeave={() => {
                  setkeypadOpenHover(false);
                }}
                keypadOpenHover={keypadOpenHover}
                open={isKeypadOpen}
                data-sign="keypadOpenButton"
              >
                <RcIconButton variant="plain" size="small" symbol={Keypad} />
              </Footer>
            </RcTooltip>
          )}
          <RcDialer>
            {isKeypadOpen && (
              <RcDialTextField
                data-sign="keypadTextField"
                value={keypadValue}
                align="center"
                textVariant="subheading1"
                fullWidth
                onlyAllowKeypadValue
                onChange={setKeypadValue}
                autoFocus={isKeypadOpen}
                keypadMode
                onKeyDown={(e) => {
                  if (
                    e.key === 'Backspace' ||
                    e.key === '-' ||
                    e.key === '\\'
                  ) {
                    e.preventDefault();
                  }
                }}
              />
            )}
            <RcDialPad
              sounds={RcDialerPadSoundsMPEG}
              data-sign="keypadCollapse"
            />
          </RcDialer>
        </RcPaper>
      </StyledCollapse>
    </Wrapper>
  );
};
