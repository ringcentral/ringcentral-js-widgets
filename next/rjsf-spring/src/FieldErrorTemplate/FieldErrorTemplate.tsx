import { List, ListItem, ListItemText } from '@ringcentral/spring-ui';
import {
  errorId,
  FieldErrorProps,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';
import React from 'react';

/** The `FieldErrorTemplate` component renders the errors local to the particular field
 *
 * @param props - The `FieldErrorProps` for the errors being rendered
 */
export default function FieldErrorTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: FieldErrorProps<T, S, F>) {
  const { errors = [], idSchema } = props;
  if (errors.length === 0) {
    return null;
  }
  const id = errorId<T>(idSchema);

  return (
    <List>
      {errors.map((error, i: number) => {
        return (
          <ListItem key={i}>
            <ListItemText primary={error} id={id} />
          </ListItem>
        );
      })}
    </List>
  );
}
