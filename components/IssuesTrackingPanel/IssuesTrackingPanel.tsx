import {
  RcButton,
  RcFormControlLabel,
  RcLink,
  RcSwitch,
  RcTypography,
  spacing,
  styled,
} from '@ringcentral/juno';
import React, { FunctionComponent, useEffect, useRef } from 'react';

import {
  PageHeader,
  PageHeaderBack,
  PageHeaderRemain,
  PageHeaderTitle,
} from '../BackHeader/PageHeader';
import { Tooltip } from '../Rcui/Tooltip';

import {
  IssuesTrackingCloseConfirmPanel,
  IssuesTrackingCloseConfirmPanelProps,
} from './IssuesTrackingConfirmPanel';
import i18n from './i18n';

type IssuesTrackingPanelProps = {
  currentLocale: string;
  downloading: boolean;
  enabled: boolean;
  goBack: () => void;
  toggleEnable: (checked: boolean) => void;
  downloadLog: () => Promise<void>;
  ConfirmPanelProps: IssuesTrackingCloseConfirmPanelProps;
};

const _IssuesTrackingPanel: FunctionComponent<IssuesTrackingPanelProps> = ({
  currentLocale,
  downloading,
  enabled,
  goBack,
  toggleEnable,
  downloadLog,
  ConfirmPanelProps,
  ...rest
}) => {
  const initEnabledRef = useRef(enabled);

  const downloadDisabled = !initEnabledRef.current || !enabled || downloading;

  useEffect(() => {
    // if log download failed, the button should be kept enabled.
    if (!enabled) {
      initEnabledRef.current = false;
    }
  }, [enabled]);
  return (
    <>
      <PageHeader>
        <PageHeaderBack onClick={() => goBack()} />
        <PageHeaderTitle>
          {i18n.getString('header', currentLocale)}
        </PageHeaderTitle>
        <PageHeaderRemain />
      </PageHeader>
      <main {...rest}>
        <div>
          <RcSwitch
            data-sign="issuesTrackingSwitch"
            formControlLabelProps={{
              labelPlacement: 'start',
            }}
            checked={enabled}
            onChange={(_, checked) => toggleEnable(checked)}
            label={
              <RcTypography color="action.grayDark" weight="bold">
                {i18n.getString('toggleTitle', currentLocale)}
              </RcTypography>
            }
          />
          <RcTypography color="action.grayDark">
            {i18n.getString('toggleDescription', currentLocale)}
          </RcTypography>
        </div>
        <div>
          <RcTypography color="action.grayDark" weight="bold" paragraph>
            {i18n.getString('downloadTitle', currentLocale)}
          </RcTypography>
          <Tooltip
            data-sign="downloadButtonTooltip"
            title={
              enabled
                ? i18n.getString('needLeavePage', currentLocale)
                : i18n.getString('downloadDisabledTitle', currentLocale)
            }
            tooltipForceHide={!downloadDisabled || downloading}
          >
            <div>
              <RcButton
                fullWidth
                data-sign="downloadButton"
                disabled={downloadDisabled}
                variant={downloadDisabled ? 'outlined' : 'contained'}
                radius="round"
                onClick={downloadLog}
              >
                {i18n.getString(
                  downloading ? 'downloading' : 'downloadButton',
                  currentLocale,
                )}
              </RcButton>
            </div>
          </Tooltip>
        </div>
        <div>
          <RcTypography color="action.grayDark" weight="bold">
            {i18n.getString('sendTitle', currentLocale)}
          </RcTypography>
          <RcTypography
            color="action.grayDark"
            paragraph
            data-sign="createSupportTicketDesc"
          >
            <RcLink
              href="https://support.ringcentral.com/new-case.html"
              target="_blank"
              variant="inherit"
            >
              {i18n.getString('createSupportTicket', currentLocale)}
            </RcLink>
            {i18n.getString('sendDescription', currentLocale)}
          </RcTypography>
          <RcTypography
            color="neutral.f03"
            variant="caption1"
            data-sign="privacyNoticeDesc"
          >
            {i18n.getString('privacyNotice', currentLocale)}
            <RcLink
              href="https://www.ringcentral.com/legal/last-update-september-1-2023/eulatos.html"
              target="_blank"
              variant="inherit"
            >
              {i18n.getString('privacyNoticeLink', currentLocale)}
            </RcLink>
            {i18n.getString('and', currentLocale)}
            <RcLink
              href="https://www.ringcentral.com/legal/privacy-notice.html"
              target="_blank"
              variant="inherit"
            >
              {i18n.getString('privacyNoticeEnd', currentLocale)}
            </RcLink>
          </RcTypography>
        </div>
      </main>
      <IssuesTrackingCloseConfirmPanel {...ConfirmPanelProps} />
    </>
  );
};

export const IssuesTrackingPanel = styled(_IssuesTrackingPanel)`
  padding: ${spacing(4, 5)};
  display: flex;
  flex-direction: column;
  gap: ${spacing(6)};
  overflow: auto;

  ${RcFormControlLabel} {
    margin: ${spacing(-3, 0, -1, 0)};
    width: 100%;
    justify-content: space-between;

    ${RcSwitch} {
      margin-right: 0;
    }
  }
`;
