import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Modal from '../Modal';
import EntityButton from '../EntityButton';
import EntityModal from '../EntityModal';
import Button from '../Button';
import LogButton from '../LogButton';
import DeleteMessageIcon from '../../assets/images/DeleteMessageIcon.svg';
import CloseIcon from '../../assets/images/CloseIcon.svg';
import MarkIcon from '../../assets/images/Mark.svg';
import UnmarkIcon from '../../assets/images/Unmark.svg';
import PreviewIcon from '../../assets/images/Preview.svg';
import DownloadIcon from '../../assets/images/Download.svg';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';

import styles from './styles.scss';
import i18n from './i18n';

export function ConfirmDeleteModal({
  currentLocale,
  show,
  onDelete,
  onCancel,
}) {
  return (
    <Modal
      show={show}
      currentLocale={currentLocale}
      onConfirm={onDelete}
      onCancel={onCancel}
    >
      <div className={styles.contentText}>
        {i18n.getString('sureToDeleteVoiceMail', currentLocale)}
      </div>
    </Modal>
  );
}
ConfirmDeleteModal.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onDelete: PropTypes.func,
  onCancel: PropTypes.func,
};

ConfirmDeleteModal.defaultProps = {
  onDelete() {},
  onCancel() {}
};

export function ClickToDialButton({
  className,
  onClickToDial,
  disableLinks,
  disableClickToDial,
  phoneNumber,
  title,
}) {
  return (
    <Button
      className={classnames(styles.button, styles.clickToDialButton, className)}
      onClick={onClickToDial}
      disabled={disableLinks || disableClickToDial || !phoneNumber} >
      <span
        className={dynamicsFont.call}
        title={title} />
    </Button>
  );
}
ClickToDialButton.propTypes = {
  className: PropTypes.string,
  onClickToDial: PropTypes.func,
  disableLinks: PropTypes.bool,
  disableClickToDial: PropTypes.bool,
  phoneNumber: PropTypes.string,
  title: PropTypes.string,
};
ClickToDialButton.defaultProps = {
  className: undefined,
  onClickToDial: undefined,
  disableLinks: false,
  disableClickToDial: false,
  phoneNumber: undefined,
  title: undefined,
};

export function ClickToSmsButton({
  className,
  onClickToSms,
  disableLinks,
  phoneNumber,
  title,
}) {
  return (
    <Button
      className={classnames(styles.button, styles.clickToSmsButton, className)}
      onClick={onClickToSms}
      disabled={disableLinks || !phoneNumber} >
      <span
        className={dynamicsFont.composeText}
        title={title} />
    </Button>
  );
}
ClickToSmsButton.propTypes = {
  className: PropTypes.string,
  onClickToSms: PropTypes.func,
  disableLinks: PropTypes.bool,
  phoneNumber: PropTypes.string,
  title: PropTypes.string,
};
ClickToSmsButton.defaultProps = {
  className: undefined,
  onClickToSms: undefined,
  disableLinks: false,
  phoneNumber: undefined,
  title: undefined,
};

export function DeleteButton({
  className,
  title,
  openDeleteModal,
  disabled,
}) {
  return (
    <Button
      className={classnames(styles.button, styles.svgBtn, className)}
      onClick={openDeleteModal}
      disabled={disabled}
    >
      <span title={title}>
        <DeleteMessageIcon
          width={14}
          height={17}
          className={classnames(styles.svgFillIcon, (disabled ? styles.disabled : null))}
        />
      </span>
    </Button>
  );
}

DeleteButton.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  openDeleteModal: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
};
DeleteButton.defaultProps = {
  className: undefined,
  title: undefined,
  openDeleteModal() {},
};

export function MarkButton({
  marked,
  className,
  onClick,
  markTitle,
  unmarkTitle,
  disabled,
}) {
  const Icon = marked ? UnmarkIcon : MarkIcon;
  const title = marked ? unmarkTitle : markTitle;
  const classNames = classnames(
    styles.unmarked,
    (marked ? styles.svgFillIcon : null),
    (disabled ? styles.disabled : null)
  );
  return (
    <Button
      className={classnames(styles.button, styles.svgBtn, className)}
      onClick={onClick}
      disabled={disabled}
    >
      <span title={title}>
        <Icon
          width={14}
          height={17}
          title={title}
          className={classNames}
        />
      </span>
    </Button>
  );
}

MarkButton.propTypes = {
  className: PropTypes.string,
  markTitle: PropTypes.string,
  unmarkTitle: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  marked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};
MarkButton.defaultProps = {
  className: undefined,
  markTitle: undefined,
  unmarkTitle: undefined,
};

export function PreviewButton({
  title,
  onClick,
  disabled,
  className,
}) {
  return (
    <Button
      className={classnames(styles.button, styles.svgBtn, className)}
      onClick={onClick}
      disabled={disabled}
    >
      <span title={title}>
        <PreviewIcon
          className={classnames(styles.svgFillIcon, (disabled ? styles.disabled : null))}
        />
      </span>
    </Button>
  );
}
PreviewButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  className: PropTypes.string,
};
PreviewButton.defaultProps = {
  className: undefined,
};

export default class ActionMenuList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entityModalVisible: false,
      deleteModalVisible: false,
      disableDelete: false,
      marking: false,
    };

    this.onMark = async () => {
      if (this.state.marking) {
        return;
      }
      this.setState({
        marking: true,
      });
      const { marked, onUnmark, onMark } = this.props;
      const onClick = marked ? onUnmark : onMark;
      try {
        await onClick();
      } catch (e) {
        //
      }
      this.setState({
        marking: false,
      });
    };
  }
  onCreateEnityModal = (entityType) => {
    this.props.onCreateEntity(entityType);
    this.closeEntityModal();
  }
  onCancelEntityModal = () => {
    this.closeEntityModal();
  }
  openEntityModal = () => {
    this.setState({
      entityModalVisible: true
    });
  }
  closeEntityModal = () => {
    this.setState({
      entityModalVisible: false
    });
  }
  onDelete = () => {
    this.props.onDelete();
    this.setState({
      disableDelete: true
    });
    this.onCloseDeleteModal();
  }
  openDeleteModal = () => {
    this.setState({
      deleteModalVisible: true,
    });
  }
  onCloseDeleteModal = () => {
    this.setState({
      deleteModalVisible: false,
    });
  }
  onCancelDelete = () => {
    this.onCloseDeleteModal();
  }

  preventEventPropogation = (e) => {
    if (e.target !== e.currentTarget) {
      e.stopPropagation();
    }
  }
  onPreview = () => {
    if (this.props.faxAttachment && this.props.faxAttachment.uri) {
      this.props.onPreview(this.props.faxAttachment.uri);
    }
  }
  _onDownloadClick = (e) => {
    if (this.props.disableLinks) {
      e.preventDefault();
    }
  }
  render() {
    const {
      className,
      currentLocale,
      onLog,
      isLogged,
      isLogging,
      isCreating,
      onViewEntity,
      onCreateEntity,
      hasEntity,
      onClickToDial,
      onClickToSms,
      phoneNumber,
      disableLinks,
      disableClickToDial,
      addLogTitle,
      editLogTitle,
      callTitle,
      textTitle,
      createEntityTitle,
      viewEntityTitle,
      onDelete,
      deleteTitle,
      onMark,
      marked,
      markTitle,
      unmarkTitle,
      previewTitle,
      downloadTitle,
      onPreview,
      faxAttachment,
      externalViewEntity,
      externalHasEntity,
      disableClickToSms,
    } = this.props;

    const logButton = onLog ?
      (
        <LogButton
          className={styles.button}
          onLog={onLog}
          disableLinks={disableLinks}
          isLogged={isLogged}
          isLogging={isLogging}
          currentLocale={currentLocale}
          addTitle={addLogTitle}
          editTitle={editLogTitle}
        />
      ) :
      null;

    let entityButton;
    if (externalViewEntity) {
      entityButton = externalHasEntity ? (<EntityButton
        className={styles.button}
        onViewEntity={externalViewEntity}
        hasEntity={externalHasEntity}
        disableLinks={disableLinks}
        viewEntityTitle={viewEntityTitle}
      />) : null;
    } else if (hasEntity && onViewEntity) {
      entityButton = (<EntityButton
        className={styles.button}
        onViewEntity={onViewEntity}
        hasEntity={hasEntity}
        disableLinks={disableLinks}
        viewEntityTitle={viewEntityTitle}
      />);
    } else if (!hasEntity && phoneNumber && onCreateEntity) {
      entityButton = (<EntityButton
        className={styles.button}
        onCreateEntity={this.openEntityModal}
        hasEntity={hasEntity}
        disableLinks={disableLinks}
        createEntityTitle={createEntityTitle}
      />);
    } else {
      entityButton = null;
    }

    const entityModal = (!hasEntity && phoneNumber) ?
      (<EntityModal
        currentLocale={currentLocale}
        show={this.state.entityModalVisible}
        onCreate={this.onCreateEnityModal}
        onCancel={this.onCancelEntityModal}
      />
      ) : null;


    const clickToDialButton = onClickToDial ?
      (
        <ClickToDialButton
          onClickToDial={onClickToDial}
          phoneNumber={phoneNumber}
          disableLinks={disableLinks}
          disableClickToDial={disableClickToDial}
          currentLocale={currentLocale}
          title={callTitle}
        />
      ) :
      null;
    const clickToSmsButton = onClickToSms ?
      (
        <ClickToSmsButton
          onClickToSms={onClickToSms}
          phoneNumber={phoneNumber}
          disableLinks={disableLinks || disableClickToSms}
          currentLocale={currentLocale}
          title={textTitle}
        />
      ) :
      null;
    const deleteButton = onDelete ?
      (
        <DeleteButton
          onDelete={onDelete}
          currentLocale={currentLocale}
          title={deleteTitle}
          openDeleteModal={this.openDeleteModal}
          disabled={this.state.disableDelete || disableLinks}
        />
      ) :
      null;

    const confirmDeleteModal = onDelete ?
      (
        <ConfirmDeleteModal
          currentLocale={currentLocale}
          show={this.state.deleteModalVisible}
          onDelete={this.onDelete}
          onCancel={this.onCancelDelete}
        />
      ) :
      null;
    const markButton = onMark ?
      (
        <MarkButton
          markTitle={markTitle}
          unmarkTitle={unmarkTitle}
          marked={marked}
          onClick={this.onMark}
          disabled={disableLinks}
        />
      ) :
      null;
    const previewButton = onPreview && faxAttachment && faxAttachment.uri ?
      (
        <PreviewButton
          title={previewTitle}
          onClick={this.onPreview}
          disabled={disableLinks}
        />
      ) : null;
    const downloadButton = faxAttachment && faxAttachment.uri ?
      (
        <div className={classnames(styles.button, styles.svgBtn, styles.svgFillIcon,
          disableLinks ? styles.disabled : null)} >
          <a
            target="_blank"
            download
            title={downloadTitle}
            href={faxAttachment.uri}
            onClick={this._onDownloadClick}
            disabled={disableLinks}
          >
            <DownloadIcon width={18} height={18} />
          </a>
        </div>
      ) : null;
    return (
      <div className={classnames(styles.root, className)} onClick={this.preventEventPropogation}>
        {clickToDialButton}
        {clickToSmsButton}
        {previewButton}
        {downloadButton}
        {entityButton}
        {logButton}
        {markButton}
        {deleteButton}
        {entityModal}
        {confirmDeleteModal}
      </div>
    );
  }
}

ActionMenuList.propTypes = {
  className: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  onLog: PropTypes.func,
  isLogged: PropTypes.bool,
  isLogging: PropTypes.bool,
  isCreating: PropTypes.bool,
  onViewEntity: PropTypes.func,
  onCreateEntity: PropTypes.func,
  hasEntity: PropTypes.bool,
  onClickToDial: PropTypes.func,
  onClickToSms: PropTypes.func,
  phoneNumber: PropTypes.string,
  disableLinks: PropTypes.bool,
  disableClickToDial: PropTypes.bool,
  addLogTitle: PropTypes.string,
  editLogTitle: PropTypes.string,
  textTitle: PropTypes.string,
  callTitle: PropTypes.string,
  createEntityTitle: PropTypes.string,
  viewEntityTitle: PropTypes.string,
  onDelete: PropTypes.func,
  deleteTitle: PropTypes.string,
  onMark: PropTypes.func,
  onUnmark: PropTypes.func,
  marked: PropTypes.bool,
  markTitle: PropTypes.string,
  unmarkTitle: PropTypes.string,
  previewTitle: PropTypes.string,
  downloadTitle: PropTypes.string,
  onPreview: PropTypes.func,
  faxAttachment: PropTypes.shape({
    uri: PropTypes.string,
  }),
  externalViewEntity: PropTypes.func,
  externalHasEntity: PropTypes.bool,
  disableClickToSms: PropTypes.bool,
};
ActionMenuList.defaultProps = {
  className: undefined,
  onLog: undefined,
  isLogged: false,
  isLogging: false,
  isCreating: false,
  onViewEntity: undefined,
  onCreateEntity: undefined,
  hasEntity: false,
  onClickToDial: undefined,
  onClickToSms: undefined,
  phoneNumber: undefined,
  disableLinks: false,
  disableClickToDial: false,
  addLogTitle: undefined,
  editLogTitle: undefined,
  textTitle: undefined,
  callTitle: undefined,
  createEntityTitle: undefined,
  viewEntityTitle: undefined,
  deleteTitle: undefined,
  onDelete: undefined,
  onMark: undefined,
  onUnmark: undefined,
  marked: false,
  markTitle: undefined,
  unmarkTitle: undefined,
  previewTitle: undefined,
  downloadTitle: undefined,
  onPreview: undefined,
  faxAttachment: undefined,
  externalViewEntity: undefined,
  externalHasEntity: undefined,
  disableClickToSms: false,
};
