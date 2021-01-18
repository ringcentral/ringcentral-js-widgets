import React, { ComponentType, FunctionComponent } from 'react';
import { connect } from 'react-redux';

import { PhoneContext } from './phoneContext';

export type connectModuleProps<T> = (props: T) => any;

function connectModule<T = any, K = any>(fn: connectModuleProps<T>) {
  return (Comp: ComponentType<any>) => {
    const WithModule = connect(
      (_, props: any) => fn(props.phone).getUIProps(props),
      (_, props: any) => fn(props.phone).getUIFunctions(props),
    )(Comp);
    return (((props: K) => (
      <PhoneContext.Consumer>
        {(phone) => <WithModule phone={phone} {...props} />}
      </PhoneContext.Consumer>
    )) as any) as FunctionComponent<K>;
  };
}

export default connectModule;
