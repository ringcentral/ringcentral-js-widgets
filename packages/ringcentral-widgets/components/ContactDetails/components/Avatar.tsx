import clsx from 'clsx';
import type { FunctionComponent, ReactNode } from 'react';
import React from 'react';

import DefaultAvatar from '../../../assets/images/DefaultAvatar.svg';
import PlaceholderImage from '../../PlaceholderImage';
import styles from '../styles.scss';

export interface AvatarProps {
  name: string;
  avatarUrl?: string;
  inactive?: boolean;
  source?: ReactNode;
}

export const Avatar: FunctionComponent<AvatarProps> = ({
  name,
  avatarUrl,
  inactive,
  source,
}) => {
  const imageClassName = clsx(styles.avatarImage, inactive && styles.inactive);
  const sourceNode = source ? (
    <div className={styles.sourceWrapper}>{source}</div>
  ) : null;
  return (
    <div className={styles.avatar}>
      <PlaceholderImage
        // @ts-expect-error TS(2322): Type '{ className: string; alt: string; src: strin... Remove this comment to see the full error message
        className={imageClassName}
        alt={name}
        src={avatarUrl}
        placeholder={
          <DefaultAvatar
            data-sign="profile"
            data-inactive={inactive}
            className={imageClassName}
          />
        }
      />
      {sourceNode}
    </div>
  );
};
Avatar.defaultProps = {
  inactive: false,
};
