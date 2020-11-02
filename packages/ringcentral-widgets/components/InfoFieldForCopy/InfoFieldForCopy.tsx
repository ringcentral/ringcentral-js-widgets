import React, { FunctionComponent, memo } from 'react';
import { InfoFieldWithAction } from '../InfoFieldWithAction';
import { CopyBtn } from '../CopyBtn';
import { IInfoFieldForCopyProps } from './interface';

export const InfoFieldForCopy: FunctionComponent<IInfoFieldForCopyProps> = memo(
  (props) => {
    const {
      label,
      value,
      name,
      onCopySuccess,
      onCopyFailed,
      tooltip,
      currentLocale,
      ...res
    } = props;

    return (
      <InfoFieldWithAction
        btn={
          !!value && (
            <CopyBtn
              value={value}
              handleFailure={onCopyFailed}
              handleSuccess={onCopySuccess}
              currentLocale={currentLocale}
            />
          )
        }
        value={value}
        label={label}
        tooltip={tooltip}
        name={name}
        {...res}
      />
    );
  },
);

InfoFieldForCopy.defaultProps = {
  onCopySuccess: () => {},
  onCopyFailed: () => {},
};
