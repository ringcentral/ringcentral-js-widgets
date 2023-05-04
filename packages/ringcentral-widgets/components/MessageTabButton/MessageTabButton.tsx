import React, { FunctionComponent } from 'react';

import classnames from 'classnames';

import { css, palette2, styled } from '@ringcentral/juno';

import styles from './styles.scss';

type NavigationButtonProps = {
  icon: React.ReactNode;
  active?: boolean;
  label?: string;
  noticeCounts?: number;
  width: number | string;
  onClick?: (...args: any[]) => any;
  fullSizeInk?: boolean;
};

type StyledTabProps = { $active: boolean };

const tabColor = palette2('tab', 'selected');

export const StyledTab = styled.div<StyledTabProps>`
  ${({ $active }) =>
    $active &&
    css`
      color: ${tabColor};
      border-bottom: 1px solid ${tabColor};
    `};
`;

const NavigationButton: FunctionComponent<NavigationButtonProps> = ({
  active,
  icon,
  label,
  noticeCounts,
  onClick,
  width,
  fullSizeInk,
}) => {
  let notice = null;
  if (noticeCounts && noticeCounts > 0) {
    if (noticeCounts > 99) {
      notice = (
        <div data-sign="noticeCounts" className={styles.notices}>
          99+
        </div>
      );
    } else {
      notice = (
        <div data-sign="noticeCounts" className={styles.notice}>
          {noticeCounts}
        </div>
      );
    }
  }

  return (
    <StyledTab
      onClick={onClick}
      className={classnames(
        styles.navigationButton,
        active && styles.active,
        fullSizeInk ? null : styles.linearBorder,
      )}
      $active={!!active}
      style={{
        width,
      }}
    >
      <div className={styles.iconHolder} title={label} data-sign={label}>
        <div className={styles.icon}>
          {icon} {notice}
        </div>
      </div>
    </StyledTab>
  );
};

NavigationButton.defaultProps = {
  active: false,
  label: undefined,
  noticeCounts: undefined,
  onClick: undefined,
  fullSizeInk: true,
};

export default NavigationButton;
