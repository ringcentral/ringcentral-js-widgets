import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function getMeidaCls(str) {
  return styles[`media${capitalize(str)}`];
}

function MediaObject({
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
  flexible, // Using flex layout or not
}) {
  const leftAlignmentClassName = getMeidaCls(leftAlignment);
  const rightAlignmentClassName = getMeidaCls(rightAlignment);
  const bodyAlignmentClassName = getMeidaCls(bodyAlignment);

  return (
    <div className={classnames({
      [styles.media]: true,
      [styles.flex]: !!flexible,
      [containerCls]: !!containerCls
      })}>
      {
        mediaLeft ? (
          <div className={classnames(styles.mediaLeft, leftAlignmentClassName, leftCls)}>
            <div className={styles.mediaObject}>
              {mediaLeft}
            </div>
          </div>
        ) : null
      }
      <div className={classnames(styles.mediaBody, bodyAlignmentClassName, bodyCls)}>
        {
          mediaHeading ? (
            <h4 className={classnames(styles.mediaHeading, headingCls)}>
              {mediaHeading}
            </h4>
          ) : null
        }
        {mediaBody}
      </div>
      {
        mediaRight ? (
          <div className={classnames(styles.mediaRight, rightAlignmentClassName, rightCls)}>
            <div className={styles.mediaObject}>
              {mediaRight}
            </div>
          </div>
        ) : null
      }
    </div>
  );
}


MediaObject.propTypes = {
  containerCls: PropTypes.string,
  mediaLeft: PropTypes.element,
  mediaBody: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  mediaRight: PropTypes.element,
  mediaHeading: PropTypes.string,
  leftCls: PropTypes.string,
  bodyCls: PropTypes.string,
  rightCls: PropTypes.string,
  headingCls: PropTypes.string,
  leftAlignment: PropTypes.oneOf(['top', 'middle', 'bottom']),
  bodyAlignment: PropTypes.oneOf(['top', 'middle', 'bottom']),
  rightAlignment: PropTypes.oneOf(['top', 'middle', 'bottom']),
  flexible: PropTypes.bool,
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
