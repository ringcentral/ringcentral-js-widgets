import { createContext, useContext } from 'react';

import type { RcTextFieldProps } from '@ringcentral/juno';

type CommunicationSetupContextValue = {
  inputPropsRef?: React.RefObject<RcTextFieldProps['InputProps']>;
  inputAriaPropsRef?: React.RefObject<RcTextFieldProps['inputProps']>;
};

const CommunicationSetupContext = createContext<CommunicationSetupContextValue>(
  {},
);

const useCommunicationSetupContext = () =>
  useContext(CommunicationSetupContext);

export { CommunicationSetupContext, useCommunicationSetupContext };
export type { CommunicationSetupContextValue };
