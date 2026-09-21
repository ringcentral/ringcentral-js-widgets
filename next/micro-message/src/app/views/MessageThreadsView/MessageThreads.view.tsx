import { Auth } from '@ringcentral-integration/micro-auth/src/app/services';
import { ContactAvatar } from '@ringcentral-integration/micro-contacts/src/app/components';
import contactsI18n from '@ringcentral-integration/micro-contacts/src/app/views/ContactSearchView/ContactSearchPanel/i18n';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { Toast } from '@ringcentral-integration/micro-core/src/app/services';
import {
  ModalView,
  useModalItemView,
} from '@ringcentral-integration/micro-core/src/app/views';
import { CallQueues } from '@ringcentral-integration/micro-phone/src/app/services';
import {
  action,
  autobind,
  computed,
  delegate,
  fromWatchValue,
  injectable,
  logger,
  portal,
  PortManager,
  RcViewModule,
  RouterPlugin,
  state,
  takeUntilAppDestroy,
  UIFunctions,
  type UIProps,
  useConnector,
} from '@ringcentral-integration/next-core';
import {
  type HistoryAction,
  type HistoryActionType,
} from '@ringcentral-integration/next-widgets/components';
import { SearchMd, Xmd } from '@ringcentral/spring-icon';
import {
  CircularProgressIndicator,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  TextField,
  useResultRef,
} from '@ringcentral/spring-ui';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import type { StateSnapshot } from 'react-virtuoso';
import {
  distinctUntilChanged,
  EMPTY,
  filter,
  map,
  merge,
  switchMap,
  tap,
} from 'rxjs';

import { type FilteredConversation, MessageThread } from '../../services';
import conversationsI18n from '../ConversationsViewSpring/ConversationsPage/i18n';
import { ConversationAlert } from '../ConversationViewSpring/ConversationAlert';

import i18n, { t } from './i18n';
import { MessageThreadPage } from './MessageThreadPage';
import messageThreadsI18n from './MessageThreadPage/i18n';
import type {
  MessageThreadPanelSelfProps,
  MessageThreadsViewProps,
  SharedSearchForm,
} from './MessageThreads.view.interface';
import { assignmentOptionMap, assignmentOptions } from './utils';

const loadingList = [1, 2, 3];

@injectable({
  name: 'MessageThreadsView',
})
export class MessageThreadsView extends RcViewModule {
  @portal
  private assignThreadModal = this._modalView.create<{ threadId: string }>({
    view: () => <this.AssignThreadModalContent />,
    props: ({ threadId }) => ({
      header: null,
      disableBackdropClick:
        this._messageThread.getThreadMetadata(threadId)?.loading ?? false,
      disableRestoreFocus: true,
      'aria-label': 'Assign conversation to',
    }),
  });

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

  @state
  sharedSearchForm: SharedSearchForm = {
    searchInput: '',
    filter: 'All',
    statusFilter: ['Open', 'Resolved'],
    selectedAssignees: [
      '__CURRENT_USER__',
      '__ASSIGNED_TO_OTHERS__',
      '__UNASSIGNED__',
    ],
    selectedRecipientExtensionIds: [],
  };

  private get smsRecipients() {
    return this._messageThread.smsRecipients;
  }

  @action
  updateSharedSearchForm(updates: Partial<SharedSearchForm> | 'reset') {
    if (updates === 'reset') {
      Object.assign(this.sharedSearchForm, {
        filter: 'All',
        statusFilter: ['Open', 'Resolved'],
        selectedAssignees: [
          '__CURRENT_USER__',
          '__ASSIGNED_TO_OTHERS__',
          '__UNASSIGNED__',
        ],
        selectedRecipientExtensionIds:
          this._messageThread.smsRecipientExtensionIds,
      } as SharedSearchForm);

      return;
    }

    Object.assign(this.sharedSearchForm, updates);
  }

  @computed
  get filteredThreadConversations(): FilteredConversation[] {
    const threads = this._messageThread.threadConversationsInfo.conversations;
    const filter = this.sharedSearchForm.filter;
    const statusFilter = this.sharedSearchForm.statusFilter;
    const searchInput = this.sharedSearchForm.searchInput.toLowerCase().trim();
    const selectedAssignees = this.sharedSearchForm.selectedAssignees;
    const selectedRecipientExtensionIds =
      this.sharedSearchForm.selectedRecipientExtensionIds;
    const currentExtensionId = this._auth.ownerId;

    let filtered = threads;

    // Filter by status (Open/Resolved)
    if (statusFilter.length < 2) {
      filtered = filtered.filter((conversation) => {
        const threadId = conversation.conversationId!;
        const threadInfo = this._messageThread.getThread(threadId)?.threadInfo;
        const threadStatus = threadInfo?.status;

        if (
          statusFilter.includes('Open') &&
          !statusFilter.includes('Resolved')
        ) {
          return threadStatus !== 'Resolved';
        } else if (
          statusFilter.includes('Resolved') &&
          !statusFilter.includes('Open')
        ) {
          return threadStatus === 'Resolved';
        }
        return true;
      });
    }

    // only when less than all assignees are selected
    if (selectedAssignees.length < assignmentOptions.length) {
      filtered = filtered.filter((conversation) => {
        const threadId = conversation.conversationId!;
        const threadInfo = this._messageThread.getThread(threadId)?.threadInfo;
        const assigneeExtensionId = threadInfo?.assignee?.extensionId;

        const includeAssignedToOthers = selectedAssignees.includes(
          assignmentOptionMap.assignedToOthers.value,
        );

        const includeUnassigned = selectedAssignees.includes(
          assignmentOptionMap.unassigned.value,
        );

        const includeCurrentUser = selectedAssignees.includes(
          assignmentOptionMap.currentUser.value,
        );

        return (
          (includeUnassigned && !assigneeExtensionId) ||
          (includeCurrentUser && assigneeExtensionId === currentExtensionId) ||
          (includeAssignedToOthers &&
            // must be assigned to others, not current user
            assigneeExtensionId &&
            assigneeExtensionId !== currentExtensionId)
        );
      });
    }

    // Filter by unread
    if (filter === 'Unread') {
      filtered = filtered.filter((conversation) => {
        const threadId = conversation.conversationId!;
        const unreadCount =
          this._messageThread.getThread(threadId)?.unreadCount ?? 0;
        // Check if thread has unread messages
        return unreadCount > 0;
      });
    }

    // Filter by call queues
    if (
      selectedRecipientExtensionIds.length > 0 &&
      selectedRecipientExtensionIds.length < this.smsRecipients.length
    ) {
      filtered = filtered.filter((conversation) => {
        const threadId = conversation.conversationId!;
        const threadInfo = this._messageThread.getThread(threadId)?.threadInfo;
        const ownerExtensionId =
          threadInfo?.owner?.extensionId ??
          (conversation as any).threadOwner?.extensionId;
        return Boolean(
          ownerExtensionId &&
          selectedRecipientExtensionIds.includes(ownerExtensionId),
        );
      });
    }

    // Filter by search
    if (searchInput) {
      filtered = filtered.filter((conversation) => {
        const searchLower = searchInput.toLowerCase();
        // Search in correspondents
        const matchCorrespondent = conversation.correspondents?.some(
          (contact) =>
            contact.name?.toLowerCase().includes(searchLower) ||
            contact.phoneNumber?.includes(searchInput) ||
            contact.extensionNumber?.includes(searchInput),
        );
        if (matchCorrespondent) return true;

        // Search in subject/message text
        const matchSubject = conversation.subject
          ?.toLowerCase()
          .includes(searchLower);
        if (matchSubject) return true;

        // Search in all messages of the conversation
        const threadId = conversation.conversationId;
        const matchMessages = threadId
          ? this._messageThread
              .getThreadMessages(threadId)
              .some((message) =>
                message.subject?.toLowerCase().includes(searchLower),
              )
          : false;
        if (matchMessages) return true;

        return false;
      });
    }

    return filtered;
  }

  @autobind
  private AssignThreadModalContent() {
    const { props, action } = useModalItemView<{ threadId: string }>();
    const { threadId } = props.payload!;
    const { t } = useLocale(i18n, conversationsI18n);
    const { t: contactsT } = useLocale(contactsI18n);
    const { t: messageThreadsT } = useLocale(messageThreadsI18n);
    const [searchText, setSearchText] = useState('');

    // Get recipients and loading state from service
    const {
      recipients: _recipients,
      assigneeExtensionId,
      ownerExtensionId,
    } = useConnector(() => {
      const threads = this._messageThread.data.threads;
      const thread = threads[threadId];
      const threadInfo = thread?.threadInfo;
      const ownerExtensionId = threadInfo?.owner?.extensionId;
      const assigneeExtensionId = threadInfo?.assignee?.extensionId;

      const recipients = !ownerExtensionId
        ? []
        : this._callQueues.getSmsRecipients(ownerExtensionId);

      return {
        threadInfo,
        recipients,
        assigneeExtensionId,
        ownerExtensionId,
      };
    });

    const recipients = useMemo(
      () =>
        assigneeExtensionId
          ? _recipients.filter(
              (recipient) => recipient.id !== assigneeExtensionId,
            )
          : _recipients,
      [_recipients, assigneeExtensionId],
    );

    const loading = useConnector(() => {
      if (!ownerExtensionId) return false;
      return this._callQueues.getSmsRecipientsLoading(ownerExtensionId);
    });

    const assignLoading = useConnector(() => {
      return this._messageThread.getThreadMetadata(threadId)?.loading;
    });

    const hasData = recipients.length > 0;

    // Load recipients when modal opens or extensionId changes
    useEffect(() => {
      if (!ownerExtensionId) return;
      // Load if should load (first time) or refetch if cache expired
      this._callQueues.loadSmsRecipients(ownerExtensionId, false);
    }, [ownerExtensionId]);

    const filteredRecipients = useMemo(() => {
      if (!searchText.trim()) return recipients;
      const lowerSearch = searchText.toLowerCase();
      return recipients.filter(
        (recipient) =>
          recipient.name.toLowerCase().includes(lowerSearch) ||
          recipient.extensionNumber.includes(searchText),
      );
    }, [recipients, searchText]);

    const handleAssign = async (extensionId: string) => {
      try {
        await this._messageThread.assignThread(threadId, extensionId);

        // Show appropriate success message based on who the thread was assigned to
        const isAssignedToCurrentUser = extensionId === this._auth.ownerId;
        if (isAssignedToCurrentUser) {
          this._messageThread.showAssignedToYouToast();
        } else {
          // Find the recipient's name for the "assigned to other" message
          const recipient = recipients.find((r) => r.id === extensionId);
          const recipientName = recipient?.name || 'Unknown';
          this._toast.success({
            message: t('assignedToOtherTooltip', { name: recipientName }),
          });
        }
      } catch (error) {
        this.logger.error('assignThread error', error);
        this._toast.danger({ message: t('failedToAssignThread') });
      }
      action?.close();
    };

    const title = t('assignConversationTo');
    return (
      <div className="flex flex-col h-full relative -m-3">
        {/* Header */}
        <div className="px-6 py-3 border-b border-neutral-b4/50">
          <h3
            className="typography-subtitle text-center truncate"
            title={title}
          >
            {title}
          </h3>
        </div>

        {/* Search Input */}
        <div className="px-4 pt-3 pb-2">
          <TextField
            fullWidth
            inputProps={{
              'data-sign': 'assignRecipientSearch',
            }}
            size="medium"
            placeholder={messageThreadsT('search')}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            disabled={assignLoading}
            startAdornment={<Icon symbol={SearchMd} size="small" />}
          />
        </div>

        {/* Content Container */}
        <div className="px-4 py-2 border-neutral-b4/50 border-b">
          <div className="flex flex-row items-center gap-2 typography-descriptor text-neutral-b2">
            {t('companyContacts')}
            {loading && hasData && <CircularProgressIndicator size="small" />}
          </div>
        </div>

        {/* List Container */}
        <div className="flex-1 overflow-auto relative">
          {
            // eslint-disable-next-line no-nested-ternary
            loading && !hasData ? (
              // First time loading - show skeleton
              <div className="flex flex-col gap-4 py-2">
                {loadingList.map((i) => (
                  <div key={i} className="flex flex-row gap-4 typography-label">
                    <Skeleton variant="circular" className="w-9 h-9" />
                    <div className="flex flex-col items-center justify-center grow [&>*]:grow-0">
                      <Skeleton variant="text" className="w-3/5" />
                      <Skeleton variant="text" className="w-2/5" />
                    </div>
                  </div>
                ))}
              </div>
            ) : !loading && filteredRecipients.length === 0 ? (
              <div className="flex justify-center py-8 px-4">
                <div className="typography-mainText text-neutral-b2">
                  {t('noSearchResults')}
                </div>
              </div>
            ) : (
              <List>
                {filteredRecipients.map((recipient) => (
                  <ListItem
                    key={recipient.id}
                    size="large"
                    divider={false}
                    onClick={() => !assignLoading && handleAssign(recipient.id)}
                    className={
                      assignLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }
                    data-sign={`assignRecipient-${recipient.id}`}
                  >
                    <ContactAvatar
                      size="large"
                      // TODO: add contact to the contact avatar
                      // contact={{
                      //   id: recipient.id,
                      //   name: recipient.name,
                      //   type: 'company',
                      // }}
                      phoneNumber={recipient.extensionNumber}
                      contactName={recipient.name}
                    />
                    <ListItemText
                      primary={recipient.name}
                      secondary={`${contactsT('extension')} ${
                        recipient.extensionNumber
                      }`}
                    />
                  </ListItem>
                ))}
              </List>
            )
          }
        </div>

        {assignLoading && (
          <div className="absolute inset-0 bg-neutral-base/75 flex items-center justify-center z-10 rounded-lg">
            <CircularProgressIndicator size="large" />
          </div>
        )}

        <div className="absolute top-2 right-2">
          <IconButton
            variant="icon"
            size="small"
            color="secondary"
            symbol={Xmd}
            onClick={() => action?.close()}
            data-sign="assignConversationClose"
          />
        </div>
      </div>
    );
  }

  constructor(
    private _conversationAlert: ConversationAlert,
    private _callQueues: CallQueues,
    private _modalView: ModalView,
    private _messageThread: MessageThread,
    private _router: RouterPlugin,
    private _toast: Toast,
    private _auth: Auth,
    private _portManager: PortManager,
  ) {
    super();

    if (this._portManager.shared) {
      this._portManager.onServer(() => {
        this.bindThreadViewListener();
      });
    } else {
      this.bindThreadViewListener();
    }
  }

  private bindThreadViewListener() {
    const markThreadAsViewed$ = fromWatchValue(
      this,
      () => this._router.currentPath,
    ).pipe(
      map((currentPath: string) => {
        const match = currentPath.match(/^\/conversations\/(.+)$/);
        if (match) {
          const conversationId = match[1];
          if (this._messageThread.isThreadId(conversationId)) {
            return conversationId;
          }
        }
        return null;
      }),
      distinctUntilChanged(),
      filter((threadId) => threadId !== null),
      switchMap((threadId) => {
        const group = this._messageThread.getThreadGroup(threadId);
        // when the user already in the thread page, any unread count change should mark the thread as viewed
        return fromWatchValue(this, () => group?.unreadCount ?? 0).pipe(
          filter((unreadCount) => unreadCount > 0),
          tap(() => {
            this._messageThread.setUnreadCount(threadId);
          }),
        );
      }),
    );

    // when able to selected queue change, should remove the not exist queue from the selected call queues
    const verifySelectedRecipientExtensionIds$ = fromWatchValue(
      this,
      () => this.smsRecipients,
    ).pipe(
      tap((selectedRecipientExtensionIds) => {
        const validQueues =
          this.sharedSearchForm.selectedRecipientExtensionIds.filter((queue) =>
            selectedRecipientExtensionIds.some((q) => q.id === queue),
          );

        const validQueuesLength = validQueues.length;
        // if that filter is same as the all call queue ids, should reset the selected call queues
        if (
          validQueuesLength === 0 ||
          validQueuesLength === selectedRecipientExtensionIds.length
        ) {
          this.updateSharedSearchForm({
            selectedRecipientExtensionIds:
              this._messageThread.smsRecipientExtensionIds,
          });
        } else {
          this.updateSharedSearchForm({
            selectedRecipientExtensionIds: validQueues,
          });
        }
      }),
    );

    this._messageThread.hasPermission$
      .pipe(
        switchMap((permission) =>
          permission
            ? merge(markThreadAsViewed$, verifySelectedRecipientExtensionIds$)
            : EMPTY,
        ),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  private openAssignThreadModal(threadId: string) {
    this._modalView.open(this.assignThreadModal, {
      threadId,
    });
  }

  private async handleResolveThread(conversationId: string) {
    try {
      await this._messageThread.resolveThread(conversationId);
    } catch (error) {
      this.logger.error('resolveThread error', error);
      this._toast.danger({ message: t('failedToResolveThread') });
      throw error;
    }
  }

  private async handleAssignToMe(conversationId: string) {
    const threads = this._messageThread.data.threads;
    const thread = threads[conversationId];
    const threadInfo = thread?.threadInfo;
    const isResolved = threadInfo?.status === 'Resolved';
    const currentPath = this._router.currentPath;

    const postAssignToMe = async () => {
      // redirect to the conversation page when user still wait on same page after assign to me action
      if (currentPath === this._router.currentPath) {
        this.logger.log(
          'assignToMe: redirect to conversation page',
          conversationId,
        );
        await this._router.push(`/conversations/${conversationId}`);
      } else {
        this.logger.log('assignToMe: current path changed, no redirect', {
          conversationId,
          prevPath: currentPath,
          currentPath: this._router.currentPath,
        });
      }
    };

    if (isResolved) {
      await this._messageThread.reopenResolvedThread(conversationId);
      await postAssignToMe();
      return;
    }

    try {
      const extensionId = this._auth.ownerId;
      if (!extensionId) {
        logger.warn('assignToMe: extensionId not available');
        return;
      }

      await this._messageThread.assignThread(conversationId, extensionId);
      await postAssignToMe();
      this._messageThread.showAssignedToYouToast();
    } catch (error) {
      this.logger.error('assignToMe error', error);
      this._toast.danger({ message: t('failedToAssignThread') });
      throw error;
    }
  }

  private handleAssignThread(conversationId: string) {
    this.openAssignThreadModal(conversationId);
  }

  private async handleUnassignThread(conversationId: string) {
    try {
      await this._messageThread.unassignThread(conversationId);
      this._toast.success({ message: t('conversationUnassigned') });
    } catch (error) {
      this.logger.error('unassignThread error', error);
      this._toast.danger({ message: t('failedToUnassignThread') });
      throw error;
    }
  }

  private getUIProps(): UIProps<MessageThreadPanelSelfProps> {
    const threadConversations = this._messageThread.hasPermission
      ? this.filteredThreadConversations
      : [];

    return {
      threadConversations,
      form: this.sharedSearchForm,
      lastPosition: this.lastPosition['shared'],
      loading: this._messageThread.historyLoading,
      callQueues: this.smsRecipients,
      assignmentOptions,
    };
  }

  private getUIFunctions(): UIFunctions<MessageThreadPanelSelfProps> {
    return {
      setLastPosition: (page, position) => {
        this.setLastPosition(page, position);
      },
      onSharedSearchFormUpdate: (updates) => {
        this.updateSharedSearchForm(updates);
      },
      onEndReached: () => {
        this._messageThread.loadMoreMessages();
      },
    };
  }

  useThreadConversationItemInfo = (conversation: FilteredConversation) => {
    const conversationId = conversation.conversationId;

    const { threadInfo, threadLoading, isThread, extensionId } = useConnector(
      () => ({
        threadInfo: conversationId
          ? this._messageThread.getThread(conversationId)?.threadInfo
          : undefined,
        threadLoading: conversationId
          ? this._messageThread.getThreadMetadata(conversationId)?.loading
          : false,
        isThread:
          conversationId &&
          this._messageThread.hasPermission &&
          Boolean(this._messageThread.getThread(conversationId)),
        extensionId: this._auth.ownerId,
      }),
    );

    const smsSentCapability = useConnector(() =>
      this._conversationAlert.getSmsSentCapability(conversation),
    );

    const actions = useMemo(() => {
      const actions: HistoryAction[] = [];

      if (!isThread || !smsSentCapability.hasCapability) return [];

      const currentExtensionId = extensionId?.toString();
      const isAssignedToMe =
        threadInfo?.assignee?.extensionId === currentExtensionId;
      const isResolved = threadInfo?.status === 'Resolved';
      const isAssigned = !!threadInfo?.assignee;

      // Logic 1: Initial unassigned state
      if (!isAssigned && !isResolved) {
        // Show text (reply), assign, and resolveThread buttons
        actions.push({
          type: 'assignToMe',
          disabled: threadLoading,
        });
        actions.push({
          type: 'assignThread',
          disabled: threadLoading,
        });
        actions.push({
          type: 'resolveThread',
          disabled: threadLoading,
        });
      }
      // Logic 2: Resolved thread
      else if (isResolved) {
        // Show text (reply) button only
        actions.push({
          type: 'assignToMe',
          disabled: threadLoading,
        });
      }
      // Logic 3: Assigned to me
      else if (isAssignedToMe && !isResolved) {
        // Show resolveThread, assignThread (reassign), unassignThread
        actions.push({
          type: 'resolveThread',
          disabled: threadLoading,
        });
        actions.push({
          type: 'reassignThread',
          disabled: threadLoading,
        });
        actions.push({
          type: 'unassignThread',
          disabled: threadLoading,
        });
      }
      // Logic 4: Assigned to someone else
      else if (isAssigned && !isAssignedToMe && !isResolved) {
        // Show resolveThread, assignThread (reassign), unassignThread
        actions.push({
          type: 'resolveThread',
          disabled: threadLoading,
        });
        actions.push({
          type: 'reassignThread',
          disabled: threadLoading,
        });
        actions.push({
          type: 'unassignThread',
          disabled: threadLoading,
        });
      }

      return actions;
    }, [
      extensionId,
      isThread,
      smsSentCapability.hasCapability,
      threadInfo?.assignee,
      threadInfo?.status,
      threadLoading,
    ]);

    return {
      threadInfo,
      actions,
      extensionId,
    };
  };

  async processThreadAction(
    conversationId: string | undefined,
    actionType: HistoryActionType,
  ) {
    if (!conversationId) return false;

    switch (actionType) {
      case 'resolveThread': {
        await this.handleResolveThread(conversationId);
        break;
      }
      case 'assignToMe': {
        await this.handleAssignToMe(conversationId);
        break;
      }
      case 'reassignThread':
      case 'assignThread': {
        this.handleAssignThread(conversationId);
        break;
      }
      case 'unassignThread': {
        await this.handleUnassignThread(conversationId);
        break;
      }
      default:
        return false;
    }

    return true;
  }

  component(props: PropsWithChildren<MessageThreadsViewProps>) {
    const _props = useConnector(() => this.getUIProps());
    const { current: uiFunctions } = useResultRef(() => this.getUIFunctions());

    return <MessageThreadPage {..._props} {...props} {...uiFunctions} />;
  }
}
