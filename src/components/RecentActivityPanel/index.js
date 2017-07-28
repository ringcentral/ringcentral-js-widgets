import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import classNames from 'classnames/bind';
import Header from '../Header';
import styles from './styles.scss';
import expandable from './expandable';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import RecentActivityView from '../RecentActivityView';

const cx = classNames.bind(styles);
const ToggleIcon = ({ expanded }) => (
  <i className={classnames(dynamicsFont.arrow, cx('arrowIcon', { foldArrowIcon: !expanded }))} />
);

ToggleIcon.propTypes = {
  expanded: PropTypes.bool.isRequired
};

/**
 * RecentActivityPanel component provides a animated slide-out panel.
 */
function RecentActivityPanel(props) {
  const { title, expanded, onPanelToggle } = props;
  const toggleButton = {
    label: <ToggleIcon expanded={expanded} />,
    onClick: onPanelToggle,
    placement: 'right'
  };
  if (!props.currentContact) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={onPanelToggle}>
        <Header buttons={[toggleButton]} className={styles.header}>{title}</Header>
      </div>
      <RecentActivityView {...props} />
    </div>
  );
}

RecentActivityPanel.propTypes = {
  title: PropTypes.string.isRequired,
  currentContact: PropTypes.object,
  onPanelToggle: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired
};

RecentActivityPanel.defaultProps = {
  currentContact: null
};

export default expandable({
  styles: {
    height: '50%',
    offset: '40px'
  },
  className: styles.expandable
})(RecentActivityPanel);
