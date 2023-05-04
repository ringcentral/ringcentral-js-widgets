import React, { Component } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import { extensionTypes } from '@ringcentral-integration/commons/enums/extensionTypes';
import messageTypes from '@ringcentral-integration/commons/enums/messageTypes';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import DeleteMessageIcon from '../../assets/images/DeleteMessageIcon.svg';
import DownloadIcon from '../../assets/images/Download.svg';
import MarkIcon from '../../assets/images/Mark.svg';
import PreviewIcon from '../../assets/images/Preview.svg';
import UnmarkIcon from '../../assets/images/Unmark.svg';
import { Button } from '../Button';
import EntityButton from '../EntityButton';
import EntityModal from '../EntityModal';
import LogButton from '../LogButton';
import Modal from '../Modal';
import i18n from './i18n';
import styles from './styles.scss';

export const ConfirmDeleteModal = ({
  currentLocale,
  show,
  onDelete,
  onCancel,
  type,
}: any) => {
  let tip;
  if (type === messageTypes.fax) {
    tip = i18n.getString('sureToDeleteFax', currentLocale);
  } else {
    tip = i18n.getString('sureToDeleteVoiceMail', currentLocale);
  }
  return (
    <Modal
      // @ts-expect-error TS(2322): Type '{ children: Element; show: any; currentLocal... Remove this comment to see the full error message
      show={show}
      currentLocale={currentLocale}
      onConfirm={onDelete}
      onCancel={onCancel}
    >
      <div className={styles.contentText}>{tip}</div>
    </Modal>
  );
};
ConfirmDeleteModal.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onDelete: PropTypes.func,
  onCancel: PropTypes.func,
  type: PropTypes.string,
};

ConfirmDeleteModal.defaultProps = {
  onDelete() {},
  onCancel() {},
  type: undefined,
};

export const ClickToDialButton = ({
  className,
  onClickToDial,
  disableCallButton,
  disableClickToDial,
  phoneNumber,
  title,
}: any) => {
  return (
    <Button
      className={classnames(styles.button, styles.clickToDialButton, className)}
      onClick={onClickToDial}
      dataSign={title}
      disabled={disableCallButton || disableClickToDial || !phoneNumber}
    >
      <span className={dynamicsFont.call} title={title} />
    </Button>
  );
};
ClickToDialButton.propTypes = {
  className: PropTypes.string,
  onClickToDial: PropTypes.func,
  disableCallButton: PropTypes.bool,
  disableClickToDial: PropTypes.bool,
  phoneNumber: PropTypes.string,
  title: PropTypes.string,
};
ClickToDialButton.defaultProps = {
  className: undefined,
  onClickToDial: undefined,
  disableCallButton: false,
  disableClickToDial: false,
  phoneNumber: undefined,
  title: undefined,
};

export const ClickToSmsButton = ({
  className,
  onClickToSms,
  disableLinks,
  phoneNumber,
  title,
}: any) => {
  return (
    <Button
      className={classnames(styles.button, styles.clickToSmsButton, className)}
      onClick={onClickToSms}
      dataSign="clickToSms"
      disabled={disableLinks || !phoneNumber}
    >
      <span className={dynamicsFont.composeText} title={title} />
    </Button>
  );
};
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

export const DeleteButton = ({
  className,
  title,
  openDeleteModal,
  disabled,
}: any) => {
  return (
    <Button
      className={classnames(styles.button, styles.svgBtn, className)}
      onClick={openDeleteModal}
      disabled={disabled}
      dataSign={title}
    >
      <span title={title}>
        <DeleteMessageIcon
          width={14}
          height={17}
          className={classnames(
            styles.svgFillIcon,
            disabled ? styles.disabled : null,
          )}
        />
      </span>
    </Button>
  );
};

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

export const MarkButton = ({
  marked,
  className,
  onClick,
  markTitle,
  unmarkTitle,
  disabled,
}: any) => {
  const Icon = marked ? UnmarkIcon : MarkIcon;
  const title = marked ? unmarkTitle : markTitle;
  const classNames = classnames(
    styles.unmarked,
    marked ? styles.svgFillIcon : null,
    disabled ? styles.disabled : null,
  );
  return (
    <Button
      className={classnames(styles.button, styles.svgBtn, className)}
      onClick={onClick}
      disabled={disabled}
      dataSign="mark"
    >
      <span title={title}>
        <Icon width={14} height={17} title={title} className={classNames} />
      </span>
    </Button>
  );
};

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

export const PreviewButton = ({ title, onClick, disabled, className }: any) => {
  return (
    <Button
      className={classnames(styles.button, styles.svgBtn, className)}
      onClick={onClick}
      disabled={disabled}
      dataSign={title}
    >
      <span title={title}>
        <PreviewIcon
          className={classnames(
            styles.svgFillIcon,
            disabled ? styles.disabled : null,
          )}
        />
      </span>
    </Button>
  );
};
PreviewButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  className: PropTypes.string,
};
PreviewButton.defaultProps = {
  className: undefined,
};

class ActionMenuList extends Component {
  onMark: any;
  constructor(props: any) {
    super(props);

    this.state = {
      entityModalVisible: false,
      deleteModalVisible: false,
      disableDelete: false,
      marking: false,
    };

    this.onMark = async () => {
      // @ts-expect-error TS(2339): Property 'marking' does not exist on type 'Readonl... Remove this comment to see the full error message
      if (this.state.marking) {
        return;
      }
      this.setState({
        marking: true,
      });
      // @ts-expect-error TS(2339): Property 'marked' does not exist on type 'Readonly... Remove this comment to see the full error message
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

  onCreateEnityModal = (entityType: any) => {
    // @ts-expect-error TS(2339): Property 'onCreateEntity' does not exist on type '... Remove this comment to see the full error message
    this.props.onCreateEntity(entityType);
    this.closeEntityModal();
  };

  onCancelEntityModal = () => {
    this.closeEntityModal();
  };

  openEntityModal = () => {
    this.setState({
      entityModalVisible: true,
    });
  };

  closeEntityModal = () => {
    this.setState({
      entityModalVisible: false,
    });
  };

  onDelete = () => {
    // @ts-expect-error TS(2339): Property 'onDelete' does not exist on type 'Readon... Remove this comment to see the full error message
    this.props.onDelete();
    this.setState({
      disableDelete: true,
    });
    this.onCloseDeleteModal();
  };

  openDeleteModal = () => {
    this.setState({
      deleteModalVisible: true,
    });
  };

  onCloseDeleteModal = () => {
    this.setState({
      deleteModalVisible: false,
    });
  };

  onCancelDelete = () => {
    this.onCloseDeleteModal();
  };

  preventEventPropagating = (e: any) => {
    if (e.target !== e.currentTarget) {
      e.stopPropagation();
    }
  };

  onPreview = () => {
    // @ts-expect-error TS(2339): Property 'faxAttachment' does not exist on type 'R... Remove this comment to see the full error message
    if (this.props.faxAttachment && this.props.faxAttachment.uri) {
      // @ts-expect-error TS(2339): Property 'onPreview' does not exist on type 'Reado... Remove this comment to see the full error message
      this.props.onPreview(this.props.faxAttachment.uri);
    }
  };

  _onDownloadClick = (e: any) => {
    // @ts-expect-error TS(2339): Property 'faxAttachment' does not exist on type 'R... Remove this comment to see the full error message
    const { faxAttachment, onFaxDownload, disableLinks } = this.props;
    if (disableLinks) {
      e.preventDefault();
    }
    if (onFaxDownload) {
      e.preventDefault();
      onFaxDownload({
        uri: faxAttachment.uri,
      });
    }
  };

  getEntityButton = () => {
    const {
      // @ts-expect-error TS(2339): Property 'hasEntity' does not exist on type 'Reado... Remove this comment to see the full error message
      hasEntity,
      // @ts-expect-error TS(2339): Property 'phoneNumber' does not exist on type 'Rea... Remove this comment to see the full error message
      phoneNumber,
      // @ts-expect-error TS(2339): Property 'disableLinks' does not exist on type 'Re... Remove this comment to see the full error message
      disableLinks,
      // @ts-expect-error TS(2339): Property 'onViewEntity' does not exist on type 'Re... Remove this comment to see the full error message
      onViewEntity,
      // @ts-expect-error TS(2339): Property 'onCreateEntity' does not exist on type '... Remove this comment to see the full error message
      onCreateEntity,
      // @ts-expect-error TS(2339): Property 'createEntityTitle' does not exist on typ... Remove this comment to see the full error message
      createEntityTitle,
      // @ts-expect-error TS(2339): Property 'viewEntityTitle' does not exist on type ... Remove this comment to see the full error message
      viewEntityTitle,
      // @ts-expect-error TS(2339): Property 'externalViewEntity' does not exist on ty... Remove this comment to see the full error message
      externalViewEntity,
      // @ts-expect-error TS(2339): Property 'externalHasEntity' does not exist on typ... Remove this comment to see the full error message
      externalHasEntity,
      // @ts-expect-error TS(2339): Property 'showChooseEntityModal' does not exist on... Remove this comment to see the full error message
      showChooseEntityModal,
      // @ts-expect-error TS(2339): Property 'shouldHideEntityButton' does not exist o... Remove this comment to see the full error message
      shouldHideEntityButton,
      // @ts-expect-error TS(2339): Property 'selectedMatchContactType' does not exist... Remove this comment to see the full error message
      selectedMatchContactType,
    } = this.props;

    if (shouldHideEntityButton) {
      return null;
    }

    if (externalViewEntity) {
      if (externalHasEntity) {
        return (
          <EntityButton
            className={styles.button}
            onViewEntity={externalViewEntity}
            hasEntity={externalHasEntity}
            disableLinks={disableLinks}
            viewEntityTitle={viewEntityTitle}
          />
        );
      }

      if (phoneNumber && onCreateEntity) {
        return (
          <EntityButton
            className={styles.button}
            onCreateEntity={
              showChooseEntityModal
                ? this.openEntityModal
                : () => onCreateEntity()
            }
            hasEntity={externalHasEntity}
            disableLinks={disableLinks}
            createEntityTitle={createEntityTitle}
          />
        );
      }

      return null;
    }

    const isIvrContact = selectedMatchContactType === extensionTypes.ivrMenu;

    if (hasEntity && onViewEntity && !isIvrContact) {
      return (
        <EntityButton
          className={styles.button}
          onViewEntity={onViewEntity}
          hasEntity={hasEntity}
          disableLinks={disableLinks}
          viewEntityTitle={viewEntityTitle}
        />
      );
    }

    if (!hasEntity && phoneNumber && onCreateEntity) {
      return (
        <EntityButton
          className={styles.button}
          onCreateEntity={
            showChooseEntityModal
              ? this.openEntityModal
              : () => onCreateEntity()
          }
          hasEntity={hasEntity}
          disableLinks={disableLinks}
          createEntityTitle={createEntityTitle}
        />
      );
    }

    return null;
  };

  override render() {
    const {
      // @ts-expect-error TS(2339): Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
      className,
      // @ts-expect-error TS(2339): Property 'type' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      type,
      // @ts-expect-error TS(2339): Property 'currentLocale' does not exist on type 'R... Remove this comment to see the full error message
      currentLocale,
      // @ts-expect-error TS(2339): Property 'onLog' does not exist on type 'Readonly<... Remove this comment to see the full error message
      onLog,
      // @ts-expect-error TS(2339): Property 'isLogged' does not exist on type 'Readon... Remove this comment to see the full error message
      isLogged,
      // @ts-expect-error TS(2339): Property 'isLogging' does not exist on type 'Reado... Remove this comment to see the full error message
      isLogging,
      // @ts-expect-error TS(2339): Property 'createEntityTypes' does not exist on typ... Remove this comment to see the full error message
      createEntityTypes,
      // @ts-expect-error TS(2339): Property 'hasEntity' does not exist on type 'Reado... Remove this comment to see the full error message
      hasEntity,
      // @ts-expect-error TS(2339): Property 'onClickToDial' does not exist on type 'R... Remove this comment to see the full error message
      onClickToDial,
      // @ts-expect-error TS(2339): Property 'onClickToSms' does not exist on type 'Re... Remove this comment to see the full error message
      onClickToSms,
      // @ts-expect-error TS(2339): Property 'phoneNumber' does not exist on type 'Rea... Remove this comment to see the full error message
      phoneNumber,
      // @ts-expect-error TS(2339): Property 'disableLinks' does not exist on type 'Re... Remove this comment to see the full error message
      disableLinks,
      // @ts-expect-error TS(2339): Property 'disableCallButton' does not exist on typ... Remove this comment to see the full error message
      disableCallButton,
      // @ts-expect-error TS(2339): Property 'disableClickToDial' does not exist on ty... Remove this comment to see the full error message
      disableClickToDial,
      // @ts-expect-error TS(2339): Property 'addLogTitle' does not exist on type 'Rea... Remove this comment to see the full error message
      addLogTitle,
      // @ts-expect-error TS(2339): Property 'editLogTitle' does not exist on type 'Re... Remove this comment to see the full error message
      editLogTitle,
      // @ts-expect-error TS(2339): Property 'callTitle' does not exist on type 'Reado... Remove this comment to see the full error message
      callTitle,
      // @ts-expect-error TS(2339): Property 'textTitle' does not exist on type 'Reado... Remove this comment to see the full error message
      textTitle,
      // @ts-expect-error TS(2339): Property 'onDelete' does not exist on type 'Readon... Remove this comment to see the full error message
      onDelete,
      // @ts-expect-error TS(2339): Property 'deleteTitle' does not exist on type 'Rea... Remove this comment to see the full error message
      deleteTitle,
      // @ts-expect-error TS(2339): Property 'onMark' does not exist on type 'Readonly... Remove this comment to see the full error message
      onMark,
      // @ts-expect-error TS(2339): Property 'marked' does not exist on type 'Readonly... Remove this comment to see the full error message
      marked,
      // @ts-expect-error TS(2339): Property 'markTitle' does not exist on type 'Reado... Remove this comment to see the full error message
      markTitle,
      // @ts-expect-error TS(2339): Property 'unmarkTitle' does not exist on type 'Rea... Remove this comment to see the full error message
      unmarkTitle,
      // @ts-expect-error TS(2339): Property 'previewTitle' does not exist on type 'Re... Remove this comment to see the full error message
      previewTitle,
      // @ts-expect-error TS(2339): Property 'downloadTitle' does not exist on type 'R... Remove this comment to see the full error message
      downloadTitle,
      // @ts-expect-error TS(2339): Property 'onPreview' does not exist on type 'Reado... Remove this comment to see the full error message
      onPreview,
      // @ts-expect-error TS(2339): Property 'faxAttachment' does not exist on type 'R... Remove this comment to see the full error message
      faxAttachment,
      // @ts-expect-error TS(2339): Property 'disableClickToSms' does not exist on typ... Remove this comment to see the full error message
      disableClickToSms,
      // @ts-expect-error TS(2339): Property 'externalHasEntity' does not exist on typ... Remove this comment to see the full error message
      externalHasEntity,
      // @ts-expect-error TS(2339): Property 'externalViewEntity' does not exist on ty... Remove this comment to see the full error message
      externalViewEntity,
      // @ts-expect-error TS(2339): Property 'externalViewEntity' does not exist on ty... Remove this comment to see the full error message
      extraButton,
    } = this.props;

    // @ts-expect-error TS(2339): Property 'deleteModalVisible' does not exist on ty... Remove this comment to see the full error message
    const { deleteModalVisible, disableDelete, entityModalVisible } =
      this.state;

    const logButton = onLog ? (
      <LogButton
        className={styles.button}
        onLog={onLog}
        disableLinks={disableLinks}
        isLogged={isLogged}
        isLogging={isLogging}
        // @ts-expect-error TS(2322): Type '{ className: string; onLog: any; disableLink... Remove this comment to see the full error message
        currentLocale={currentLocale}
        addTitle={addLogTitle}
        editTitle={editLogTitle}
      />
    ) : null;

    const entityButton = this.getEntityButton();
    const isMatched = externalViewEntity ? externalHasEntity : hasEntity;
    const entityModal =
      !isMatched && phoneNumber ? (
        <EntityModal
          currentLocale={currentLocale}
          entities={createEntityTypes}
          show={entityModalVisible}
          onCreate={this.onCreateEnityModal}
          onCancel={this.onCancelEntityModal}
        />
      ) : null;

    const clickToDialButton = onClickToDial ? (
      <ClickToDialButton
        onClickToDial={onClickToDial}
        phoneNumber={phoneNumber}
        // @ts-expect-error TS(2322): Type '{ onClickToDial: any; phoneNumber: any; disa... Remove this comment to see the full error message
        disableLinks={disableLinks}
        disableCallButton={disableLinks || disableCallButton}
        disableClickToDial={disableClickToDial}
        currentLocale={currentLocale}
        title={callTitle}
      />
    ) : null;
    const clickToSmsButton = onClickToSms ? (
      <ClickToSmsButton
        onClickToSms={onClickToSms}
        phoneNumber={phoneNumber}
        disableLinks={disableLinks || disableClickToSms}
        // @ts-expect-error TS(2322): Type '{ onClickToSms: any; phoneNumber: any; disab... Remove this comment to see the full error message
        currentLocale={currentLocale}
        title={textTitle}
      />
    ) : null;
    const deleteButton = onDelete ? (
      <DeleteButton
        // @ts-expect-error TS(2322): Type '{ onDelete: any; currentLocale: any; title: ... Remove this comment to see the full error message
        onDelete={onDelete}
        currentLocale={currentLocale}
        title={deleteTitle}
        openDeleteModal={this.openDeleteModal}
        disabled={disableDelete || disableLinks}
      />
    ) : null;

    const confirmDeleteModal = onDelete ? (
      <ConfirmDeleteModal
        currentLocale={currentLocale}
        show={deleteModalVisible}
        onDelete={this.onDelete}
        onCancel={this.onCancelDelete}
        type={type}
      />
    ) : null;
    const markButton = onMark ? (
      <MarkButton
        markTitle={markTitle}
        unmarkTitle={unmarkTitle}
        marked={marked}
        onClick={this.onMark}
        disabled={disableLinks}
      />
    ) : null;
    const previewButton =
      onPreview && faxAttachment && faxAttachment.uri ? (
        <PreviewButton
          title={previewTitle}
          onClick={this.onPreview}
          disabled={disableLinks}
        />
      ) : null;
    const downloadButton =
      faxAttachment && faxAttachment.uri ? (
        <div
          data-sign="download"
          className={classnames(
            styles.button,
            styles.svgBtn,
            styles.svgFillIcon,
            disableLinks ? styles.disabled : null,
          )}
        >
          <a
            target="_blank"
            download
            title={downloadTitle}
            href={`${faxAttachment.uri}&contentDisposition=Attachment`}
            onClick={this._onDownloadClick}
            // @ts-expect-error TS(2322): Type '{ children: Element; target: "_blank"; downl... Remove this comment to see the full error message
            disabled={disableLinks}
          >
            <DownloadIcon width={18} height={18} />
          </a>
        </div>
      ) : null;
    return (
      <div
        className={classnames(styles.root, className)}
        onClick={this.preventEventPropagating}
      >
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
        {extraButton}
      </div>
    );
  }
}

// @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
ActionMenuList.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  onLog: PropTypes.func,
  isLogged: PropTypes.bool,
  isLogging: PropTypes.bool,
  onViewEntity: PropTypes.func,
  onCreateEntity: PropTypes.func,
  createEntityTypes: PropTypes.array,
  hasEntity: PropTypes.bool,
  onClickToDial: PropTypes.func,
  onClickToSms: PropTypes.func,
  phoneNumber: PropTypes.string,
  disableLinks: PropTypes.bool,
  disableCallButton: PropTypes.bool,
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
  onFaxDownload: PropTypes.func,
  selectedMatchContactType: PropTypes.string,
  showChooseEntityModal: PropTypes.bool,
  shouldHideEntityButton: PropTypes.bool,
  extraButton: PropTypes.element,
};
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
ActionMenuList.defaultProps = {
  className: undefined,
  type: undefined,
  onLog: undefined,
  isLogged: false,
  isLogging: false,
  onViewEntity: undefined,
  onCreateEntity: undefined,
  createEntityTypes: undefined,
  hasEntity: false,
  onClickToDial: undefined,
  onClickToSms: undefined,
  phoneNumber: undefined,
  disableLinks: false,
  disableCallButton: false,
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
  onFaxDownload: undefined,
  selectedMatchContactType: '',
  showChooseEntityModal: true,
  shouldHideEntityButton: false,
  extraButton: undefined,
};

export default ActionMenuList;
