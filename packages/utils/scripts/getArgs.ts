import yargs from 'yargs';

interface Argv {
  [k: string]: unknown;
  buildHash: string;
  brand: string[];
  excludeEntries: string[];
  tag: string;
  exportType: string;
  buildEnv: string;
  buildVersion?: string;
  appMode?: string;
  ci: boolean;
  _: (string | number)[];
  $0: string;
}

export const defaultBrand: string[] = ['rc'];
export const defaultBuildEnv = 'local';
export const defaultCI = false;
export const defaultExportType = 'diff';

export const getArgs = <T extends Record<string, unknown> = {}>(
  extraHandle?: (argv: yargs.Argv<any>) => void,
) => {
  const definition = yargs
    .default('buildHash', '')
    .default('tag', '')
    .boolean('ci')
    .array('brand')
    .array('excludeEntries')
    .default('brand', defaultBrand)
    .default('ci', defaultCI)
    .default('exportType', defaultExportType)
    .default('buildEnv', defaultBuildEnv)
    .default('buildVersion', ''); // for version control

  extraHandle?.(definition);

  const { argv } = definition as { argv: Argv };
  const buildEnv = process.env.NODE_ENV === 'test' ? 'prod' : argv.buildEnv;
  return { ...argv, buildEnv } as Argv & T;
};
