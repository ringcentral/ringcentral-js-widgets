import React, { Component } from 'react';

import ActionMenuList from '../ActionMenuList';
import SlideMenu from '../SlideMenu';

type ActionMenuProps = {
  extended?: boolean;
  onToggle?: (...args: any[]) => any;
  reference?: (...args: any[]) => any;
  className?: string;
  extendIconClassName?: string;
  currentLocale: string;
  onLog?: (...args: any[]) => any;
  isLogged?: boolean;
  isLogging?: boolean;
  isCreating?: boolean;
  onViewEntity?: (...args: any[]) => any;
  onCreateEntity?: (...args: any[]) => any;
  createEntityTypes?: any[];
  hasEntity?: boolean;
  onClickToDial?: (...args: any[]) => any;
  onClickToSms?: (...args: any[]) => any;
  phoneNumber?: string;
  disableLinks?: boolean;
  disableCallButton?: boolean;
  disableClickToDial?: boolean;
  addLogTitle?: string;
  editLogTitle?: string;
  textTitle?: string;
  callTitle?: string;
  createEntityTitle?: string;
  viewEntityTitle?: string;
  onDelete?: (...args: any[]) => any;
  deleteTitle?: string;
  onMark?: (...args: any[]) => any;
  onUnmark?: (...args: any[]) => any;
  marked?: boolean;
  markTitle?: string;
  externalViewEntity?: (...args: any[]) => any;
  externalHasEntity?: boolean;
  disableClickToSms?: boolean;
  withAnimation?: boolean;
  selectedMatchContactType?: string;
  showChooseEntityModal?: boolean;
  shouldHideEntityButton?: boolean;
};
class ActionMenu extends Component<ActionMenuProps, {}> {
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
      createEntityTypes,
      hasEntity,
      onClickToDial,
      onClickToSms,
      phoneNumber,
      disableLinks,
      disableCallButton,
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
      disableClickToSms,
      withAnimation,
      selectedMatchContactType,
      showChooseEntityModal,
      shouldHideEntityButton,
      extended,
      onToggle,
      extendIconClassName,
    } = this.props;
    return (
      <div ref={reference}>
        <SlideMenu
          extended={extended}
          onToggle={onToggle}
          className={className}
          extendIconClassName={extendIconClassName}
          minHeight={0}
          maxHeight={53}
          withAnimation={withAnimation}
        >
          <ActionMenuList
            onLog={onLog}
            isLogged={isLogged}
            isLogging={isLogging}
            isCreating={isCreating}
            selectedMatchContactType={selectedMatchContactType}
            onViewEntity={onViewEntity}
            onCreateEntity={onCreateEntity}
            createEntityTypes={createEntityTypes}
            hasEntity={hasEntity}
            onClickToDial={onClickToDial}
            onClickToSms={onClickToSms}
            phoneNumber={phoneNumber}
            disableLinks={disableLinks}
            disableCallButton={disableCallButton}
            shouldHideEntityButton={shouldHideEntityButton}
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
            disableClickToSms={disableClickToSms}
            showChooseEntityModal={showChooseEntityModal}
          />
        </SlideMenu>
      </div>
    );
  }
}
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
  externalViewEntity: undefined,
  externalHasEntity: undefined,
  disableClickToSms: false,
  withAnimation: true,
  selectedMatchContactType: '',
  showChooseEntityModal: true,
  shouldHideEntityButton: false,
};
export default ActionMenu;
