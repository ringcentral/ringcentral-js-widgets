import {
  ArrowDownMd,
  ArrowUpMd,
  CopyMd,
  MinusMd,
} from '@ringcentral/spring-icon';
import {
  IconButton,
  IconButtonProps as SpringIconButtonProps,
} from '@ringcentral/spring-ui';
import {
  FormContextType,
  IconButtonProps,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
} from '@rjsf/utils';
import React from 'react';

export default function MuiIconButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: IconButtonProps<T, S, F>) {
  const { icon, color, uiSchema, registry, ...otherProps } = props;
  return (
    <IconButton
      {...otherProps}
      size="small"
      color={color as SpringIconButtonProps['color']}
    >
      {/* TODO */}
      {icon}
    </IconButton>
  );
}

export function CopyButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: IconButtonProps<T, S, F>) {
  const {
    registry: { translateString },
  } = props;
  return (
    <MuiIconButton
      title={translateString(TranslatableString.CopyButton)}
      {...props}
      icon={<CopyMd fontSize="small" />}
    />
  );
}

export function MoveDownButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: IconButtonProps<T, S, F>) {
  const {
    registry: { translateString },
  } = props;
  return (
    <MuiIconButton
      title={translateString(TranslatableString.MoveDownButton)}
      {...props}
      icon={<ArrowDownMd fontSize="small" />}
    />
  );
}

export function MoveUpButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: IconButtonProps<T, S, F>) {
  const {
    registry: { translateString },
  } = props;
  return (
    <MuiIconButton
      title={translateString(TranslatableString.MoveUpButton)}
      {...props}
      icon={<ArrowUpMd fontSize="small" />}
    />
  );
}

export function RemoveButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: IconButtonProps<T, S, F>) {
  const { iconType, ...otherProps } = props;
  const {
    registry: { translateString },
  } = otherProps;
  return (
    <MuiIconButton
      title={translateString(TranslatableString.RemoveButton)}
      {...otherProps}
      color="secondary"
      icon={<MinusMd fontSize={iconType === 'default' ? 'medium' : 'small'} />}
    />
  );
}
