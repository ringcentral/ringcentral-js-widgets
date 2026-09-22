import { processI18n } from '@ringcentral-integration/i18n/lib/processI18n';
import type { BaseAppConfig } from '@ringcentral-integration/next-integration/interfaces';
import { getArgs } from '@ringcentral-integration/next-integration/lib/getArgs';
import { getBaseWebpackConfig as getWebpackConfig } from '@ringcentral-integration/widgets/lib/getBaseWebpackConfig';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import fs from 'fs-extra';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import template from 'lodash/template';
import path from 'path';
import * as nodeUrl from 'url';
import {
  AssetInfo,
  type Chunk,
  DefinePlugin,
  NormalModuleReplacementPlugin,
  ProvidePlugin,
} from 'webpack';
import { merge } from 'webpack-merge';

import { getFilenameMap as getFileUrlMap } from './getFilenameMap';
import { getPrimaryColor } from './getPrimaryColor';
import type { ProjectConfig } from './getProjectConfig';
import {
  getLoadWorkerTemplate,
  type LoadWorkerTemplateOptions,
} from './scriptsLoadFail/getLoadWorkerTemplate';
import { getScriptsLoadFailTemplate } from './scriptsLoadFail/getScriptsLoadFailTemplate';
import { getThemeInjectTemplate } from './themeInject/getThemeInjectTemplate';

export { merge } from 'webpack-merge';

const DEFAULT_FILENAME = '[name].js';
// * only contenthash is supported in worker build
const DEFAULT_CHUNK_FILENAME = '[id]-[contenthash].js';
/**
 * default vendor chunk name
 */
const VENDOR_KEY = 'vendor';
const reactantPackageAlias = {
  './node_modules/tslib/tslib.es6.js$': require.resolve('tslib/tslib.es6.js'),
  '../node_modules/tslib/tslib.es6.js$': require.resolve('tslib/tslib.es6.js'),
  './node_modules/redux-persist/es/integration/react.js$':
    require.resolve('redux-persist/es/integration/react'),
};
const reactantPreservedModuleReplacementPlugins = [
  new NormalModuleReplacementPlugin(
    /(?:^|\/)node_modules\/tslib\/tslib\.es6\.js$/,
    require.resolve('tslib/tslib.es6.js'),
  ),
  new NormalModuleReplacementPlugin(
    /(?:^|\/)node_modules\/redux-persist\/es\/integration\/react\.js$/,
    require.resolve('redux-persist/es/integration/react'),
  ),
];

export interface WebpackConfigOptions<T extends BaseAppConfig> {
  projectConfig: ProjectConfig<T>;
  devServer?: boolean;
  analyzeBundle?: boolean;
  templateParameters?: HtmlWebpackPlugin.Options['templateParameters'];
  /**
   * if you need always output as prod mode, you can set this option, that will make your output file always use prod mode(code still be development)
   *
   * that will be useful when you need to debug service worker
   */
  outputAlwaysUseProdFileName?: boolean;
  publicPath?: string;
  /**
   * block pendo remote js code, so 'pendo.js' will not be loaded. False by default
   */
  blockPendoSourceCode?: boolean;
  /**
   * block analytics remote js code, so 'analytics.min.js' will not be loaded. False by default
   */
  blockSegmentSourceCode?: boolean;
}

export const getFinalFilePathMap = <T extends BaseAppConfig>(
  projectConfig: ProjectConfig<T>,
) => {
  const filenameMap = projectConfig.projectConfig.pages.reduce(
    (acc, { main, index, filename }) => {
      const chunkName = path.parse(main).name;
      acc[chunkName] =
        filename ??
        // when have index page, use contenthash to avoid cache, because that always use index.html cache mechanism, once index.html be update will get all new js entry
        // others always want original name, that may load manually
        (index ? '[name]-[contenthash].js' : DEFAULT_FILENAME);

      return acc;
    },
    {} as Record<string, string>,
  );

  return filenameMap;
};

const args = getArgs();

export const getBaseWebpackConfig = <T extends BaseAppConfig>({
  projectConfig,
  devServer,
  analyzeBundle = !!args.analyze,
  templateParameters,
  outputAlwaysUseProdFileName,
  publicPath,
  blockSegmentSourceCode = false,
  blockPendoSourceCode = false,
}: WebpackConfigOptions<T>) => {
  const {
    mode,
    appConfig,
    themeSystem = 'juno',
    runtimeEnvironment = 'web',
  } = projectConfig;
  const defaultLocale = appConfig.brandConfig.defaultLocale ?? 'en-US';

  const customEntryUrl = fs
    .readFileSync(path.join(__dirname, './templates/customEntryUrl.js'))
    .toString();

  const loading = fs
    .readFileSync(path.join(__dirname, 'templates/loading.html'))
    .toString();

  const loadingSpring = fs
    .readFileSync(path.join(__dirname, 'templates/loading-spring.html'))
    .toString();

  const meta = fs
    .readFileSync(path.join(__dirname, 'templates/meta.html'))
    .toString();

  const isExtension = runtimeEnvironment === 'extension';
  const font = fs
    .readFileSync(
      path.join(
        __dirname,
        isExtension ? 'templates/font-extension.html' : 'templates/font.html',
      ),
    )
    .toString();

  const fontSpring = fs
    .readFileSync(
      path.join(
        __dirname,
        isExtension
          ? 'templates/font-spring-extension.html'
          : 'templates/font-spring.html',
      ),
    )
    .toString();

  const primaryColor = template(
    fs
      .readFileSync(path.join(__dirname, 'templates/primary-color.html'))
      .toString(),
  )({
    primaryColor: getPrimaryColor(appConfig.brandConfig).foreground,
  });

  const preferredDevtool = (() => {
    if (isExtension)
      return (
        projectConfig.preferredDevtool ||
        // in development mode, use inline-source-map, content script not able to load .map file,
        // in production mode, use source-map for separate source map file adn upload to sentry
        (mode === 'development' ? 'inline-source-map' : 'source-map')
      );

    return projectConfig.preferredDevtool;
  })();

  const chunkLocale = (() => {
    return isExtension
      ? // not chunk i18n files, because we need to load all i18n files in content script, and also chrome extension not need lazy load
        false
      : (local: string) => {
          return local !== defaultLocale;
        };
  })();

  const baseConfig = getWebpackConfig({
    mode,
    useThreadLoader: true,
    themeFolder: projectConfig.themePath,
    supportedLocales: projectConfig.appConfig.brandConfig
      .supportedLocales as string[],
    useDevtool: projectConfig.useDevtool,
    preferredDevtool,
    analyzeBundle,
    chunkLocale,
    useStyleTransform: projectConfig.useStyleTransform,
    hashPrefix: projectConfig.appConfig.hashPrefix,
    env: args.buildEnv,
  });

  const chunkInfoMap = new Map<string, AssetInfo>();
  const isProd = projectConfig.mode === 'production';
  // In MFE mode, exported files are typically split separately.
  const outputUsePropsMode = isProd || outputAlwaysUseProdFileName;

  const developmentConfig = merge(baseConfig, {
    entry: { ...projectConfig.mainEntries },
    resolve: {
      // Reactant 0.150.0 preserved-module ESM currently references a few
      // package-internal relative paths that webpack cannot resolve from consumers.
      alias: reactantPackageAlias,
    },
    output: {
      path: path.join(
        projectConfig.buildPath,
        projectConfig.appConfig.brandConfig.code,
      ),
      filename: DEFAULT_FILENAME,
      clean: true,
      publicPath: publicPath ?? 'auto',
    },
    plugins: [
      // TODO: use @babel/plugin-transform-react-jsx
      new ProvidePlugin({
        React: 'react',
      }),
      ...reactantPreservedModuleReplacementPlugins,
      ...(projectConfig.assetsEntries?.length
        ? [
            new CopyWebpackPlugin({
              patterns: projectConfig.assetsEntries,
            }),
          ]
        : []),
      new DefinePlugin({
        'process.env.APP_CONFIG': JSON.stringify({
          ...appConfig,
          brandConfig: appConfig.brandConfig,
        }),
        'process.env.THEME_SYSTEM': JSON.stringify(themeSystem),
        'process.env.BLOCK_PENDO_SOURCE_CODE':
          JSON.stringify(blockPendoSourceCode),
        'process.env.BLOCK_SEGMENT_SOURCE_CODE': JSON.stringify(
          blockSegmentSourceCode,
        ),
      }),
      ...projectConfig.projectConfig.pages
        .filter((x) => !!x.index)
        .map(({ index, params, main }) => {
          const mainChunk = path.parse(main).name;

          return new HtmlWebpackPlugin({
            filename: path.basename(index!),
            template: index,
            chunks: [mainChunk],
            ...params,
            templateParameters: (compilation, assets, assetTags, options) => {
              const fileUrlMap = getFileUrlMap(compilation, chunkInfoMap);

              const getChunkUrl = (chunkName: string) => {
                if (!outputUsePropsMode) return `${chunkName}.js`;

                const url = fileUrlMap?.get(chunkName);
                if (!url) {
                  throw new Error(`chunk "${chunkName}" url not found`);
                }

                return nodeUrl.resolve(publicPath ?? '', url);
              };

              const workerScript = (
                nameSpace = '__rc_shared_worker__',
                chunkName = 'worker',
                queryString = '',
                options?: LoadWorkerTemplateOptions,
              ): string => {
                const workerUrl = `${getChunkUrl(chunkName)}${queryString}`;
                const mfeConfig =
                  // TODO: fix type
                  //@ts-ignore
                  projectConfig.appConfig.mfeConfig;
                return getLoadWorkerTemplate(
                  nameSpace,
                  workerUrl,
                  chunkName,
                  mfeConfig ? JSON.stringify(mfeConfig) : '',
                  options,
                );
              };

              const formattedBrandConfig = processI18n<
                BaseAppConfig['brandConfig']
              >(projectConfig.appConfig.brandConfig, defaultLocale);
              const { appName } = formattedBrandConfig;

              return {
                // #region default templateParameters
                compilation: compilation,
                webpackConfig: compilation.options,
                htmlWebpackPlugin: {
                  tags: assetTags,
                  files: assets,
                  options: options,
                },
                //#endregion
                appName,
                meta,
                font,
                fontSpring,
                primaryColor,
                loading,
                loadingSpring,
                getChunkUrl,
                workerScript,
                themeInject: getThemeInjectTemplate(
                  appConfig.brandConfig.code as any,
                ),
                /**
                 * support custom entry for we can test preview env in production env
                 */
                customEntryUrl: `<script>${customEntryUrl}</script>`,
                inlineScriptsLoadFailDetect: getScriptsLoadFailTemplate,
                ...templateParameters,
              };
            },
            minify: isProd
              ? {
                  // https://github.com/kangax/html-minifier#options-quick-reference
                  // default minify options with HTMLWebpackPlugin
                  // https://github.com/jantimon/html-webpack-plugin#minification
                  collapseWhitespace: true,
                  keepClosingSlash: true,
                  removeComments: true,
                  removeRedundantAttributes: true,
                  removeScriptTypeAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  useShortDoctype: true,
                  // minify inline index.html css and scripts
                  minifyCSS: true,
                  minifyJS: true,
                }
              : 'auto',
          });
        }),
    ],
  });

  if (outputUsePropsMode) {
    const filenameMap = getFinalFilePathMap(projectConfig);
    const chunkFilenames = projectConfig.projectConfig.chunkFilenames;
    // MFE with module federation should not use splitChunks
    // issue: https://github.com/module-federation/module-federation-examples/issues/692
    const enabledAutoSplitChunks =
      projectConfig.projectConfig.disabledAutoSplitChunks !== true &&
      args.env !== 'mfe';
    if (
      args.env === 'mfe' &&
      projectConfig.projectConfig.disabledAutoSplitChunks === false
    ) {
      throw new Error('MFE with module federation should not use splitChunks');
    }

    const isString = typeof chunkFilenames === 'string';
    const vendorFilename =
      (isString ? chunkFilenames : chunkFilenames?.[VENDOR_KEY]) ||
      DEFAULT_CHUNK_FILENAME;

    const cacheGroups: Record<
      string,
      { test: RegExp; filename: string; reuseExistingChunk: boolean }
    > = {
      vendor: {
        // import file path containing node_modules
        test: /[\\/]node_modules[\\/]/,
        filename: `modules-${vendorFilename}`, // Ensure hash is included
        reuseExistingChunk: true,
      },
      commons: {
        // import file path containing ringcentral-js-widgets
        test: /[\\/]ringcentral-js-widgets[\\/]/,
        filename: `commons-${vendorFilename}`, // Ensure hash is included
        reuseExistingChunk: true,
      },
    };

    if (enabledAutoSplitChunks) {
      // find all pure entry files
      const pureEntryFiles = projectConfig.projectConfig.pages
        .filter((x) => !x.index)
        .map((x) => path.basename(x.main).split('.')[0]);

      const chunks = (chunk: Chunk) => {
        // Include unnamed async chunks while keeping pure entry files standalone.
        return !chunk.name || !pureEntryFiles.includes(chunk.name);
      };

      // always optimize vendor and commons chunk to separate file into small size
      // otherwise, the main chunk will be too large to host on CDN
      developmentConfig.optimization = {
        splitChunks: {
          chunks,
          filename: vendorFilename, // Ensure hash is included
          minSize: 1_000_000, // 1MB
          maxSize: 9_000_000,
          /**
           * https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/ServingCompressedFiles.html
           *
           * Size of objects that CloudFront compresses
           * CloudFront compresses objects that are between 1,000 bytes and 10,000,000 bytes in size.
           */
          enforceSizeThreshold: 9_000_000, // for safely
          cacheGroups: cacheGroups,
        },
      };
    }

    return merge(developmentConfig, {
      output: {
        filename: (pathData) => {
          const chunkName = pathData?.chunk?.name;

          if (chunkName && filenameMap[chunkName]) {
            return filenameMap[chunkName];
          }

          // when have reason means those file from the splitChunks, which we need also use chunk file name instead of use the DEFAULT_FILENAME
          const chunkReason = (pathData?.chunk as Chunk)?.chunkReason;
          if (chunkReason) {
            // chunkReason: 'split chunk (cache group: vendor)',
            const cacheGroupName = chunkReason
              .split(' (cache group: ')[1]
              ?.split(')')[0];
            // cacheGroups
            const cacheGroup = cacheGroupName
              ? cacheGroups[cacheGroupName]
              : undefined;

            if (
              cacheGroup &&
              typeof cacheGroup !== 'boolean' &&
              cacheGroup.filename
            ) {
              return cacheGroup.filename;
            }

            return DEFAULT_CHUNK_FILENAME;
          }

          return DEFAULT_FILENAME;
        },
        chunkFilename: (pathData, assetInfo) => {
          const isString = typeof chunkFilenames === 'string';

          if (isString) return chunkFilenames;

          const chunkName = pathData.chunk?.name;
          if (!chunkName) return DEFAULT_CHUNK_FILENAME;

          if (assetInfo) {
            chunkInfoMap.set(chunkName, assetInfo);
          }

          return chunkFilenames?.[chunkName] || DEFAULT_CHUNK_FILENAME;
        },
      },
    });
  }

  return developmentConfig;
};
