import {
  BaseLineProps,
  Line,
} from '@ringcentral-integration/next-widgets/components';
import {
  type HTMLDataAttribute,
  Option,
  Select,
  SelectProps,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import type { ChangeEvent, FunctionComponent, PropsWithChildren } from 'react';
import React from 'react';

type SelectLineProps = PropsWithChildren<
  {
    disabled?: boolean;
    value: any;
    options: Array<{
      value: any;
      label: string;
    }>;
    onChange: (value: string) => void;
    /**
     * does show the select border
     *
     * @default `false`
     */
    border?: boolean;
  } & HTMLDataAttribute &
    Pick<BaseLineProps, 'classes'>
>;

export const SelectLine: FunctionComponent<SelectLineProps> = ({
  children,
  disabled,
  value,
  options,
  onChange,
  classes,
  border = false,
  ...rest
}) => {
  const nonBorderProps: SelectProps = border
    ? {
        MenuProps: {
          PopperProps: {
            matchAnchorWidth: false,
          },
        },
        className: clsx('w-full'),
        variant: 'outlined',
      }
    : {
        classes: {
          content: 'border-none',
        },
        className: clsx('w-full [&_.sui-form-field-focus-effect]:border-none'),
        MenuProps: {
          PopperProps: {
            offset: 0,
            matchAnchorWidth: false,
          },
        },
      };
  return (
    <Line
      classes={classes}
      endAdornment={
        <Select
          disabled={disabled}
          value={value}
          renderValue={(value) => {
            const selected = options.find((option) => option.value === value);
            if (selected) return selected.label;

            return typeof value === 'string' || typeof value === 'number'
              ? value
              : '';
          }}
          size="medium"
          // TODO: spring-ui should support none underline style
          {...nonBorderProps}
          onChange={(e: ChangeEvent<{ value: string }>) =>
            onChange(e.target.value)
          }
          {...rest}
        >
          {options.map(({ value, label }) => {
            return (
              <Option key={value} value={value}>
                {label}
              </Option>
            );
          })}
        </Select>
      }
    >
      <span data-sign={`${rest['data-sign']}_label`}>{children}</span>
    </Line>
  );
};
