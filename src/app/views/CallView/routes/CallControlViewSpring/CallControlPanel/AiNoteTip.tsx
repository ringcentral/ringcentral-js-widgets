import { Xsm } from '@ringcentral/spring-icon';
import { Block, Button, Icon, IconButton } from '@ringcentral/spring-ui';
import React from 'react';

import { CallControlViewPanelProps } from '../CallControl.view.interface';

import { t } from './i18n';

export interface AiNoteTipProps {
  onView?: CallControlViewPanelProps['viewAiNote'];
  aiNoteTipType: CallControlViewPanelProps['aiNoteTipType'];
  onCloseAiNoteTip?: CallControlViewPanelProps['onCloseAiNoteTip'];
}

const blockStyles = { root: 'bg-ai-accent bg-opacity-10' };

export const AiNoteTip: React.FC<AiNoteTipProps> = ({
  onView,
  aiNoteTipType,
  onCloseAiNoteTip,
}) => {
  return (
    <Block classes={blockStyles}>
      {aiNoteTipType === 'viewAiNote' ? (
        <div className="flex items-center justify-center gap-2 typography-mainText text-neutral-b1 w-full">
          <Icon size="small">
            <img src={require('./ai.gif')} alt="ai" />
          </Icon>

          <div className="flex-1 truncate" title={t('viewAiNote')}>
            {t('viewAiNote')}
          </div>
          <Button variant="text" data-sign="aiNoteView" onClick={onView}>
            {t('viewLink')}
          </Button>
          <IconButton
            symbol={Xsm}
            size="medium"
            variant="icon"
            color="neutral"
            onClick={onCloseAiNoteTip}
            data-sign="aiNoteTipClose"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 typography-mainText text-neutral-b1 w-full">
          <div
            title={t('aiNoteStopped')}
            className="typography-mainText text-neutral-b1 truncate flex-1"
          >
            {t('aiNoteStopped')}
          </div>
          <IconButton
            symbol={Xsm}
            size="medium"
            variant="icon"
            color="neutral"
            onClick={onCloseAiNoteTip}
            data-sign="aiNoteTipClose"
          />
        </div>
      )}
    </Block>
  );
};
