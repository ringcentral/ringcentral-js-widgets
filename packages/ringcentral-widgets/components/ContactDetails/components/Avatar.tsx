import React, { FunctionComponent, ReactNode } from 'react';
import classnames from 'classnames';
import PlaceholderImage from '../../PlaceholderImage';
import DefaultAvatar from '../../../assets/images/DefaultAvatar.svg';
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
  const imageClassName = classnames(
    styles.avatarImage,
    inactive && styles.inactive,
  );
  const sourceNode = source ? (
    <div className={styles.sourceWrapper}>{source}</div>
  ) : null;
  return (
    <div className={styles.avatar}>
      <PlaceholderImage
        className={imageClassName}
        alt={name}
        src={avatarUrl}
        placeholder={<DefaultAvatar className={imageClassName} />}
      />
      {sourceNode}
    </div>
  );
};
Avatar.defaultProps = {
  inactive: false,
};
