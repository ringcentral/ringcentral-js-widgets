import React from 'react';

import { palette2, styled } from '@ringcentral/juno';

import i18n from './i18n';
import styles from './styles.scss';

type TabTitleProps = {
  type: string;
  currentLocale: string;
  active?: boolean;
};

type StyledTitleProps = { $active: boolean };
const StyledTitle = styled.div<StyledTitleProps>`
  color: ${({ $active }) => $active && palette2('tab', 'selected')};
`;

export const TabTitle: React.FC<TabTitleProps> = ({
  type,
  currentLocale,
  active,
}) => {
  return (
    <StyledTitle $active={active} className={styles.tabTitle}>
      {i18n.getString(type, currentLocale)}
    </StyledTitle>
  );
};
