/* eslint-disable no-console */

/* eslint-disable @typescript-eslint/no-var-requires */
import type {
  BaseAppConfig,
  EnvironmentType,
} from '@ringcentral-integration/next-integration/interfaces';
import { getArgs } from '@ringcentral-integration/next-integration/lib/getArgs';
import Table from 'cli-table';
import fs from 'fs-extra';
import os from 'os';
import path from 'path';

export type Mode = 'development' | 'production';

const defaultMode = 'development';
const defaultPort = 8080;

const {
  ci,
  buildEnv,
  brand: [brand],
  pages,
  excludePages,
} = getArgs();

type ProjectPages = {
  /**
   * html file entry
   */
  index?: string;
  /**
   * script file entry
   */
  main: string;
  /**
   * filename for webpack output in `production` mode
   * https://webpack.js.org/configuration/output/#output-filename
   *
   * by default, it will use the `[name].js` of main entry,
   *
   * if you have set `index` html page, it will use `[name]-[contenthash].js`
   *
   * if you not want default behavior, you can set it manually
   */
  filename?: string;
  /**
   * some comment for this entry page, like filename reason, use is some where
   */
  description?: string;
  // * more with HtmlWebpackPlugin.Options
  /**
   * extra params for HtmlWebpackPlugin of this page entry
   */
  params?: {
    /**
     * List all entries which should be injected
     */
    chunks?: 'all' | string[];
    /**
     * List all entries which should not be injected
     */
    excludeChunks?: string[];
  };
} & { [key: string]: string };

interface BaseEnvironmentConfig {
  /**
   * build mode for webpack
   * https://webpack.js.org/configuration/mode/
   */
  mode: Mode;
  /**
   * use devtool for webpack
   */
  useDevtool?: boolean;
  /**
   * preferred devtool for webpack
   * https://webpack.js.org/configuration/devtool/
   */
  preferredDevtool?: string;
  /**
   * enable style transform for shared worker mode
   */
  useStyleTransform?: boolean;
}

interface EnvironmentConfig extends BaseEnvironmentConfig {
  /**
   * brand code
   */
  brand: (string | [string, BaseEnvironmentConfig])[];
}

interface ProjectConfigFileSchema {
  /**
   * build path with webpack
   * https://webpack.js.org/configuration/output/
   */
  buildPath: string;
  /**
   * distribution path
   */
  distPath?: string;
  /**
   * pages for webpack entry config
   */
  pages: ProjectPages[];
  /**
   * chunk filename for webpack, in `production` mode
   *
   * This option determines the name of non-initial chunk files.
   *
   * @default "[id]-[contenthash].js"
   *
   * you can use map to set different chunk filename for different files
   * @example
   * ```json
   * "chunkFilenames": {
   *   "worker": "[name].js",
   *   "dynamic": "[name]-[contenthash].js"
   *   "vendor": "[name]-[contenthash].js" // all vendor will use this filename
   * }
   * ```
   *
   * https://webpack.js.org/configuration/output/#outputchunkfilename
   */
  chunkFilenames?: string | Record<string, string>;
  /**
   * assets path for webpack copy plugin
   */
  assets?: (string | { from: string; to: string })[];
  /**
   * environment config with build mode and brand
   */
  environment: Record<EnvironmentType, EnvironmentConfig>;
  /**
   * app config path
   */
  appConfigPath: string;
  /**
   * theme path
   */
  themePath?: string;
  /**
   * dev server port for webpack dev server
   * https://webpack.js.org/configuration/dev-server/
   */
  devServerPort: number;
  /**
   * runtime environment
   *
   * - `web` for web application
   * - `extension` for extension application
   *
   * @default web
   */
  runtimeEnvironment?: 'web' | 'extension';
  /**
   * by default, our builder will split chunks for all entries `node_modules` and `ringcentral-js-widgets`, to ensure file size is smaller than 10MB
   *
   * if you not want that behavior, you can set `disabledAutoSplitChunks` to `true`
   *
   * @default false
   */
  disabledAutoSplitChunks?: boolean;
  /**
   * include upgrade page
   *
   * file name: `{host_domain}/upgrade.html`
   *
   * enable this will include upgrade page in final build folder,
   * then you can use it when your iframe app need user reload page manually
   *
   * @example
   * ```ts
   * location.href = 'https://your-app.com/upgrade.html'
   * ```
   */
  includeUpgradePage?: boolean;
  /**
   * include hidden-download page
   *
   * file name: `{host_domain}/hidden-download.html`
   *
   * enable this will include hidden-download page in final build folder,
   * then you can `downloadFileWithIframeCors` when you need download file in hidden way but need to avoid same origin policy
   *
   * @example
   * ```ts
   * location.href = 'https://your-app.com/hidden-download.html'
   * ```
   */
  includeHiddenDownloadPage?: boolean;
  /**
   * which styled system to use
   *
   * @default 'juno'
   */
  themeSystem?: 'juno' | 'spring-ui';
}

export type ProjectConfig<T = BaseAppConfig> = {
  env: string;
  brand: string;
  projectConfig: ProjectConfigFileSchema;
  assetsEntries?: {
    from: string;
    to: string;
  }[];
  mainEntries: {
    [key: string]: string;
  };
  buildPath: string;
  distPath?: string;
  appConfig: T;
  mode: Mode;
  rootPath: string;
  themePath: string;
  devServerPort: number;
  /**
   * use devtool for webpack
   */
  useDevtool?: boolean;
  /**
   * preferred devtool for webpack
   */
  preferredDevtool?: string;
  /**
   * analyze bundle with webpack-bundle-analyzer
   */
  analyzeBundle?: boolean;
  /**
   * enable style transform for shared worker mode
   */
  useStyleTransform?: boolean;
} & Pick<ProjectConfigFileSchema, 'runtimeEnvironment' | 'themeSystem'>;

export const getRawProjectConfig = (rootPath = process.cwd()) => {
  const projectConfigPath = path.resolve(rootPath, './project.config.json');
  const projectConfigFileSchema: ProjectConfigFileSchema =
    fs.readJSONSync(projectConfigPath);
  return projectConfigFileSchema;
};

export const getBrands = (env: string) => {
  const projectConfig = getRawProjectConfig();
  const environmentConfig = projectConfig.environment[env as EnvironmentType];
  if (!environmentConfig) {
    throw new Error(`There is no config with "${env}" environment`);
  }
  return environmentConfig.brand.map((brand) =>
    Array.isArray(brand) ? brand[0] : brand,
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultPrint = (projectConfig: ProjectConfig<any>) => {
  const { ci, buildHash, tag, brand, buildEnv, appMode } = getArgs();
  const table = new Table({
    head: ['Config', 'Value', 'Type'],
  });

  table.push(
    ['Build Environment', `${buildEnv}`, `string (optional, default: 'dev')`],
    ['Brand', `${brand}`, `string (optional, default: 'rc')`],
    ['CI', `${ci}`, 'boolean (optional, default: false)'],
    ['Build Hash', `${buildHash}`, `string (optional, default: '')`],
    ['Tag', `${tag}`, `string (optional, default: '')`],
    ['Build Mode', `${projectConfig.mode}`, `'development' | 'production'`],
    ['App Mode', `${appMode}`, `string (optional)`],
    [
      'Use Devtool',
      `${projectConfig.useDevtool ?? ''}`,
      `boolean (optional, default: false)`,
    ],
    [
      'Preferred Devtool',
      `${projectConfig.preferredDevtool ?? ''}`,
      `string (optional)`,
    ],
    [
      'MFE Config',
      `${
        getArgs().env === 'mfe'
          ? JSON.stringify(
              (projectConfig.appConfig as BaseAppConfig).mfeConfig ?? '',
              null,
              2,
            )
          : ''
      }`,
      `object (default: '')`,
    ],
    ['Entries', `${Object.keys(projectConfig.mainEntries).join(os.EOL)}`, ``],
  );
  console.log(`${os.EOL}${table.toString()}${os.EOL}`);
};

/**
 * get project configuration from project.config.json
 * @param rootPath folder root path
 * @param print print function for custom print
 * @returns
 */
export const getProjectConfig = <T = BaseAppConfig>(
  rootPath = process.cwd(),
  print: false | ((config: ProjectConfig<T>) => void) = defaultPrint,
): ProjectConfig<T> => {
  const projectConfigFileSchema = getRawProjectConfig(rootPath);
  const appConfigPath = path.resolve(
    rootPath,
    projectConfigFileSchema.appConfigPath ?? './config',
  );
  const appConfig = require(appConfigPath).appConfig as T;
  if (!appConfig) {
    throw new Error(`appConfig is not defined in ${appConfigPath}`);
  }
  const environment = getBuildEnv(projectConfigFileSchema);
  const { brand: brands, ...config } = environment[buildEnv as EnvironmentType];
  const envConfig = brands
    .map((item) => ({
      brand: Array.isArray(item) ? item[0] : item,
      ...config,
      ...(Array.isArray(item) ? item[1] : {}),
      mode: (Array.isArray(item) ? item[1].mode : config.mode) ?? defaultMode,
    }))
    .filter((item) => item.brand === brand)[0];

  if (!envConfig) {
    throw new Error(`brand '${brand}' is not defined in env '${buildEnv}'`);
  }

  const { mode = defaultMode } = envConfig;

  const assetsEntries = projectConfigFileSchema.assets?.map((asset) => {
    if (typeof asset === 'string') {
      const fromPath = path.join(rootPath, asset);

      return {
        from: fromPath,
        to: path.relative(path.join(rootPath, 'src'), fromPath),
      };
    }

    const fromPath = path.join(rootPath, asset.from);

    return {
      from: fromPath,
      to: asset.to,
    };
  });

  projectConfigFileSchema.pages.push(
    ...(projectConfigFileSchema.includeUpgradePage
      ? [
          {
            main: path.join(__dirname, 'templates/upgrade/upgrade.ts'),
            index: path.join(__dirname, 'templates/upgrade/upgrade.html'),
          },
        ]
      : []),
    ...(projectConfigFileSchema.includeHiddenDownloadPage
      ? [
          {
            main: path.join(
              __dirname,
              'templates/hidden-download/hidden-download.ts',
            ),
            index: path.join(
              __dirname,
              'templates/hidden-download/hidden-download.html',
            ),
          },
        ]
      : []),
  );

  // when pages is set, only include the pages in the list
  if (pages && pages.length > 0) {
    const originalPages = projectConfigFileSchema.pages;
    projectConfigFileSchema.pages = originalPages.filter((page) =>
      pages.includes(path.parse(page.main).name),
    );

    if (projectConfigFileSchema.pages.length !== pages.length) {
      console.log(
        `
Some pages not found in project.config.json:
your input page: ${pages.join(', ')}

pages list: ${originalPages
          .map((page) => path.parse(page.main).name)
          .join(', ')}
`,
      );

      process.exit(1);
    }
  }

  if (excludePages && excludePages.length > 0) {
    projectConfigFileSchema.pages = projectConfigFileSchema.pages.filter(
      (page) => !excludePages.includes(path.parse(page.main).name),
    );
  }

  const mainEntries = projectConfigFileSchema.pages.reduce((acc, curr) => {
    const entryName = path
      .basename(curr.main)
      .split('.')
      .slice(0, -1)
      .join('.');

    acc[entryName] = path.resolve(rootPath, curr.main);

    return acc;
  }, {} as { [key: string]: string });

  const distPath = projectConfigFileSchema.distPath
    ? path.resolve(rootPath, projectConfigFileSchema.distPath)
    : undefined;
  const buildPath = path.resolve(rootPath, projectConfigFileSchema.buildPath);
  const themePath = path.resolve(
    rootPath,
    projectConfigFileSchema.themePath ?? '.',
  );
  const projectConfig: ProjectConfig<T> = {
    env: buildEnv,
    brand,
    projectConfig: projectConfigFileSchema,
    assetsEntries,
    mainEntries,
    distPath,
    buildPath,
    appConfig,
    mode: ci ? defaultMode : mode,
    devServerPort: projectConfigFileSchema.devServerPort ?? defaultPort,
    rootPath,
    themePath,
    preferredDevtool: envConfig.preferredDevtool,
    useDevtool: envConfig.useDevtool,
    useStyleTransform: envConfig.useStyleTransform,
    runtimeEnvironment: projectConfigFileSchema.runtimeEnvironment,
    themeSystem: projectConfigFileSchema.themeSystem,
  };

  if (print) {
    print(projectConfig);
  }
  return projectConfig;
};

export function getBuildEnv(projectConfigFileSchema: ProjectConfigFileSchema) {
  const environment = projectConfigFileSchema.environment ?? {};
  if (!environment[buildEnv as EnvironmentType]) {
    throw new Error(
      `env '${buildEnv}' is not defined in environment '${JSON.stringify(
        environment,
        null,
        2,
      )}'`,
    );
  }
  return environment;
}
