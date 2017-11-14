import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SpinnerOverlay from '../../components/SpinnerOverlay';
import BackHeader from '../../components/BackHeader';
import Panel from '../../components/Panel';

import ContactDetails, { contactItemPropTypes } from '../ContactDetails';
import styles from './styles.scss';
import i18n from './i18n';

export default class ContactDetailsView extends PureComponent {
  componentDidMount() {
    this.props.getContact();
  }

  componentWillReceiveProps(nextProps) {
    if (
      (!this.props.contactItem && nextProps.contactItem) ||
      (nextProps.contactItem &&
        nextProps.contactItem.id !== this.props.contactItem.id)
    ) {
      this.props.getPresence(nextProps.contactItem);
      this.props.getAvatar(nextProps.contactItem);
    }
  }

  componentWillUnmount() {
    this.props.clearContact();
  }

  render() {
    const {
      currentLocale,
      showSpinner,
      contactItem,
      onBackClick,
      onClickToSMS,
      onClickToDial,
      onClickMailTo,
      formatNumber,
      sourceNodeRenderer,
      children,
    } = this.props;
    if (!contactItem) return null;
    const content = showSpinner ?
      <SpinnerOverlay /> :
      (
        <ContactDetails
          currentLocale={currentLocale}
          contactItem={contactItem}
          onClickToSMS={onClickToSMS}
          onClickToDial={onClickToDial}
          onClickMailTo={onClickMailTo}
          formatNumber={formatNumber}
          sourceNodeRenderer={sourceNodeRenderer}
        />
      );

    return (
      <div className={styles.root}>
        <BackHeader
          buttons={[]}
          onBackClick={onBackClick}
          className={styles.header}
        >
          {i18n.getString('contactDetails', currentLocale)}
        </BackHeader>
        <Panel className={styles.content}>
          {content}
          {children}
        </Panel>
      </div>
    );
  }
}

ContactDetailsView.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  showSpinner: PropTypes.bool.isRequired,
  contactItem: PropTypes.shape(contactItemPropTypes),
  getContact: PropTypes.func.isRequired,
  clearContact: PropTypes.func.isRequired,
  getAvatar: PropTypes.func.isRequired,
  getPresence: PropTypes.func.isRequired,
  onBackClick: PropTypes.func,
  onClickToSMS: PropTypes.func,
  onClickToDial: PropTypes.func,
  onClickMailTo: PropTypes.func,
  formatNumber: PropTypes.func.isRequired,
  sourceNodeRenderer: PropTypes.func,
  children: PropTypes.node,
};

ContactDetailsView.defaultProps = {
  onBackClick: undefined,
  onClickToSMS: undefined,
  onClickToDial: undefined,
  onClickToGmail: undefined,
  children: undefined,
  contactItem: undefined,
  onClickMailTo: undefined,
  sourceNodeRenderer: () => null,
};
