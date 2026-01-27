import clsx from 'clsx';
import React from 'react';

import { SettingsCardProps } from './SettingsCard.interface';

export const SettingsCard: React.FC<SettingsCardProps> = ({
  mainText,
  descriptor,
  className,
  mainTextClassName,
  descriptorClassName,
  children,
  dataSign,
}) => {
  return (
    <div
      className={clsx('bg-neutral-b5/90 rounded-lg overflow-hidden', className)}
      data-sign={dataSign}
    >
      <div className="px-4 py-4">
        <div>
          <div
            className={clsx(
              'typography-mainText text-neutral-b1 break-words',
              mainTextClassName,
            )}
          >
            {mainText}
          </div>
          {descriptor && (
            <div
              className={clsx(
                'typography-descriptor text-neutral-b2',
                descriptorClassName,
              )}
            >
              {descriptor}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};
