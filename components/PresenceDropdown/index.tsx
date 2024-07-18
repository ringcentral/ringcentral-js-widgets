import { RcMenu, RcPresence, spacing, styled } from '@ringcentral/juno';
import type { FunctionComponent } from 'react';
import React, { useState } from 'react';

import { getPresenceStatusName } from '../../lib/getPresenceStatusName';

import { usePresenceItems } from './usePresenceItems';

const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: ${spacing(5)};
  z-index: 2;
  cursor: pointer;

  ${RcPresence} {
    box-sizing: content-box;
  }
`;

export type PresenceDropdownProps = {
  currentLocale: string;
  dndStatus?: string;
  userStatus?: string;
  setAvailable: (...args: any[]) => any;
  setBusy: (...args: any[]) => any;
  setDoNotDisturb: (...args: any[]) => any;
  setInvisible: (...args: any[]) => any;
  isReady: boolean;
  className?: string;
};

export const PresenceDropdown: FunctionComponent<PresenceDropdownProps> = ({
  userStatus,
  dndStatus,
  currentLocale,
  setAvailable,
  setBusy,
  setDoNotDisturb,
  setInvisible,
  isReady,
  className,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isReady) return;

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const { elements: presenceElements, selectedItem } = usePresenceItems({
    currentLocale,
    userStatus,
    dndStatus,
    onChange: (type) => {
      switch (type) {
        case 'available':
          setAvailable();
          break;
        case 'busy':
          setBusy();
          break;
        case 'DND':
          setDoNotDisturb();
          break;
        case 'offline':
          setInvisible();
          break;
        default:
          break;
      }
      handleClose();
    },
  });

  const type = selectedItem?.type;

  if (!type) {
    return null;
  }

  // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
  const title = getPresenceStatusName(userStatus, dndStatus, currentLocale);

  return (
    <Wrapper>
      <RcPresence
        role="button"
        aria-label="presence state"
        size="large"
        type={type}
        title={title}
        onClick={handleClick}
        className={className}
      />
      <RcMenu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        aria-label="choice a presence state"
      >
        {presenceElements}
      </RcMenu>
    </Wrapper>
  );
};
