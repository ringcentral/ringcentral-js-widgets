import React from 'react';
import { connect } from 'react-redux';

export interface PhoneProviderProps<T = any>{
  phone: T;
  theme?: any;
}

const PhoneContext = React.createContext(null);
export default PhoneContext;

export const PhoneProvider:React.FunctionComponent<PhoneProviderProps> = ({
  phone,
  theme,
  children,
}) => (
  <PhoneContext.Provider value={phone}>
    {React.Children.only(children)}
  </PhoneContext.Provider>
);

export function withPhone(Comp) {
  function WithPhone(props) {
    return (
      <PhoneContext.Consumer>
        {
          (phone) => (
            <Comp
              phone={phone}
              {...props}
            />
          )
        }
      </PhoneContext.Consumer>
    );
  }
  return WithPhone;
}

// router properties
export function connectModule(fn) {
  return (Comp) => {
    const WithModule = connect(
      (_, props: any) => fn(props.phone).getUIProps(props),
      (_, props: any) => fn(props.phone).getUIFunctions(props),
    )(Comp);
    return (props) => (
      <PhoneContext.Consumer>
        {
          (phone) => (
            <WithModule
              phone={phone}
              {...props}
            />
          )
        }
      </PhoneContext.Consumer>
    );
  };
}
