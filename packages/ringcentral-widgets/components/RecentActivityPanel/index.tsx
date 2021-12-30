import React from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import { Header } from '../Header';
import RecentActivityView from '../RecentActivityView';
import expandable from './expandable';
import styles from './styles.scss';

const ToggleIcon = ({ expanded }) => (
  <i
    className={classnames(
      dynamicsFont.arrow,
      classnames(styles.arrowIcon, { [styles.foldArrowIcon]: !expanded }),
    )}
  />
);

ToggleIcon.propTypes = {
  expanded: PropTypes.bool.isRequired,
};

/**
 * RecentActivityPanel component provides a animated slide-out panel.
 */
const RecentActivityPanel = (props) => {
  const { title, expanded, onPanelToggle } = props;
  const toggleButton = {
    label: <ToggleIcon expanded={expanded} />,
    onClick: onPanelToggle,
    placement: 'right',
  };
  if (!props.currentContact) {
    return null;
  }
  const containerClass = classnames(styles.container, props.className);
  return (
    <div className={containerClass}>
      <Header
        buttons={[toggleButton]}
        className={styles.header}
        onClick={onPanelToggle}
      >
        {title}
      </Header>
      <RecentActivityView {...props} />
    </div>
  );
};

RecentActivityPanel.propTypes = {
  title: PropTypes.string.isRequired,
  currentContact: PropTypes.object,
  onPanelToggle: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

RecentActivityPanel.defaultProps = {
  currentContact: null,
  className: null,
};

export default expandable({
  styles: {
    height: '200px',
    offset: '27px',
  },
  className: styles.expandable,
})(RecentActivityPanel);
