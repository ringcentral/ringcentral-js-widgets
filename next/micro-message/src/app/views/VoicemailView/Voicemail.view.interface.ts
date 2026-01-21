import type { useContactRenderInfoFromConversation } from '@ringcentral-integration/micro-phone/src/app/hooks';
import type { HistoryAction } from '@ringcentral-integration/next-widgets/components/ActionMenuList/useHistoryActionButtons';

import type { VoicemailAudioStatus } from '../../components';
import type { FilteredConversation } from '../../services';
import type { UseConversationsActions } from '../ConversationsViewSpring';

import type { VoicemailPage } from './VoicemailPage/VoicemailPage';

export interface VoicemailViewOptions {
  component?: typeof VoicemailPage;
}

export interface VoicemailViewProps {}

export type VoicemailPagePanelProps = {
  currentVoicemail: FilteredConversation;
  className?: string;
  goBack: () => void;
  useConversationItemInfo: (conversation: FilteredConversation) => {
    info: ReturnType<typeof useContactRenderInfoFromConversation>;
    actions: HistoryAction[];
  };
  useActionsHandler: UseConversationsActions;
  onStartLoad: (uri: string) => void;
  onDownload: () => void;
  audioStatus?: VoicemailAudioStatus;
  updateAudioStatus: (status: VoicemailAudioStatus) => void;
};
