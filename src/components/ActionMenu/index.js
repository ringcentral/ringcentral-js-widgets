import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SlideMenu from '../SlideMenu';
import Modal from '../Modal';
import EntityButton from '../EntityButton';
import EntityModal from '../EntityModal';
import Button from '../Button';
import LogButton from '../LogButton';
import DeleteMessageIcon from '../../assets/images/DeleteMessageIcon.svg';
import CloseIcon from '../../assets/images/CloseIcon.svg';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import i18n from './i18n';
import styles from './styles.scss';

function ConfirmDeleteModal({
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
      className={styles.confirmDeleteModal}
      modalClassName={styles.confirmDeleteModal}
      cancelBtnClassName={styles.cancelBtn}
      confirmBtnClassName={styles.confirmBtn}
      closeBtn={
        <Button
          className={styles.closeBtn}
          onClick={onCancel}
         >
          <CloseIcon />
        </Button>
      }
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
  onDelete: () => {},
  onCancel: () => {}
};

function ClickToDialButton({
  className,
  onClickToDial,
  disableLinks,
  disableClickToDial,
  phoneNumber,
  title,
}) {
  return (
    <Button
      className={className}
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

function ClickToSmsButton({
  className,
  onClickToSms,
  disableLinks,
  phoneNumber,
  title,
}) {
  return (
    <Button
      className={className}
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

function DeleteButton({
  className,
  title,
  openDeleteModal,
}) {
  return (
    <Button
      className={className}
      onClick={openDeleteModal} >
      <DeleteMessageIcon
        title={title}
      />
    </Button>
  );
}

DeleteButton.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  openDeleteModal: PropTypes.func,
};
DeleteButton.defaultProps = {
  className: undefined,
  title: undefined,
  openDeleteModal: () => {},
};

export default class ActionMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entityModalVisible: false,
      deleteModalVisible: false,
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
    this.onCancelDelete();
  }
  openDeleteModal = () => {
    this.setState({
      deleteModalVisible: true,
    });
  }
  onCancelDelete = () => {
    this.setState({
      deleteModalVisible: false,
    });
  }

  preventEventPropogation = (e) => {
    if (e.target !== e.currentTarget) {
      e.stopPropagation();
    }
  }

  render() {
    const {
      reference,
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
      enableDelete,
      onDelete,
      deleteTitle,
    } = this.props;

    const logButton = onLog ?
      (
        <LogButton
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
    if (hasEntity && onViewEntity) {
      entityButton = (<EntityButton
        onViewEntity={onViewEntity}
        hasEntity={hasEntity}
        disableLinks={disableLinks}
        viewEntityTitle={viewEntityTitle}
      />);
    } else if (!hasEntity && phoneNumber && onCreateEntity) {
      entityButton = (<EntityButton
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
          disableLinks={disableLinks}
          currentLocale={currentLocale}
          title={textTitle}
        />
      ) :
      null;
    const deleteButton = enableDelete ?
      (
        <DeleteButton
          onDelete={onDelete}
          currentLocale={currentLocale}
          title={deleteTitle}
          openDeleteModal={this.openDeleteModal}
        />
      ) :
      null;

    const confirmDeleteModal = enableDelete ?
      (
        <ConfirmDeleteModal
          currentLocale={currentLocale}
          show={this.state.deleteModalVisible}
          onDelete={this.onDelete}
          onCancel={this.onCancelDelete}
        />
      ) :
      null;
    return (
      <div ref={reference}>
        <SlideMenu
          extended={this.props.extended}
          onToggle={this.props.onToggle}
          className={className}
          extendIconClassName={this.props.extendIconClassName}
          minHeight={0}
          maxHeight={30}
        >
          <div onClick={this.preventEventPropogation}>
            {clickToDialButton}
            {clickToSmsButton}
            {entityButton}
            {logButton}
            {deleteButton}
          </div>
        </SlideMenu>
        {entityModal}
        {confirmDeleteModal}
      </div>
    );
  }
}

ActionMenu.propTypes = {
  extended: PropTypes.bool,
  onToggle: PropTypes.func,
  reference: PropTypes.func,
  className: PropTypes.string,
  extendIconClassName: PropTypes.string,
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
  enableDelete: PropTypes.bool,
  onDelete: PropTypes.func,
  deleteTitle: PropTypes.string,
};
ActionMenu.defaultProps = {
  extended: undefined,
  onToggle: undefined,
  reference: undefined,
  className: undefined,
  extendIconClassName: undefined,
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
  enableDelete: false,
  onDelete: () => {},
};
