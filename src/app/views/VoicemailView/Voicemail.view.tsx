import type { Theme } from '@ringcentral-integration/micro-core/src/app/services';
import { slideOutViewTransition } from '@ringcentral-integration/micro-core/src/app/views';
import {
  action,
  computed,
  fromWatchValue,
  injectable,
  optional,
  PortManager,
  RcViewModule,
  RouterPlugin,
  state,
  takeUntilAppDestroy,
  UIFunctions,
  UIProps,
  useConnector,
  dynamic,
} from '@ringcentral-integration/next-core';
import React, { useRef } from 'react';
import { map, tap } from 'rxjs';
import type { SetOptional } from 'type-fest';

import type { VoicemailAudioStatus } from '../../components';
import {
  Conversations,
  type FilteredConversation,
  VoicemailAudio,
} from '../../services';
import { ConversationsViewSpring } from '../ConversationsViewSpring';

import type {
  VoicemailPagePanelProps,
  VoicemailViewOptions,
  VoicemailViewProps,
} from './Voicemail.view.interface';
import { VoicemailPage } from './VoicemailPage';

@injectable({
  name: 'VoicemailView',
})
export class VoicemailView extends RcViewModule {
  @dynamic('Theme')
  private _theme?: Theme;

  constructor(
    private _voicemailAudio: VoicemailAudio,
    private _conversations: Conversations,
    private _portManager: PortManager,
    private _router: RouterPlugin,
    private _conversationsView: ConversationsViewSpring,
    @optional('VoicemailViewOptions')
    private _voicemailViewOptions?: VoicemailViewOptions,
  ) {
    super();

    if (this._portManager.shared) {
      this._portManager.onServer(() => {
        this.bindSetAudioListener();
      });
    } else {
      this.bindSetAudioListener();
    }
  }

  private bindSetAudioListener() {
    fromWatchValue(this, () => this._router.currentPath)
      .pipe(
        map((path) => path.startsWith('/voicemails/')),
        tap((isVoiceMail) => {
          const id = this._router.currentPath.split('/voicemails/')[1];
          if (isVoiceMail && id) {
            this.setCurrentVoicemailId(id);
          }
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  @state
  currentVoicemailId: string | null = null;

  @action
  setCurrentVoicemailId(id: string) {
    this.currentVoicemailId = id;
  }

  @computed
  get currentVoicemail() {
    return this.currentVoicemailId
      ? this._conversations.formattedConversationsMap.get(
          this.currentVoicemailId,
        )
      : undefined;
  }

  useConversationItemInfo = (conversation: FilteredConversation) => {
    const { info, actions } = this._conversationsView.useConversationItemInfo(
      conversation,
      { pageType: 'voicemail' },
    );

    return {
      info,
      actions,
    };
  };

  getUIProps(
    _: VoicemailViewProps,
  ): UIProps<SetOptional<VoicemailPagePanelProps, 'currentVoicemail'>> {
    return {
      currentVoicemail: this.currentVoicemail,
      audioStatus: this._voicemailAudio.getAudioStatus(
        this.currentVoicemailId!,
      ),
    };
  }

  getUIFunctions(_: VoicemailViewProps): UIFunctions<VoicemailPagePanelProps> {
    return {
      goBack: async () => {
        await slideOutViewTransition(
          () => this._router.push('/dialer'),
          this._theme?.reducedMotion,
        );
      },
      onStartLoad: (uri) => {
        const id = this.currentVoicemailId!;
        this._voicemailAudio.loadAudio(id, uri);
      },
      updateAudioStatus: (status: VoicemailAudioStatus) => {
        this._voicemailAudio.setAudioStatus(this.currentVoicemailId!, status);
      },
      onDownload: async () => {
        this._voicemailAudio.download(
          this.currentVoicemailId!,
          this.currentVoicemail?.voicemailAttachment?.uri,
        );
      },
      useConversationItemInfo: this.useConversationItemInfo,
      useActionsHandler: this._conversationsView.useActionsHandler,
    };
  }

  component(props: VoicemailViewProps) {
    // although we already bind event in server but we need quickest render at page, so set local state first also
    this._router.useParams<{ conversationId: string }>((params) => {
      this.setCurrentVoicemailId(params.conversationId);
    });

    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const { currentVoicemail, ..._props } = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });

    if (!currentVoicemail) return null;

    const Component = this._voicemailViewOptions?.component || VoicemailPage;
    return (
      <Component
        {..._props}
        {...uiFunctions}
        currentVoicemail={currentVoicemail}
      />
    );
  }
}
