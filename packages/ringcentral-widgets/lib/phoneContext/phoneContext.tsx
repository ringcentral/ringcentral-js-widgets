import React, { FunctionComponent } from 'react';

import { RcThemeProvider, RcThemeProviderProps } from '@ringcentral/juno';

export interface PhoneProviderProps<T = any> {
  phone: T;
  theme?: RcThemeProviderProps['theme'];
}

export const PhoneContext = React.createContext<any>(null);

export default PhoneContext;

/**
 * Init `UI module system provider` and `Juno theme provider`
 * make sure you only have one `PhoneProvider` in your app
 */
export const PhoneProvider: FunctionComponent<PhoneProviderProps> = ({
  phone,
  theme,
  children,
}) => {
  return (
    <PhoneContext.Provider value={phone}>
      <RcThemeProvider theme={theme}>{children}</RcThemeProvider>
    </PhoneContext.Provider>
  );
};

/**
 * @deprecated please use UI module System
 * bind phone provider
 * @param Comp target component that you want to bind phone state
 */
export function withPhone(Comp: any) {
  // eslint-disable-next-line func-names
  return (props: any) => {
    return (
      <PhoneContext.Consumer>
        {(phone) => <Comp phone={phone} {...props} />}
      </PhoneContext.Consumer>
    );
  };
}
