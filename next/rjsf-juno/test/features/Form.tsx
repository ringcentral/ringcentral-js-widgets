import { RcThemeProvider } from '@ringcentral/juno';
import { FormProps } from '@rjsf/core';
import React, { ComponentType } from 'react';

import InputForm from '../../src';

export const Form: ComponentType<FormProps> = (props: FormProps) => {
  return (
    <RcThemeProvider>
      <InputForm {...props} />
    </RcThemeProvider>
  );
};
