import { RcThemeProvider } from '@ringcentral/juno';
import { createRoot } from '@ringcentral-integration/next-core';
import { suiJunoLight, ThemeProvider } from '@ringcentral/spring-theme';
import React from 'react';

import '../../src/main.global.scss';

import { LogViewerApp } from './LogViewerApp';

const appConfig = process.env.APP_CONFIG as {
  brandConfig?: {
    theme?: {
      suiThemeMap?: {
        light?: unknown;
        default?: unknown;
      };
    };
  };
};

const getSpringTheme = () => {
  const suiThemeMap = appConfig.brandConfig?.theme?.suiThemeMap;
  const lightTheme = suiThemeMap?.light;
  const defaultTheme = suiThemeMap?.default;

  if (Array.isArray(lightTheme)) {
    return lightTheme[0] || suiJunoLight;
  }

  if (Array.isArray(defaultTheme)) {
    return defaultTheme[0] || suiJunoLight;
  }

  return lightTheme || defaultTheme || suiJunoLight;
};

const rootElement = document.getElementById('app');

if (!rootElement) {
  throw new Error('Log viewer root element #app was not found');
}

createRoot(rootElement).render(
  <RcThemeProvider>
    <ThemeProvider theme={getSpringTheme()} mode="compact">
      <LogViewerApp />
    </ThemeProvider>
  </RcThemeProvider>,
);
