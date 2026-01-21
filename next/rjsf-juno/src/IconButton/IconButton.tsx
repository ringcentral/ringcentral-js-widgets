import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CopyIcon from '@material-ui/icons/FileCopy';
import RemoveIcon from '@material-ui/icons/Remove';
import {
  RcIconButton,
  RcIconButtonProps as MuiIconButtonProps,
} from '@ringcentral/juno';
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
    <RcIconButton
      {...otherProps}
      size="small"
      color={color as MuiIconButtonProps['color']}
    >
      {/* TODO */}
      {icon}
    </RcIconButton>
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
      icon={<CopyIcon fontSize="small" />}
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
      icon={<ArrowDownwardIcon fontSize="small" />}
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
      icon={<ArrowUpwardIcon fontSize="small" />}
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
      icon={
        <RemoveIcon fontSize={iconType === 'default' ? 'medium' : 'small'} />
      }
    />
  );
}
