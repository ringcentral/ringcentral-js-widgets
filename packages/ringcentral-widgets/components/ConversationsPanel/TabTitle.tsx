import { palette2, styled } from '@ringcentral/juno';
import React from 'react';

import i18n, { type I18nKey } from './i18n';
import styles from './styles.scss';

type TabTitleProps = {
  type: I18nKey;
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
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    <StyledTitle $active={active} className={styles.tabTitle}>
      {i18n.getString(type, currentLocale)}
    </StyledTitle>
  );
};
