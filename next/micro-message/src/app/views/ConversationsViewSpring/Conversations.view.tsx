import { messageTypes } from '@ringcentral-integration/commons/enums/messageTypes';
import {
  messageIsFax,
  messageIsTextMessage,
} from '@ringcentral-integration/commons/lib/messageHelper';
import {
  AccountInfo,
  AppFeatures,
  type CallMadeLocation,
  ConnectivityManager,
  ConnectivityMonitor,
  RateLimiter,
  RegionSettings,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { ContactMatcher } from '@ringcentral-integration/micro-contacts/src/app/services';
import {
  Locale,
  type Theme,
  Toast,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  ConversationsSyncTabId,
  ModalView,
  slideInViewTransition,
  SyncTabId,
  SyncTabView,
} from '@ringcentral-integration/micro-core/src/app/views';
import { useContactRenderInfoFromConversation } from '@ringcentral-integration/micro-phone/src/app/hooks';
import type { Call } from '@ringcentral-integration/micro-phone/src/app/services';
import type { DialerView } from '@ringcentral-integration/micro-phone/src/app/views';
import { IntegrationConfig } from '@ringcentral-integration/micro-setting/src/app/services';
import {
  action,
  delegate,
  dynamic,
  fromWatchValue,
  injectable,
  optional,
  portal,
  PortManager,
  RcViewModule,
  RouterPlugin,
  state,
  takeUntilAppDestroy,
  UIFunctions,
  UIProps,
  useConnector,
} from '@ringcentral-integration/next-core';
import {
  HistoryAction,
  HistoryActionType,
} from '@ringcentral-integration/next-widgets/components/ActionMenuList/useHistoryActionButtons';
import React, { useMemo, useRef } from 'react';
import type { StateSnapshot } from 'react-virtuoso';
import { distinctUntilChanged, filter, tap } from 'rxjs';

import {
  buildToNumbersFromConversation,
  ComposeText,
  ConversationLogger,
  Conversations,
  type FilteredConversation,
  type FormattedConversation,
  getConversationNumbers,
  MessageThread,
  MessageSender,
  MessageStore,
  SmsConsent,
  SmsConversations,
  SmsOptOut,
  ThreadInfoRecord,
  VoicemailAudio,
} from '../../services';
import type { SmsConversationsOptions } from '../../services/Sms/SmsConversations.interface';
import { COMPOSE_TEXT_BACK_PATH } from '../ComposeTextViewSpring/ComposeText.view';
import { MessageThreadsView } from '../MessageThreadsView';
import { SmsConsentDialogView } from '../SmsConsentDialogView';

import type {
  ConversationsPanelSpringProps,
  ConversationsViewSpringOptions,
  ConversationsViewSpringProps,
} from './Conversations.view.interface';
import { ConversationsHeader, ConversationsPage } from './ConversationsPage';
import { ConversationsTabsView } from './ConversationsTabs.view';
import type { ConversationsViewableManager } from './ConversationsViewableManager';
import { t } from './i18n';

const dangerButtonProps = {
  color: 'danger',
};

const getConversationSenderPhoneNumber = (
  conversation: FormattedConversation | undefined,
) => {
  if (!conversation) {
    return undefined;
  }
  return (
    (conversation.direction === 'Outbound'
      ? conversation.from?.phoneNumber
      : conversation.to?.[0]?.phoneNumber) || conversation.self?.phoneNumber
  );
};

@injectable({
  name: 'ConversationsViewSpring',
})
export class ConversationsViewSpring extends RcViewModule {
  @dynamic('ConversationsViewableManager')
  private _conversationsViewableManager?: ConversationsViewableManager;

  @dynamic('MessageThreadsView')
  protected _messageThreadsView?: MessageThreadsView;

  @dynamic('MessageSender')
  protected _messageSender?: MessageSender;

  @dynamic('AccountInfo')
  protected _accountInfo?: AccountInfo;

  @dynamic('SmsConsent')
  protected _smsConsent?: SmsConsent;

  @dynamic('SmsConsentDialogView')
  protected _smsConsentDialogView?: SmsConsentDialogView;

  @portal
  private confirmDeleteModal = this._modalView.create<{
    conversation: FilteredConversation;
  }>({
    props: ({ conversation }) => {
      const isFax = messageIsFax(conversation);
      return {
        variant: 'confirm',
        loadingMode: 'button',
        header: t(isFax ? 'deleteFax' : 'deleteVoiceMail'),
        content: t(isFax ? 'sureToDeleteFax' : 'sureToDeleteVoiceMail'),
        confirmButtonText: t('delete'),
        // avoid the action menu be focus back, because that already be hidden
        disableBackdropClick: false,
        disableRestoreFocus: true,
        confirmButtonProps: dangerButtonProps,
        onConfirm: () => {
          const conversationId = conversation.conversationId;
          if (!conversationId) return;
          this._conversations.deleteConversation(conversationId);
        },
        ['data-sign']: 'deleteModal',
      };
    },
  });

  private get disableLinks() {
    return (
      this._connectivityManager.isOfflineMode ||
      this._connectivityManager.isVoipOnlyMode ||
      this._rateLimiter.restricted
    );
  }

  @dynamic('Theme')
  private _theme?: Theme;

  constructor(
    protected _modalView: ModalView,
    protected _locale: Locale,
    protected _conversations: Conversations,
    protected _regionSettings: RegionSettings,
    protected _appFeatures: AppFeatures,
    protected _connectivityMonitor: ConnectivityMonitor,
    protected _rateLimiter: RateLimiter,
    protected _messageStore: MessageStore,
    protected _connectivityManager: ConnectivityManager,
    protected _router: RouterPlugin,
    protected _toast: Toast,
    protected _composeText: ComposeText,
    protected _portManager: PortManager,
    protected _voicemailAudio: VoicemailAudio,
    protected _integrationConfig: IntegrationConfig,
    protected _smsConversations: SmsConversations,
    protected _conversationsTabsView: ConversationsTabsView,
    protected _syncTabView: SyncTabView,
    @optional() protected _contactMatcher?: ContactMatcher,
    @optional() protected _conversationLogger?: ConversationLogger,
    @optional() protected _messageThread?: MessageThread,
    @optional() protected _smsOptOut?: SmsOptOut,
    @optional('ConversationsViewOptions')
    protected _conversationsViewOptions?: ConversationsViewSpringOptions,
    @optional('SmsConversationsOptions')
    protected _smsConversationsOptions?: SmsConversationsOptions,
  ) {
    super();

    if (this._portManager.shared) {
      this._portManager.onServer(() => {
        this.bindClearSearchInputListener();
      });
    } else {
      this.bindClearSearchInputListener();
    }
  }

  private bindClearSearchInputListener() {
    fromWatchValue(this, () => this._router.currentPath)
      .pipe(
        filter((currentPath) =>
          ['/fax', '/messages', '/dialer'].includes(currentPath),
        ),
        distinctUntilChanged(),
        tap(() => {
          this._conversations.updateSearchInput('');
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  @dynamic('Call')
  protected readonly _call?: Call;

  @dynamic('DialerView')
  protected readonly _dialerView?: DialerView;

  @state
  lastPosition: Record<string, StateSnapshot | undefined> = {};

  @action
  private _setLastPosition(page: string, val?: StateSnapshot) {
    this.lastPosition[page] = val;
  }

  @delegate('server')
  async setLastPosition(page: string, val?: StateSnapshot) {
    this._setLastPosition(page, val);
  }

  private _alertSuccess(message: string, ttl?: number) {
    this._toast.success({
      message,
      allowDuplicates: false,
      ttl,
    });
  }

  async replyInSharedTab(conversation: FormattedConversation | undefined) {
    const fromNumber = getConversationSenderPhoneNumber(conversation);
    const toNumbers = buildToNumbersFromConversation(
      conversation,
      this._smsConversationsOptions?.dncEntityTypes,
    );
    const toNumber = toNumbers[0]?.phoneNumber;

    if (fromNumber && toNumber) {
      const threadId = this._messageThread?.getLatestThreadIdByParties(
        fromNumber,
        toNumber,
      );
      if (threadId) {
        this._syncTabView.setActive(
          SyncTabId.CONVERSATIONS,
          ConversationsSyncTabId.SHARED,
          { currentPath: `/conversations/${threadId}` },
        );
        return;
      }
    }

    await this._composeText.clean();

    await this._router.push('/composeText', {
      [COMPOSE_TEXT_BACK_PATH]: this._router.currentPath,
    });

    await Promise.all([
      fromNumber && this._composeText.updateSenderNumber(fromNumber),
      toNumbers.length > 0 && this._composeText.addToNumbers(toNumbers),
    ]);
  }

  useConversationItemInfo = (
    conversation: FilteredConversation,
    {
      pageType = 'list',
    }: { pageType?: 'list' | 'text' | 'voicemail' | 'fax' } = {},
  ): {
    info: ReturnType<typeof useContactRenderInfoFromConversation>;
    actions: HistoryAction[];
    extensionId?: string;
    threadInfo?: ThreadInfoRecord;
  } => {
    const beTextMessage = messageIsTextMessage(conversation);
    const conversationLogId = conversation.conversationLogId;
    const {
      disableLinks,
      isOfflineMode,
      isWebphoneUnavailableMode,
      isWebphoneInitializing,
      restricted,
      isIdle,
      hasInternalSMSPermission,
      hasOutboundSMSPermission,
      hasSmsPermission,
      canReadConsent,
      isCallingEnabled,
      displayCRMLog,
      isLogged,
      autoLog,
    } = useConnector(() => ({
      disableLinks: this.disableLinks,
      isOfflineMode: this._connectivityManager.isOfflineMode,
      isWebphoneUnavailableMode:
        this._connectivityManager.isWebphoneUnavailableMode,
      isWebphoneInitializing: this._connectivityManager.isWebphoneInitializing,
      restricted: this._rateLimiter.restricted,
      isIdle: Boolean(this._call && this._call.isIdle),
      hasInternalSMSPermission: this._appFeatures.hasInternalSMSPermission,
      hasOutboundSMSPermission: this._appFeatures.hasOutboundSMSPermission,
      hasSmsPermission:
        this._messageSender?.hasSmsPermission ??
        this._appFeatures.hasComposeTextPermission, // for backward compatibility, if MessageSender not exist, fallback to appFeatures
      canReadConsent: this._smsConsent?.canReadConsent ?? false,
      isCallingEnabled: this._appFeatures.isCallingEnabled,
      displayCRMLog: this._smsConversations.checkIsSupportLog(conversation),
      isLogged:
        // only text message able to log to avoid accidental match the dataMapping
        beTextMessage &&
        !!conversationLogId &&
        this._conversationLogger?.getIsInLoggedStatus(conversationLogId),
      autoLog:
        !!this._conversationLogger?.autoLog ||
        !!this._conversationLogger?.serverAutoLog,
    }));

    const {
      threadInfo,
      extensionId,
      actions: threadActions = [],
    } = this._messageThreadsView?.useThreadConversationItemInfo(conversation) ??
    {};

    const isOptOut =
      this._smsOptOut?.getIsOptOutConversation(conversation) ?? false;

    const info = useContactRenderInfoFromConversation(conversation, {
      timePresentationMode: 'withoutTime',
      displayLogStatus: displayCRMLog,
      hasCrmLogged: isLogged,
      phoneNumberDisplayMode: pageType !== 'list' ? 'unknown' : 'phoneNumber',
      isOptOut,
    });
    const {
      isTextMessage,
      isFax,
      isVoicemail,
      voicemailAttachmentExist,
      voicemailAttachmentUri,
      markAble,
      unreadCounts,
      faxAttachmentExist,
      signalTo,
      faxAttachmentDownloadUri,
      signalSourceInfo,
      formattedPhoneNumber,
      matchedContact,
    } = info;
    const canManageConsent =
      (pageType === 'list' || pageType === 'text') &&
      isTextMessage &&
      canReadConsent &&
      signalTo &&
      !!getConversationNumbers(conversation);

    const actions = useMemo(() => {
      const enableModifyLog = this._smsConversationsOptions?.enableModifyLog;

      const actions: HistoryAction[] = [];

      // CRM Log actions - available on all page types
      if (
        (pageType === 'list' || pageType === 'text') &&
        displayCRMLog &&
        signalTo
      ) {
        if (autoLog && !enableModifyLog) {
          actions.push({
            type: 'selectRecordsForAutoLog',
            disabled: disableLinks,
          });
        } else {
          if (!isLogged || enableModifyLog) {
            actions.push({
              type: 'createLog',
              disabled: disableLinks,
            });
          }
        }

        if (isLogged && !enableModifyLog) {
          actions.push({
            type: 'viewLog',
            disabled: disableLinks,
            label:
              this._integrationConfig.name &&
              t('viewInCrm', {
                crmName: this._integrationConfig.name,
              }),
          });
        }
      }
      // Fax actions - available on all page types
      if (pageType === 'list' && faxAttachmentExist) {
        actions.push(
          {
            type: 'viewFax',
            disabled: disableLinks,
            href: faxAttachmentDownloadUri,
          },
          {
            type: 'downloadFax',
            disabled: disableLinks,
            href: faxAttachmentDownloadUri,
          },
        );
      }

      // Phone number actions - available on all page types
      if (signalTo) {
        if (
          (pageType === 'list' || pageType === 'voicemail') &&
          !isFax &&
          formattedPhoneNumber &&
          isCallingEnabled
        ) {
          actions.push({
            type: 'call',
            disabled:
              isOfflineMode ||
              isWebphoneUnavailableMode ||
              isWebphoneInitializing ||
              restricted ||
              !isIdle ||
              disableLinks,
          });
        }

        if (
          (pageType === 'list' || pageType === 'voicemail') &&
          !isFax &&
          !isTextMessage &&
          formattedPhoneNumber &&
          hasSmsPermission
        ) {
          actions.push({
            type: 'text',
            disabled:
              disableLinks ||
              (signalSourceInfo?.extensionNumber
                ? !hasInternalSMSPermission
                : !hasOutboundSMSPermission),
          });
        }

        // Use the normalized phone number (not formatted) for dataMapping lookup
        // dialToPhoneNumber should be the normalized number, not the formatted display version
        const dialToPhoneNumber =
          signalSourceInfo?.phoneNumber || signalSourceInfo?.extensionNumber;
        const integrateActions = this._integrationConfig.getActionButtons({
          dialToPhoneNumber: dialToPhoneNumber,
          matchedContact: matchedContact,
          disabled: disableLinks,
          isLogged,
        });
        actions.push(...integrateActions);
      }

      if (canManageConsent) {
        actions.push({
          type: pageType === 'list' ? 'manageConsent' : 'viewConsent',
          disabled: disableLinks,
        });
      }

      // Mark actions - only available on list page
      if (pageType === 'list' && markAble) {
        actions.push({
          type: unreadCounts === 0 ? 'mark' : 'unmark',
          disabled: disableLinks,
        });
      }

      // Voicemail actions - available on all page types
      if (pageType === 'list' && isVoicemail && voicemailAttachmentExist) {
        actions.push({
          type: 'downloadVoicemail',
          href: voicemailAttachmentUri,
          disabled: disableLinks,
        });
      }

      // Copy number action - available on all page types
      if (pageType === 'list' && formattedPhoneNumber) {
        actions.push({
          type: 'copyNumber',
        });
      }
      // Delete action - only available on detail pages
      if (pageType === 'list' && (isVoicemail || isFax)) {
        actions.push({
          type: 'delete',
          disabled: disableLinks,
        });
      }

      // add the thread actions into conversation actions
      actions.push(...threadActions);

      return actions;
    }, [
      pageType,
      displayCRMLog,
      signalTo,
      faxAttachmentExist,
      markAble,
      isVoicemail,
      voicemailAttachmentExist,
      formattedPhoneNumber,
      isFax,
      threadActions,
      autoLog,
      isLogged,
      disableLinks,
      faxAttachmentDownloadUri,
      isTextMessage,
      canManageConsent,
      matchedContact,
      isOfflineMode,
      isWebphoneUnavailableMode,
      isWebphoneInitializing,
      restricted,
      isIdle,
      signalSourceInfo?.extensionNumber,
      signalSourceInfo?.phoneNumber,
      hasInternalSMSPermission,
      hasOutboundSMSPermission,
      hasSmsPermission,
      isCallingEnabled,
      unreadCounts,
      voicemailAttachmentUri,
    ]);

    return {
      info,
      actions,
      extensionId,
      threadInfo,
    };
  };

  useActionsHandler = (
    conversation: FilteredConversation,
    info: ReturnType<typeof useContactRenderInfoFromConversation>,
    location: CallMadeLocation,
  ) => {
    // TODO: select contact auto log when autoLog be enable

    const conversationId = conversation.conversationId;
    return async <T extends HistoryActionType>(actionType: T, data?: any) => {
      this.logger.log(`exec actionType`, actionType, conversation);
      const { signalSourceInfo, matchedContact, isTextMessage, isVoicemail } =
        info;

      switch (actionType) {
        case 'viewDetail':
          // TODO: the fax type of viewDetail should also be handle
          if (isTextMessage || isVoicemail) {
            await slideInViewTransition(async () => {
              if (isTextMessage) {
                await this._smsConversationsOptions?.checkDncStatusOfConversation?.(
                  conversationId!,
                );

                await this._router.push(`/conversations/${conversationId}`);
                return;
              }

              if (isVoicemail) {
                await this._router.push(`/voicemails/${conversationId}`);
                return;
              }
            }, this._theme?.reducedMotion);
          }
          break;
        case 'addEntity':
          this._integrationConfig.onCreateEntity?.(signalSourceInfo);
          break;
        case 'viewLog':
          this._integrationConfig.onViewLog?.(data || matchedContact);
          break;
        case 'viewEntity':
          this._integrationConfig.onViewEntity?.(matchedContact, {
            conversation,
          });
          break;
        case 'createLog':
        case 'selectRecordsForAutoLog':
          if (conversationId) {
            this._integrationConfig?.onCreateLog?.(conversationId, actionType);
          }
          break;
        case 'call':
          {
            const actionInfo = info.getActionInfo();

            if (actionInfo && this._dialerView) {
              this._dialerView.trackCallingEvent(location);
              this._dialerView.call({ recipient: actionInfo });

              this._messageStore.onClickToCall({
                // for track conversation.type
                fromType: conversation.type,
              });

              this._router.push('/dialer', {
                [SyncTabId.DIALPAD]: 'keypad',
              });
            } else if (process.env.NODE_ENV !== 'production') {
              this.logger.error('can\'t handle "call" action', {
                signalSourceInfo,
                matchedContact,
                conversation,
              });
            }
          }
          break;
        case 'text': {
          const actionInfo = info.getActionInfo();
          if (actionInfo) {
            this._composeText?.addToNumber(actionInfo);

            this._router.push('/composeText');
            // for track
            this._messageStore.onClickToSMS();
          } else if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.error('[ConversationsView], can\'t handle "call" action', {
              signalSourceInfo,
              matchedContact,
              conversation,
            });
          }
          break;
        }
        case 'viewConsent':
        case 'manageConsent': {
          const numbers = getConversationNumbers(conversation);
          if (!numbers) return;

          await this._smsConsentDialogView?.viewConsentDetails({
            numbers,
            contactName: info.matchedContact?.name,
            consentEntry:
              actionType === 'viewConsent' ? 'Text conversation' : 'Text list',
          });
          break;
        }
        case 'mark':
          if (!conversationId) return;
          this._messageStore.unreadMessage(conversationId);
          break;
        case 'read':
          this._messageStore.readMessages(conversationId);
          break;
        case 'unmark':
          this._messageStore.readMessages(conversationId);
          this._messageStore.onUnmarkMessages();

          break;
        case 'delete':
          if (!conversationId) return;
          this._modalView.open(this.confirmDeleteModal, {
            conversation,
          });

          break;
        case 'viewFax':
          {
            if (!info.faxAttachmentUri) return;

            window.open(info.faxAttachmentUri);
            this._messageStore.readMessages(conversationId);
          }
          break;
        case 'downloadFax':
          // for download also mark as read done
          this._messageStore.readMessages(conversationId);
          break;
        case 'downloadVoicemail': {
          this._voicemailAudio.download(
            conversationId,
            info.voicemailAttachmentUri,
          );

          break;
        }
        case 'copyNumber': {
          const result = info.copyNumber();
          if (result) {
            this._alertSuccess(result);
          }
          break;
        }

        default: {
          // if both of action is not basic action, process the action in message threads view
          const result = await this._messageThreadsView?.processThreadAction(
            conversationId,
            actionType,
          );
          // if still not catch the action, log the error
          if (!result) {
            this.logger.warn(`can't handle "${actionType}" action`);
          }
        }
      }
    };
  };

  getUIProps({
    typeFilter,
  }: ConversationsViewSpringProps): UIProps<ConversationsPanelSpringProps> {
    const readStatusFilter =
      this._conversations.readStatusFilterMap[typeFilter];
    const smsPermissionReason =
      typeFilter === 'Text' && this._accountInfo?.isTCRSupported
        ? (this._messageSender?.smsPermissionReason ?? null)
        : null;
    const hasSmsPermission =
      this._messageSender?.hasSmsPermission ??
      this._appFeatures.hasComposeTextPermission;
    const isNewButtonDisabled =
      typeFilter === 'Text' ? !hasSmsPermission : false;
    return {
      lastPosition: this.lastPosition[`${typeFilter}-${readStatusFilter}`],
      preparing: !(
        this._locale.ready &&
        this._conversations.ready &&
        (!this._contactMatcher || this._contactMatcher.ready) &&
        this._regionSettings.ready &&
        this._appFeatures.ready &&
        this._connectivityMonitor.ready &&
        this._rateLimiter.ready &&
        (!this._call || this._call.ready) &&
        (!this._conversationLogger || this._conversationLogger.ready)
      ),
      searchInput: this._conversations.searchInput,
      typeFilter,
      readStatusFilter,
      showNewButton:
        // do not block new text entry for current stage
        typeFilter === 'Text'
          ? true
          : typeFilter === 'Fax'
            ? this._appFeatures.hasSendFaxPermission
            : false,
      newButtonDisabled: isNewButtonDisabled,
      smsPermissionReason,
      conversations:
        this._conversations.typeFilteredConversationsMap[typeFilter],
      loadingNextPage: this._conversations.loadingOldConversations,
      crmName: this._integrationConfig.name,
      showLogPopover: this._conversationsViewOptions?.showLogPopover,
      disableLinks: this.disableLinks,
      createNewEntityTooltip: this._integrationConfig.createNewEntityTooltip,
    };
  }

  getUIFunctions(
    _: ConversationsViewSpringProps,
  ): UIFunctions<ConversationsPanelSpringProps> {
    return {
      setLastPosition: (page, position) => {
        this.setLastPosition(page, position);
      },
      useConversationItemInfo: (conversation: FilteredConversation) =>
        this.useConversationItemInfo(conversation, { pageType: 'list' }),
      useActionsHandler: this.useActionsHandler,
      useItemRender: this._conversationsViewableManager?.useItemRender,
      onNewClick: (type) => {
        switch (type) {
          case 'Text':
            this._router.push('/composeText');
            break;
          case 'Fax':
            this._router.push('/composeFax');
            break;

          default:
            break;
        }
      },
      updateReadStatusFilterMap: (status, type) => {
        this._conversations.updateReadStatusFilterMap(status, type!);
      },
      onSearchInputChange: (e) => {
        this._conversations.updateSearchInput(e.currentTarget.value);
      },
    };
  }

  component(props: ConversationsViewSpringProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });

    const PersonalComponent =
      this._conversationsViewOptions?.component || ConversationsPage;

    const header = <ConversationsHeader {..._props} {...uiFunctions} />;
    const children = <PersonalComponent {..._props} {...uiFunctions} />;

    const isText = props.typeFilter === messageTypes.text;

    if (!isText) {
      return (
        <>
          {header}
          {children}
        </>
      );
    }

    return (
      <>
        {header}
        <this._conversationsTabsView.component {...uiFunctions}>
          {children}
        </this._conversationsTabsView.component>
      </>
    );
  }
}

export type UseConversationsActions = InstanceType<
  typeof ConversationsViewSpring
>['useActionsHandler'];

export type OnConversationsActionsType = ReturnType<UseConversationsActions>;
