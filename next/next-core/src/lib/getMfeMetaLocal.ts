import { getMeta } from '@ringcentral/mfe-react';

export const getLocalMfeMeta = ({
  onlyVersion,
  prefix = '',
}: { onlyVersion?: boolean; prefix?: string } = {}): Record<string, string> => {
  const modules = getMeta()?.data.modules ?? {};
  return Object.entries(modules).reduce(
    (acc, [name, { dependencies, exposes, ...config }]) =>
      Object.assign(acc, {
        [`${prefix}${name}`]: onlyVersion ? config.version ?? '*' : config,
      }),
    {},
  );
};
