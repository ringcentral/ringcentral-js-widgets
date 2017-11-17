import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Header from '../../components/Header';
import SpinnerOverlay from '../../components/SpinnerOverlay';
import MessageList from '../../components/MessageList';
import ComposeText from '../../assets/images/ComposeText.svg';
import styles from './styles.scss';
import i18n from './i18n';

export default function MessagesPanel({
  currentLocale,
  showSpinner,
  showTitle,
  showComposeText,
  composeText,
  ...props,
}) {
  const buttons = [];
  if (showComposeText) {
    buttons.push({
      label: <ComposeText className={styles.composeText} />,
      onClick: composeText,
      placement: 'right',
    });
  }
  const header = showTitle ?
    (<Header buttons={buttons}>
      {i18n.getString('title', currentLocale)}
    </Header>) :
    null;
  const content = showSpinner ?
    <SpinnerOverlay /> :
    (
      <MessageList
        className={classnames(
          styles.content,
          showTitle && styles.contentWithHeader
        )}
        {...props}
        currentLocale={currentLocale}
      />
    );
  return (
    <div className={styles.root}>
      {header}
      {content}
    </div>
  );
}

MessagesPanel.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  showSpinner: PropTypes.bool,
  showTitle: PropTypes.bool,
  showContactDisplayPlaceholder: PropTypes.bool,
  sourceIcons: PropTypes.object,
  showComposeText: PropTypes.bool,
  composeText: PropTypes.func.isRequired,
};
MessagesPanel.defaultProps = {
  showSpinner: false,
  showTitle: false,
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  showComposeText: false,
};
