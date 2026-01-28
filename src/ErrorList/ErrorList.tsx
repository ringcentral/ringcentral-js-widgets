import { Xsm } from '@ringcentral/spring-icon';
import {
  Block,
  Text,
  List,
  ListItem,
  ListItemText,
  Icon,
} from '@ringcentral/spring-ui';
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
    <Block padding>
      <Text className="typography-mainText">
        {translateString(TranslatableString.ErrorsLabel)}
      </Text>
      <List>
        {errors.map((error, i: number) => {
          return (
            <ListItem key={i}>
              <Icon symbol={Xsm} size="small" />
              <ListItemText primary={error.stack} />
            </ListItem>
          );
        })}
      </List>
    </Block>
  );
}
