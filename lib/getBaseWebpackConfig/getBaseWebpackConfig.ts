import autoprefixer from 'autoprefixer';
import crypto from 'crypto';
import path from 'path';
import { warmup } from 'thread-loader';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import {
  Configuration,
  DefinePlugin,
  Loader,
  Plugin,
  RuleSetRule,
} from 'webpack';

function MD5(input: string) {
  return crypto.createHash('MD5').update(input).digest('hex');
}

export interface BaseWebpackConfigOptions {
  analyzeBundle?: boolean;
  cacheDirectory?: boolean;
  fontFileSizeLimit?: number;
  imageFileSizeLimit?: number;
  hashPrefix?: string;
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
}

export const getBaseWebpackConfig = ({
  analyzeBundle = false,
  cacheDirectory = false,
  fontFileSizeLimit = 15000,
  imageFileSizeLimit = 20000,
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
}: BaseWebpackConfigOptions): Configuration => {
  const devtool = useDevtool ? preferredDevtool : false;
  const threadLoader: Loader[] = [];
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
  const plugins: Plugin[] = [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode),
    }),
  ];
  if (analyzeBundle) {
    plugins.push(new BundleAnalyzerPlugin());
  }
  const rules: RuleSetRule[] = [];

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
    use: `url-loader?limit=${fontFileSizeLimit}&name=fonts/[name]_[hash].[ext]`,
  });

  // svg
  rules.push({
    test: /\.svg/,
    exclude: /fonts/,
    use: ({ resource }) => [
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
    use: `url-loader?limit=${imageFileSizeLimit}&name=images/[name]_[hash].[ext]`,
  });

  // sass & scss
  rules.push({
    test: /\.sass|\.scss/,
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
    use: 'file-loader?name=audio/[name]_[hash].[ext]',
  });

  return {
    mode,
    devtool,
    plugins,
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
      rules,
    },
  };
};
