import type { FunctionComponent } from 'react';
import React, { useRef } from 'react';

import type { CommunicationSetupContextValue } from '../../contexts';
import { CommunicationSetupContext } from '../../contexts';

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
