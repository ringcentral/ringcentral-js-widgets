import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SlideMenu from '../SlideMenu';
import ActionMenuList from '../ActionMenuList';

export default class ActionMenu extends Component {
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
      onDelete,
      deleteTitle,
      onMark,
      onUnmark,
      marked,
      markTitle,
      externalViewEntity,
      externalHasEntity,
    } = this.props;
    return (
      <div ref={reference}>
        <SlideMenu
          extended={this.props.extended}
          onToggle={this.props.onToggle}
          className={className}
          extendIconClassName={this.props.extendIconClassName}
          minHeight={0}
          maxHeight={53}
        >
          <ActionMenuList
            onLog={onLog}
            isLogged={isLogged}
            isLogging={isLogging}
            isCreating={isCreating}
            onViewEntity={onViewEntity}
            onCreateEntity={onCreateEntity}
            hasEntity={hasEntity}
            onClickToDial={onClickToDial}
            onClickToSms={onClickToSms}
            phoneNumber={phoneNumber}
            disableLinks={disableLinks}
            disableClickToDial={disableClickToDial}
            addLogTitle={addLogTitle}
            editLogTitle={editLogTitle}
            textTitle={textTitle}
            callTitle={callTitle}
            createEntityTitle={createEntityTitle}
            viewEntityTitle={viewEntityTitle}
            currentLocale={currentLocale}
            onDelete={onDelete}
            deleteTitle={deleteTitle}
            onMark={onMark}
            onUnmark={onUnmark}
            marked={marked}
            markTitle={markTitle}
            externalViewEntity={externalViewEntity}
            externalHasEntity={externalHasEntity}
          />
        </SlideMenu>
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
  onDelete: PropTypes.func,
  deleteTitle: PropTypes.string,
  onMark: PropTypes.func,
  onUnmark: PropTypes.func,
  marked: PropTypes.bool,
  markTitle: PropTypes.string,
  externalViewEntity: PropTypes.func,
  externalHasEntity: PropTypes.bool,
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
  onDelete: undefined,
  onMark: undefined,
  onUnmark: undefined,
  marked: false,
  markTitle: undefined,
  externalViewEntity: undefined,
  externalHasEntity: undefined,
};
