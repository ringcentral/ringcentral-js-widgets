import {
  Text,
  Divider,
  type OverridableComponent,
  OverridableProps,
  twMerge,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React from 'react';

export type BaseLineProps = {
  divider?: boolean;
  /**
   * @deprecated renamed to `endAdornment`
   */
  icon?: React.ReactNode;
  endAdornment?: React.ReactNode;
  hintText?: string;
  classes?: {
    endAdornment?: string;
  };
};

type ExtendElementType = 'button' | 'div' | 'a';
type DefaultElementType = 'button';

export type LinkProps<T extends ExtendElementType = DefaultElementType> =
  OverridableProps<BaseLineProps, T>;

const _Line: React.FC<LinkProps> = ({
  className,
  onClick,
  children,
  divider = true,
  component,
  icon,
  classes,
  endAdornment = icon,
  title,
  hintText,
  ...rest
}) => {
  const Component: any = component ?? (onClick ? 'button' : 'div');

  return (
    <Component
      onClick={onClick}
      className={clsx(
        'bg-neutral-b5/90 pl-4 pr-3 py-2 rounded-none w-full min-h-[32px] flex items-center outline-none relative',
        onClick &&
          'cursor-pointer hover:bg-neutral-b5/60 focus:bg-neutral-b5/60 active:bg-neutral-b5/80 focus-visible:focus-ring-inset focus-ring-rounded-md',
        className,
      )}
      {...rest}
    >
      <div
        className="typography-mainText text-neutral-b0 flex items-center gap-1 overflow-hidden"
        title={title}
        data-sign="iconField"
      >
        {children}
      </div>
      <i className="flex-auto" />

      {endAdornment && (
        <div
          className={twMerge(
            'flex text-neutral-b2 max-w-[45%]',
            classes?.endAdornment,
          )}
        >
          {endAdornment}
        </div>
      )}

      {hintText && (
        <Text
          data-sign="hintText"
          color="bg-neutral-b2"
          component="p"
          noWrap={false}
          className="text-xs font-normal mt-[15px]"
        >
          {hintText}
        </Text>
      )}

      {divider && (
        <div data-divider className="px-3 w-full top-0 left-0 absolute">
          <Divider orientation="horizontal" />
        </div>
      )}
    </Component>
  );
};

export type LinkComponent = OverridableComponent<{
  props: BaseLineProps;
  defaultComponent: 'button';
}>;

export const Line = _Line as LinkComponent;
