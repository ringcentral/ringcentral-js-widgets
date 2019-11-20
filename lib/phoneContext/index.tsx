import {
  RcThemeProvider,
  RcThemeProviderProps,
} from '@ringcentral-integration/rcui';
import React from 'react';
import { connect } from 'react-redux';
import { defaultTheme } from './theme';
import customIcon from './customIcon';

export interface PhoneProviderProps<T = any> {
  phone: T;
  theme?: RcThemeProviderProps['theme'];
  icons?: RcThemeProviderProps['icons'];
}

const PhoneContext = React.createContext(null);
export default PhoneContext;

export const PhoneProvider: React.FunctionComponent<PhoneProviderProps> = ({
  phone,
  theme = defaultTheme,
  icons = customIcon,
  children,
}) => {
  return (
    <PhoneContext.Provider value={phone}>
      <RcThemeProvider theme={theme} icons={icons}>
        {children}
      </RcThemeProvider>
    </PhoneContext.Provider>
  );
};

export function withPhone(Comp) {
  function WithPhone(props) {
    return (
      <PhoneContext.Consumer>
        {(phone) => <Comp phone={phone} {...props} />}
      </PhoneContext.Consumer>
    );
  }
  return WithPhone;
}

export type connectModuleProps<T> = (props: T) => any;

// router properties
export function connectModule<T = any, K = any>(fn: connectModuleProps<T>) {
  return (Comp) => {
    const WithModule = connect(
      (_, props: any) => fn(props.phone).getUIProps(props),
      (_, props: any) => fn(props.phone).getUIFunctions(props),
    )(Comp);
    return (props: K) => (
      <PhoneContext.Consumer>
        {(phone) => <WithModule phone={phone} {...props} />}
      </PhoneContext.Consumer>
    );
  };
}
