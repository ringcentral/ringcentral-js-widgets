import { LinkMd } from '@ringcentral/spring-icon';
import {
  Button,
  type ButtonProps,
  IconButton,
  type IconButtonProps,
  Tooltip,
} from '@ringcentral/spring-ui';
import React, { FC } from 'react';
import { useFileUpload } from 'use-file-upload';

type AttachmentMenuViewProps = IconButtonProps &
  ButtonProps & {
    acceptTypes: string;
    multiple?: boolean;
    type?: 'icon' | 'button';
    label?: string;
    onUpload?: (files: File[]) => void;
  };

const handlePreventLeaveFocus = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
): void => e.preventDefault();

export const AttachButton: FC<AttachmentMenuViewProps> = ({
  acceptTypes: accept,
  multiple = false,
  type = 'icon',
  label,
  onUpload,
  ...rest
}) => {
  const [, selectFile] = useFileUpload();
  const BaseComponent = (props: any) => {
    return type === 'icon' ? (
      <IconButton
        color="secondary"
        className="text-neutral-b2"
        variant="icon"
        symbol={LinkMd}
        {...props}
      />
    ) : props.title ? (
      <Tooltip title={props.title}>
        <Button variant="outlined" {...props} />
      </Tooltip>
    ) : (
      <Button variant="outlined" {...props} />
    );
  };
  return (
    <BaseComponent
      data-sign="attachButton"
      size="large"
      {...rest}
      onMouseDown={handlePreventLeaveFocus}
      onClick={() =>
        selectFile({ accept, multiple }, (result) => {
          const files = multiple
            ? (result as unknown as { file: File }[])
            : [result as unknown as { file: File }];
          onUpload?.(files.map((it) => it.file));
        })
      }
    >
      {label}
    </BaseComponent>
  );
};
