import { useModalItemView } from '@ringcentral-integration/micro-core/src/app/views';
import { Link } from '@ringcentral/spring-ui';
import React from 'react';

import { t } from '../i18n';

import type { TCRNumberModalPayload } from './TCRNumberModal.view.interface';

const REGISTER_TCR_URL = 'https://login.ringcentral.com/';

type NumberGroupProps = {
  label: string;
  description: string;
  numbers?: string[];
  dataSign: string;
};

const NumberGroup = ({
  label,
  description,
  numbers,
  dataSign,
}: NumberGroupProps) => {
  if (!numbers || numbers.length === 0) {
    return null;
  }

  return (
    <div data-sign={dataSign} className="mt-3">
      <div>
        <strong>{label}</strong> ({description}):
      </div>
      <div className="mt-0.5">
        {numbers.map((number) => (
          <div data-sign="tcrNumberPermissionNumber" key={number}>
            {number}
          </div>
        ))}
      </div>
    </div>
  );
};

const ReceiveOnlyDescription = ({
  isAdminUser,
}: Pick<TCRNumberModalPayload, 'isAdminUser'>) => {
  return (
    <>
      <div>{t('tcrReceiveOnlyDescription')}</div>
      <div>
        {isAdminUser ? (
          <>
            {t('tcrReceiveOnlyAdminAction')}
            <br />
            <Link href={REGISTER_TCR_URL} target="_blank" variant="primary">
              {t('registerNow')}
            </Link>
          </>
        ) : (
          t('tcrReceiveOnlyNonAdminAction')
        )}
      </div>
    </>
  );
};

export const TCRNumberModalPanel = () => {
  const {
    props: { payload },
  } = useModalItemView<TCRNumberModalPayload>();

  if (!payload) {
    return null;
  }

  const showNumberList = payload.type === 'mixed';
  const description =
    payload.type === 'receiveOnlyNumber' ? (
      <ReceiveOnlyDescription isAdminUser={payload.isAdminUser} />
    ) : (
      t('tcrImportantChangesDescription')
    );

  return (
    <div className="typography-mainText text-neutral-b1 overflow-auto">
      <div>{description}</div>
      {showNumberList ? (
        <div className="mt-4" data-sign="tcrNumberPermissionList">
          <div className="font-bold">{t('tcrPermissionListTitle')}</div>
          <NumberGroup
            dataSign="tcrFullyRegisteredNumbers"
            label={t('tcrFullyRegistered')}
            description={t('tcrSendReceive')}
            numbers={payload.fullyRegisteredNumbers}
          />
          <NumberGroup
            dataSign="tcrInboundOnlyNumbers"
            label={t('tcrInboundOnly')}
            description={t('tcrReceiveOnly')}
            numbers={payload.inboundOnlyNumbers}
          />
          <NumberGroup
            dataSign="tcrNotRegisteredNumbers"
            label={t('tcrNotRegistered')}
            description={t('tcrTextingUnavailable')}
            numbers={payload.notRegisteredNumbers}
          />
        </div>
      ) : null}
    </div>
  );
};
