import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import FormattedMessage from '@ringcentral-integration/widgets/components/FormattedMessage';
import {
  RcButton,
  RcIcon,
  RcTypography,
  flexCenterStyle,
  spacing,
  styled,
} from '@ringcentral/juno';
import { DeleteCircle } from '@ringcentral/juno-icon';
import type { FunctionComponent } from 'react';
import React from 'react';

import i18n from './i18n';

const FooterHeight = '68px';
const Footer = styled.footer`
  width: 100%;
  height: ${FooterHeight};
  position: fixed;
  bottom: 0;
  ${flexCenterStyle};
  justify-content: space-evenly;
`;

const AuthenticationWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  padding-top: 179px;
  text-align: center;
  p {
    margin-top: ${spacing(1)};
    padding: 0 30px;
  }
  ${Footer} {
    height: 98px;
    flex-direction: column;
    ${RcButton} {
      margin: 0 0 20px 0;
    }
    ${RcButton}:first-child {
      width: 240px;
      height: 36px;
    }
  }
`;

type AuthenticationFailedProps = {
  onSignOut: () => void;
  onTryAgain: () => void;
  tryAgainAfterSeconds: number;
};

export const AuthenticationFailed: FunctionComponent<
  AuthenticationFailedProps
> = ({ onSignOut, onTryAgain, tryAgainAfterSeconds }) => {
  const { t } = useLocale(i18n);

  return (
    <AuthenticationWrapper data-sign="loadingArea">
      <RcIcon symbol={DeleteCircle} color="danger.f02" />
      <RcTypography variant="caption1" color="neutral.f06" align="center">
        {t('canNotAuthenticate')}
      </RcTypography>
      {!tryAgainAfterSeconds ? (
        <RcTypography variant="caption1" color="neutral.f06" align="center">
          {t('tryAgainNow')}
        </RcTypography>
      ) : (
        <RcTypography variant="caption1" color="neutral.f06" align="center">
          <FormattedMessage
            message={t('tryAgainLater')}
            values={{
              seconds: `${tryAgainAfterSeconds}`,
            }}
          />
        </RcTypography>
      )}
      <Footer>
        <RcButton
          variant="outlined"
          onClick={onTryAgain}
          size="large"
          disabled={!!tryAgainAfterSeconds}
          data-sign="tryAgain"
        >
          {t('tryBtn')}
        </RcButton>
        <RcButton
          variant="plain"
          onClick={onSignOut}
          size="large"
          data-sign="signOut"
        >
          {t('signOut')}
        </RcButton>
      </Footer>
    </AuthenticationWrapper>
  );
};
