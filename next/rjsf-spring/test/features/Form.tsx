import { ThemeProvider, suiJunoLight } from '@ringcentral/spring-ui';
import { FormProps } from '@rjsf/core';
import React, { ComponentType } from 'react';

import InputForm from '../../src';

export const Form: ComponentType<FormProps> = (props: FormProps) => {
  return (
    <ThemeProvider theme={suiJunoLight}>
      <InputForm {...props} />
    </ThemeProvider>
  );
};
