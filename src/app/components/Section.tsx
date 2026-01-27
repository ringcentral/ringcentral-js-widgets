import { InfoMd } from '@ringcentral/spring-icon';
import { Tag, Text, Tooltip, IconButton } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { ComponentProps, FunctionComponent } from 'react';

export const Section: FunctionComponent<
  ComponentProps<'div'> & {
    label?: string;
    tag?: string;
    info?: string;
    classes?: {
      content?: string;
    };
    headerEndAdornment?: React.ReactNode;
  }
> = ({ label, tag, children, classes, info, headerEndAdornment, ...rest }) => {
  return (
    <div {...rest}>
      <div className="flex items-center gap-1 mb-1">
        {label && (
          <Text
            className="typography-descriptorMini text-neutral-b0"
            component="p"
            title={label}
          >
            {label}
          </Text>
        )}
        {tag && (
          <Tag color="neutral" variant="inverted">
            {tag}
          </Tag>
        )}
        {info && (
          <Tooltip title={info}>
            <IconButton
              data-sign="call-log-info-icon"
              symbol={InfoMd}
              size="small"
              color="neutral"
              variant="icon"
            />
          </Tooltip>
        )}
        {headerEndAdornment}
      </div>
      <div
        className={clsx(
          'rounded-lg overflow-hidden bg-neutral-b5/90 [&>*:nth-child(1)>[data-divider]]:hidden',
          classes?.content,
        )}
      >
        {children}
      </div>
    </div>
  );
};
