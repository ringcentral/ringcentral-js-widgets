import { useAppFooter } from '@ringcentral-integration/micro-core/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { ArrowRightMd, CopyMd } from '@ringcentral/spring-icon';
import { Button, Icon } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { FunctionComponent } from 'react';

import type { WelcomePanelProp } from '../Welcome.view.interface';

import i18n from './i18n';

const Skeleton = () => (
  <div
    role="status"
    // total be 25px, same as the line-height of typography-title
    className="my-[6.5px] h-3 bg-neutral-b0/10 rounded-full animate-pulse"
  />
);

export const WelcomePanel: FunctionComponent<WelcomePanelProp> = ({
  logoUrl,
  onGetStart,
  onCopy,
  infos = [],
  userName,
}) => {
  const { t } = useLocale(i18n);

  // use AppFooter for toast position calculation
  const { footer } = useAppFooter({
    defaultFooter: (
      <div className="flex-none p-4">
        <Button
          color="primary"
          size="xlarge"
          className="rounded-2xl"
          variant="contained"
          onClick={onGetStart}
          data-sign="startButton"
          fullWidth
        >
          {t('getStart')}

          <Icon symbol={ArrowRightMd} size="large" className="ml-2" />
        </Button>
      </div>
    ),
    additionalFooterHeight: -16,
  });

  return (
    <div className="size-full flex flex-col overflow-hidden">
      <div className="px-4 overflow-auto">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="mt-10">
            <img src={logoUrl} alt="logo" className="h-[26px]" />
          </div>

          {/* Welcome Text */}
          <div className="mt-6 mb-4">
            <h1 className="text-2xl typography-mainText mb-4">
              {t('welcome', { name: userName || '' })}
            </h1>
            <p className="text-neutral-b2 typography-subtitle">
              {t('accountReady')}
            </p>
          </div>
        </div>

        {/* Information Cards */}
        <div className="space-y-3 mb-3">
          {infos.map((info, index) => {
            if ('loading' in info) {
              return (
                <div
                  key={index}
                  className="h-[110px] bg-neutral-b0/10 rounded-3xl animate-pulse"
                />
              );
            }

            return (
              <div
                key={index}
                className={clsx(
                  info.bgColor,
                  'rounded-3xl flex items-center h-[110px]',
                )}
                data-sign={info.title}
              >
                <Icon
                  symbol={info.icon}
                  size="xlarge"
                  className={clsx(info.iconColor, 'px-6')}
                />
                <div className="text-neutral-b0 space-y-1">
                  <div className="typography-subtitle text-neutral-b2">
                    {info.title}:
                  </div>
                  {info.mainText ? (
                    <div className="typography-title">{info.mainText}</div>
                  ) : (
                    <Skeleton />
                  )}
                  {info.subText ? (
                    <div className="typography-title">{info.subText}</div>
                  ) : // only when be empty should show the loading effect
                  info.subText === '' ? (
                    <Skeleton />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {/* Copy Numbers Link */}
        <div>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            startIcon={<Icon symbol={CopyMd} size="small" />}
            onClick={onCopy}
          >
            {t('copy')}
          </Button>
        </div>
      </div>
      <i className="flex-auto" />
      {footer}
    </div>
  );
};
