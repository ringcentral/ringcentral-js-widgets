import React from 'react';

import classnames from 'classnames';

import styles from './styles.scss';

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
function getMeidaCls(str) {
  return styles[`media${capitalize(str)}`];
}
type MediaObjectProps = {
  containerCls?: string;
  mediaLeft?: JSX.Element;
  mediaBody?: JSX.Element | string;
  mediaRight?: JSX.Element;
  mediaHeading?: string;
  leftCls?: string;
  bodyCls?: string;
  rightCls?: string;
  headingCls?: string;
  leftAlignment?: 'top' | 'middle' | 'bottom';
  bodyAlignment?: 'top' | 'middle' | 'bottom';
  rightAlignment?: 'top' | 'middle' | 'bottom';
  flexible?: boolean;
};
const MediaObject: React.SFC<MediaObjectProps> = ({
  containerCls,
  mediaLeft,
  mediaBody,
  mediaRight,
  leftCls,
  bodyCls,
  rightCls,
  mediaHeading,
  headingCls,
  leftAlignment,
  bodyAlignment,
  rightAlignment,
  flexible,
}) => {
  const leftAlignmentClassName = getMeidaCls(leftAlignment);
  const rightAlignmentClassName = getMeidaCls(rightAlignment);
  const bodyAlignmentClassName = getMeidaCls(bodyAlignment);
  return (
    <div
      className={classnames({
        [styles.media]: true,
        [styles.flex]: !!flexible,
        [containerCls]: !!containerCls,
      })}
    >
      {mediaLeft ? (
        <div
          className={classnames(
            styles.mediaLeft,
            leftAlignmentClassName,
            leftCls,
          )}
        >
          <div className={styles.mediaObject}>{mediaLeft}</div>
        </div>
      ) : null}
      <div
        className={classnames(
          styles.mediaBody,
          bodyAlignmentClassName,
          bodyCls,
        )}
      >
        {mediaHeading ? (
          <h4 className={classnames(styles.mediaHeading, headingCls)}>
            {mediaHeading}
          </h4>
        ) : null}
        {mediaBody}
      </div>
      {mediaRight ? (
        <div
          className={classnames(
            styles.mediaRight,
            rightAlignmentClassName,
            rightCls,
          )}
        >
          <div className={styles.mediaObject}>{mediaRight}</div>
        </div>
      ) : null}
    </div>
  );
};
MediaObject.defaultProps = {
  containerCls: null,
  mediaLeft: null,
  mediaBody: null,
  mediaRight: null,
  mediaHeading: null,
  leftCls: null,
  bodyCls: null,
  rightCls: null,
  headingCls: null,
  leftAlignment: 'middle',
  bodyAlignment: 'middle',
  rightAlignment: 'middle',
  flexible: true,
};
export default MediaObject;
