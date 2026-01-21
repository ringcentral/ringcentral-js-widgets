import ErrorIcon from '@material-ui/icons/Error';
import {
  RcBox,
  RcList,
  RcListItem,
  RcListItemIcon,
  RcListItemText,
  RcPaper,
  RcTypography,
} from '@ringcentral/juno';
import {
  ErrorListProps,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
} from '@rjsf/utils';
import React from 'react';

/** The `ErrorList` component is the template that renders the all the errors associated with the fields in the `Form`
 *
 * @param props - The `ErrorListProps` for this component
 */
export default function ErrorList<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({ errors, registry }: ErrorListProps<T, S, F>) {
  const { translateString } = registry;
  return (
    <RcPaper elevation={2}>
      <RcBox mb={2} p={2}>
        <RcTypography variant="caption1">
          {translateString(TranslatableString.ErrorsLabel)}
        </RcTypography>
        <RcList dense={true}>
          {errors.map((error, i: number) => {
            return (
              <RcListItem key={i}>
                <RcListItemIcon>
                  <ErrorIcon color="error" />
                </RcListItemIcon>
                <RcListItemText primary={error.stack} />
              </RcListItem>
            );
          })}
        </RcList>
      </RcBox>
    </RcPaper>
  );
}
