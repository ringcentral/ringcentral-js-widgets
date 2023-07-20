import type { ElementType, FunctionComponent } from 'react';
import React, { isValidElement, useMemo } from 'react';

import { format } from '@ringcentral-integration/utils';

export type FormattedMessageProps = {
  message: string;
  values?: Record<string, string>;
  /**
   * render element
   * @default `span`
   */
  tagName?: ElementType;
};

const FormattedMessage: FunctionComponent<FormattedMessageProps> = (props) => {
  const { message, values = {}, tagName: Component = 'span' } = props;

  const nodes = useMemo(() => {
    const uid = Math.floor(Math.random() * 0x10000000000).toString(16);
    const hashedParams: Record<string, string> = {};
    const elements: Record<string, string> = {};
    const tokenDelimiter = `@__${uid}__@`;

    Object.keys(values).forEach((key) => {
      if (isValidElement(values[key])) {
        hashedParams[key] = `${tokenDelimiter}${key}${tokenDelimiter}`;
        elements[key] = values[key];
      } else {
        hashedParams[key] = values[key];
      }
    });

    const nodes = format(message, hashedParams)
      .split(tokenDelimiter)
      .filter((token) => !!token)
      .map((token, i) => {
        return (
          <React.Fragment key={i}>{elements[token] || token}</React.Fragment>
        );
      });
    return nodes;
  }, [message, values]);

  return <Component>{nodes}</Component>;
};

export default FormattedMessage;
