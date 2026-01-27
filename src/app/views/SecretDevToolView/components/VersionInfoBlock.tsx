import type { AppVersion } from '@ringcentral-integration/next-integration/interfaces';
import dayjs from 'dayjs';
import React, { FC, useMemo } from 'react';

const getFormatString = (version: AppVersion | null | undefined) => {
  if (!version) return null;

  version = {
    ...version,
    buildDate: dayjs(version.buildDate).format('YYYY/MM/DD, HH:mm') as never,
  };
  return version;
};

export const VersionInfoBlock: FC<{
  title: string;
  appVersion: AppVersion | null | undefined;
}> = ({ title, appVersion }) => {
  const versionRender = useMemo(
    () => JSON.stringify(getFormatString(appVersion), null, 2),
    [appVersion],
  );

  return (
    <>
      <p>{title}</p>
      <pre>{versionRender}</pre>
    </>
  );
};
