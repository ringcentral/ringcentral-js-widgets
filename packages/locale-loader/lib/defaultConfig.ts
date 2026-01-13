interface DefaultConfig {
  sourceLocale: string;
  sourceFolder: string;
  localizationFolder: string;
  interactive: boolean;
  silent: boolean;
}

export default {
  sourceLocale: 'en-US',
  sourceFolder: process.cwd(),
  localizationFolder: './localization',
  interactive: true,
  silent: false,
} as DefaultConfig;
