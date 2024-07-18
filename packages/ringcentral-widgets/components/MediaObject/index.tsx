import clsx from 'clsx';
import React from 'react';

import styles from './styles.scss';

function capitalize(str: any) {
  return str[0].toUpperCase() + str.slice(1);
}
function getMeidaCls(str: any) {
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
const MediaObject: React.FC<MediaObjectProps> = ({
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
      className={clsx({
        [styles.media]: true,
        [styles.flex]: !!flexible,
        // @ts-expect-error TS(2464): A computed property name must be of type 'string',... Remove this comment to see the full error message
        [containerCls]: !!containerCls,
      })}
    >
      {mediaLeft ? (
        <div
          className={clsx(styles.mediaLeft, leftAlignmentClassName, leftCls)}
        >
          <div className={styles.mediaObject}>{mediaLeft}</div>
        </div>
      ) : null}
      <div className={clsx(styles.mediaBody, bodyAlignmentClassName, bodyCls)}>
        {mediaHeading ? (
          <h4 className={clsx(styles.mediaHeading, headingCls)}>
            {mediaHeading}
          </h4>
        ) : null}
        {mediaBody}
      </div>
      {mediaRight ? (
        <div
          className={clsx(styles.mediaRight, rightAlignmentClassName, rightCls)}
        >
          <div className={styles.mediaObject}>{mediaRight}</div>
        </div>
      ) : null}
    </div>
  );
};
MediaObject.defaultProps = {
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  containerCls: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Element | u... Remove this comment to see the full error message
  mediaLeft: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | El... Remove this comment to see the full error message
  mediaBody: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Element | u... Remove this comment to see the full error message
  mediaRight: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  mediaHeading: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  leftCls: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  bodyCls: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  rightCls: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  headingCls: null,
  leftAlignment: 'middle',
  bodyAlignment: 'middle',
  rightAlignment: 'middle',
  flexible: true,
};
export default MediaObject;
