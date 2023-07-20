import crypto from 'crypto';
import path from 'path';
import autoprefixer from 'autoprefixer';
import { warmup } from 'thread-loader';
import type {
  Configuration,
  RuleSetRule,
  RuleSetUseItem,
  WebpackPluginInstance,
} from 'webpack';
import { DefinePlugin, ProvidePlugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

function MD5(input: string) {
  return crypto.createHash('MD5').update(input).digest('hex');
}

export interface BaseWebpackConfigOptions {
  analyzeBundle?: boolean;
  cacheDirectory?: boolean;
  fontFileSizeLimit?: number;
  imageFileSizeLimit?: number;
  hashPrefix?: string;
  enableHash?: boolean;
  mode?: Configuration['mode'];
  prefixSvgId?: boolean;
  supportedLocales?: string[];
  themeFolder: string;
  threadLoaderOptions?: Record<string, any>;
  useThreadLoader?: boolean;
  preferredDevtool?: Configuration['devtool'];
  useDevtool?: boolean;
  sourceMapLoaderExcludes?: RuleSetRule['exclude'];
  babelLoaderExcludes?: RuleSetRule['exclude'];
  sassLoaderExcludes?: (string | RegExp)[];
  /**
   * enable chunk mode, also can use function when you need custom chunk with different language
   *
   * @default true
   */
  chunk?: boolean | ((locale: string) => boolean);
}

export const getBaseWebpackConfig = ({
  analyzeBundle = false,
  cacheDirectory = false,
  fontFileSizeLimit = 30000,
  imageFileSizeLimit = 20000,
  enableHash = true,
  hashPrefix = '',
  mode = 'production',
  prefixSvgId = false,
  supportedLocales = [],
  themeFolder,
  threadLoaderOptions = {},
  useThreadLoader = false,
  preferredDevtool = 'eval-source-map',
  useDevtool = mode === 'development',
  sourceMapLoaderExcludes = /node_modules/,
  babelLoaderExcludes = /node_modules/,
  sassLoaderExcludes = [],
  chunk = true,
}: BaseWebpackConfigOptions): Configuration => {
  const devtool = useDevtool ? preferredDevtool : false;
  const threadLoader: RuleSetUseItem[] = [];
  if (useThreadLoader) {
    warmup(threadLoaderOptions, [
      'source-map-loader',
      'babel-loader',
      'sass-loader',
    ]);
    threadLoader.push({
      loader: 'thread-loader',
      options: threadLoaderOptions,
    });
  }
  const plugins: WebpackPluginInstance[] = [
    new ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
      setImmediate: ['setimmediate', 'setImmedate'],
      clearImmediate: ['setimmediate', 'clearImmedate'],
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode),
    }),
  ];

  if (analyzeBundle) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: true,
      }),
    );
  }

  const rules: RuleSetRule[] = [
    {
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    },
    // material-ui v4.0 issue:
    // Multiple modules with names that only differ in casing in Popper module.
    // https://github.com/mui-org/material-ui/issues/14711
    {
      test: /node_modules\/@material-ui\/core\/esm\/Popper\/Popper\.js$/,
      use: {
        loader: 'string-replace-loader',
        options: {
          search: "import PopperJS from 'popper.js';",
          replace:
            'import PopperJS from "../../../../popper.js/dist/esm/popper";',
        },
      },
    },
  ];

  // source-map-loader
  if (useDevtool) {
    rules.push({
      enforce: 'pre',
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: sourceMapLoaderExcludes,
      use: ['source-map-loader', ...threadLoader],
    });
  }
  // babel-loader
  rules.push({
    test: /\.(js|jsx|ts|tsx)$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory,
        },
      },
      {
        loader: '@ringcentral-integration/locale-loader',
        options: {
          supportedLocales,
          chunk,
        },
      },
      ...threadLoader,
    ],
    exclude: babelLoaderExcludes,
  });

  // css
  rules.push({
    test: /\.css$/i,
    use: ['style-loader', 'css-loader', ...threadLoader],
  });

  // font
  rules.push({
    test: /\.woff|\.woff2|.eot|\.ttf/,
    use: {
      loader: 'url-loader',
      options: {
        limit: fontFileSizeLimit,
        name: `fonts/[name]${enableHash ? '_[hash]' : ''}.[ext]`,
        // TODO: it should be upgrade css-loader and update config
        esModule: false,
      },
    },
  });

  // svg
  rules.push({
    test: /\.svg/,
    exclude: /fonts/,
    use: ({ resource }: { resource: string }) => [
      'babel-loader',
      {
        loader: 'react-svg-loader',
        options: {
          jsx: true,
          svgo: {
            plugins: [
              {
                removeViewBox: false,
              },
              ...(prefixSvgId
                ? [
                    {
                      cleanupIDs: {
                        prefix: `${MD5(path.basename(resource, '.svg'))}-`,
                      },
                    },
                  ]
                : []),
            ],
          },
        },
      },
    ],
  });
  // images and svg font
  rules.push({
    test: /\.png|\.jpg|\.gif|fonts(\/|\\).*\.svg/,
    use: `url-loader?limit=${imageFileSizeLimit}&name=images/[name]${
      enableHash ? '_[hash]' : ''
    }.[ext]`,
  });

  // sass & scss
  rules.push({
    test: /\.sass|\.scss/,
    exclude: sassLoaderExcludes,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: `${hashPrefix}_[path]_[name]_[local]_[hash:base64:5]`,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [autoprefixer],
        },
      },
      {
        loader: 'sass-loader',
        options: {
          includePaths: [
            themeFolder,
            path.resolve(process.cwd(), 'node_modules'),
            path.resolve(process.cwd(), '../../node_modules'),
          ],
          outputStyle: 'expanded',
        },
      },
      ...threadLoader,
    ],
  });

  // audio
  rules.push({
    test: /\.ogg$|\.wav$/,
    use: `file-loader?name=audio/[name]${enableHash ? '_[hash]' : ''}.[ext]`,
  });

  return {
    mode,
    devtool,
    plugins,
    resolve: {
      // webpack < 5 used to include polyfills for node.js core modules by default.
      // This is no longer the case. Verify if you need this module and configure a polyfill for it.
      //
      // more doc: https://webpack.js.org/configuration/resolve/#resolvefallback
      //
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        vm: require.resolve('vm-browserify'),
        timers: require.resolve('timers-browserify'),
        process: require.resolve('process/browser'),
        assert: require.resolve('assert'),
        buffer: require.resolve('buffer'),
        console: require.resolve('console-browserify'),
        constants: require.resolve('constants-browserify'),
        domain: require.resolve('domain-browser'),
        events: require.resolve('events'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        path: require.resolve('path-browserify'),
        punycode: require.resolve('punycode'),
        querystring: require.resolve('querystring-es3'),
        string_decoder: require.resolve('string_decoder'),
        sys: require.resolve('util'),
        tty: require.resolve('tty-browserify'),
        url: require.resolve('url'),
        util: require.resolve('util'),
        zlib: require.resolve('browserify-zlib'),
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
      rules,
    },
  };
};
