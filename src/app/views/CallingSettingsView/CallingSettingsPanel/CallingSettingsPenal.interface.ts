import type { MutableRefObject, ReactNode } from 'react';

export interface SaveFunctionProps {
  callWith: string;
  myLocation: string;
  ringoutPrompt: boolean;
  isCustomLocation: boolean;
}

export interface GetOptionNameProps {
  jupiterAppName: string;
  softphoneAppName: string;
}

export interface GetCallingOptionNameProps extends GetOptionNameProps {
  callingOption: string;
}

export interface CallWithProps extends GetOptionNameProps {
  callWithOptions: string[];
  disabled?: boolean;
  callWith: string;
  onCallWithChange: (newCallWith: string) => void;
}
