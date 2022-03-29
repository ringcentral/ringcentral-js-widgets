import React, { FunctionComponent, useRef } from 'react';

import {
  CommunicationSetupContext,
  CommunicationSetupContextValue,
} from '../../contexts';

type ContextProps = {};

const CommunicationSetupProvider: FunctionComponent<ContextProps> = ({
  children,
}) => {
  const inputPropsRef: CommunicationSetupContextValue['inputPropsRef'] =
    useRef(null);
  const inputAriaPropsRef: CommunicationSetupContextValue['inputAriaPropsRef'] =
    useRef(null);

  return (
    <CommunicationSetupContext.Provider
      value={{ inputPropsRef, inputAriaPropsRef }}
    >
      <>{children}</>
    </CommunicationSetupContext.Provider>
  );
};

CommunicationSetupProvider.defaultProps = {};

CommunicationSetupProvider.displayName = 'CommunicationSetupProvider';

export { CommunicationSetupProvider };
