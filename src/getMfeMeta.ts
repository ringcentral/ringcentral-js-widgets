import { getMeta } from '@ringcentral/mfe-react';
import type { Dependency } from '@ringcentral/mfe-shared';

export const getMfeDeps = (): Record<
  string,
  {
    version: string;
    entry: string;
  }
> => {
  const meta = getMeta();
  if (!meta?.data.main) return {};
  const name = meta.data.main;
  const modules = meta.data.modules ?? {};
  return modules[name]?.dependencies ?? {};
};

type MfeModules = Record<
  string,
  {
    version: string;
    entry: string;
    exposes: Record<string, string>;
    dependencies: Record<string, Dependency>;
  }
>;

/**
 * Get MFE meta data from the current app shell.
 *
 * @param options
 * @returns
 */
export const getMfeMeta = ({
  onlyVersion,
  prefix = '',
}: { onlyVersion?: boolean; prefix?: string } = {}) => {
  const name = getMeta()?.data.main;
  if (!name) return {};
  const modules = ((getMeta()?.data.modules ?? {})[name]?.dependencies ??
    {}) as MfeModules;
  return Object.entries(modules).reduce(
    (acc, [name, { dependencies, exposes, ...config }]) =>
      Object.assign(acc, {
        [`${prefix}${name}`]: onlyVersion ? config.version ?? '*' : config,
      }),
    {},
  );
};
