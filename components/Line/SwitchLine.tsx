import { Line } from '@ringcentral-integration/next-widgets/components';
import {
  CircularProgressIndicator,
  type HTMLDataAttribute,
  Switch,
} from '@ringcentral/spring-ui';
import type { FunctionComponent } from 'react';
import React from 'react';

export type SwitchLineProps = {
  disabled?: boolean;
  checked?: boolean;
  onChange?(checked: boolean): any;
  loading?: boolean;
} & HTMLDataAttribute;

export const SwitchLine: FunctionComponent<SwitchLineProps> = ({
  disabled,
  checked,
  onChange,
  children,
  loading,
  ...rest
}) => {
  return (
    <Line
      endAdornment={
        loading ? (
          <div className="flex items-center justify-center w-10">
            <CircularProgressIndicator size="medium" />
          </div>
        ) : (
          <Switch
            {...rest}
            data-sign="switch"
            disabled={disabled}
            checked={checked}
            onChange={(e) => onChange?.(e.target.checked)}
          />
        )
      }
      {...rest}
    >
      {children}
    </Line>
  );
};
