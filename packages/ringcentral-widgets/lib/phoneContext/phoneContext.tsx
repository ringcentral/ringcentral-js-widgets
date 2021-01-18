import { RcThemeProvider, RcThemeProviderProps } from '@ringcentral/juno';
import React from 'react';

import { defaultTheme } from './theme';

export interface PhoneProviderProps<T = any> {
  phone: T;
  theme?: RcThemeProviderProps['theme'];
}

export const PhoneContext = React.createContext(null);

export default PhoneContext;

export const PhoneProvider: React.FunctionComponent<PhoneProviderProps> = ({
  phone,
  theme = defaultTheme,
  children,
}) => {
  return (
    <PhoneContext.Provider value={phone}>
      <RcThemeProvider theme={theme}>{children}</RcThemeProvider>
    </PhoneContext.Provider>
  );
};

export function withPhone(Comp: any) {
  // eslint-disable-next-line func-names
  return function (props: any) {
    return (
      <PhoneContext.Consumer>
        {(phone) => <Comp phone={phone} {...props} />}
      </PhoneContext.Consumer>
    );
  };
}
