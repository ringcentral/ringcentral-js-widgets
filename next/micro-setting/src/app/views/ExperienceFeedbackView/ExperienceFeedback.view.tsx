import { UserpilotService } from '@ringcentral-integration/micro-auth/src/app/services';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  Brand,
  Toast,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  action,
  delegate,
  injectable,
  optional,
  PortManager,
  RcViewModule,
  state,
  takeUntilAppDestroy,
  useConnector,
} from '@ringcentral-integration/next-core';
import { ThumbDownMd, ThumbUpMd, Xmd } from '@ringcentral/spring-icon';
import { Button, IconButton, Text } from '@ringcentral/spring-ui';
import React from 'react';
import { filter, tap } from 'rxjs';

import feedbackI18n from '../FeedbackView/i18n';
import { type SettingsViewOptions } from '../SettingsView/Settings.view.interface';

import type { ExperienceFeedbackValue } from './ExperienceFeedback.view.interface';
import i18n from './i18n';

export const EXPERIENCE_FEEDBACK_TRIGGER_EVENT = 'Int_CRM_logCall';
const EXPERIENCE_FEEDBACK_SHOW_EVENT = 'experience-feedback-show';
const DEFAULT_TAB_ID = 'default';

const USERPILOT_EXPERIENCE_VALUE: Record<ExperienceFeedbackValue, string> = {
  great: 'Great',
  'can-be-better': 'Can be better',
};

export const isExperienceFeedbackShowPayload = (payload: unknown) => {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const guidePayload = payload as Record<string, unknown>;

  return guidePayload.eventName === EXPERIENCE_FEEDBACK_SHOW_EVENT;
};

@injectable({
  name: 'ExperienceFeedbackView',
})
export class ExperienceFeedbackView extends RcViewModule {
  @state
  private openTabIds: Record<string, boolean> = {};

  constructor(
    private _brand: Brand,
    private _toast: Toast,
    private _portManager: PortManager,
    private _userpilotService: UserpilotService,
    @optional('SettingsViewOptions')
    protected _settingsViewOptions?: SettingsViewOptions,
  ) {
    super();

    if (globalThis.document) {
      this.listenFlowDisplayEventToOpenExperience();
    }
  }

  /**
   * we base on the userpilot event to show our in app custom ui, not use userpilot ui, only use the flow response mechanician
   *
   * 1. event trigger show flow
   * 2. flow show with non visible iframe, and send the event to the app
   * 3. show our custom ui
   * 4. user submit feedback, we use event to send to userpilot, and userpilot will send to server
   */
  private listenFlowDisplayEventToOpenExperience() {
    this._userpilotService.guideData$
      .pipe(
        filter((payload) => isExperienceFeedbackShowPayload(payload)),
        filter(
          () =>
            this._userpilotService.consumeRecentTrackedEvent(
              EXPERIENCE_FEEDBACK_TRIGGER_EVENT,
            ) ?? false,
        ),
        tap(() => {
          void this.openExperienceFeedback();
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  private get currentTabId() {
    return this._portManager.clientId || DEFAULT_TAB_ID;
  }

  private get isOpen() {
    return !!this.openTabIds[this.currentTabId];
  }

  @action
  private _setTabOpen(tabId: string, open: boolean) {
    this.openTabIds[tabId] = open;
  }

  @delegate('server')
  private async _setTabOpenOnServer(tabId: string, open: boolean) {
    this._setTabOpen(tabId, open);
  }

  private async openExperienceFeedback() {
    const tabId = this.currentTabId;

    if (this.openTabIds[tabId]) {
      return;
    }

    await this._setTabOpenOnServer(tabId, true);
    this._userpilotService.track(EXPERIENCE_FEEDBACK_SHOW_EVENT);
  }

  private async closeExperienceFeedback() {
    await this._setTabOpenOnServer(this.currentTabId, false);
    this._userpilotService.track('experience-feedback-dismiss');
    this._userpilotService.sendGuideData(
      { action: 'dismiss' },
      isExperienceFeedbackShowPayload,
    );
  }

  private async submitFeedback(
    feedback: ExperienceFeedbackValue,
    successMessage?: string,
  ) {
    const experience = USERPILOT_EXPERIENCE_VALUE[feedback];

    await this._setTabOpenOnServer(this.currentTabId, false);
    this._userpilotService.track(`experience-feedback-submit-${feedback}`, {
      feedback,
      showToast: true,
    });
    this._userpilotService.sendGuideData(
      {
        action: 'submit',
        feedback,
        experience,
      },
      isExperienceFeedbackShowPayload,
    );

    if (successMessage) {
      this._toast.success({ message: successMessage });
    }

    if (feedback === 'great') {
      this._settingsViewOptions?.onFeedBackSettingsLink?.('auto');
    }
  }

  track() {
    this._userpilotService.track(EXPERIENCE_FEEDBACK_TRIGGER_EVENT);
  }

  component() {
    const { t } = useLocale(i18n, feedbackI18n);
    const { brandConfig, isOpen } = useConnector(() => ({
      brandConfig: this._brand.brandConfig,
      isOpen: this.isOpen,
    }));
    const appName = String(brandConfig?.appName);

    const close = () => {
      void this.closeExperienceFeedback();
    };

    const submitFeedback = (feedback: ExperienceFeedbackValue) => {
      void this.submitFeedback(
        feedback,
        feedback === 'can-be-better' ? t('submitFeedbackSuccess') : undefined,
      );
    };

    if (!isOpen) {
      return null;
    }

    return (
      <div
        id="experience-feedback-modal"
        role="presentation"
        className="fixed inset-0 mx-auto flex w-full max-w-md items-end justify-center pointer-events-none"
        style={{ zIndex: Number.MAX_SAFE_INTEGER }}
      >
        <div
          role="dialog"
          aria-modal
          aria-labelledby="experience-feedback-title"
          tabIndex={-1}
          className="relative h-auto min-h-0 rounded border border-neutral-b0-t20 bg-neutral-base py-3 pointer-events-auto mb-16 mx-3 shadow-xl"
          style={{ width: 'calc(100% - 24px)', maxWidth: 312 }}
        >
          <Text
            component="div"
            className="typography-title relative px-3 pr-10 text-neutral-b0"
            id="experience-feedback-title"
          >
            {t('ratingTitle', { appName })}
          </Text>
          <div className="mx-2 mt-3 flex flex-nowrap justify-between gap-1">
            <Button
              className="flex w-full items-center gap-1"
              type="button"
              variant="contained"
              color="secondary"
              size="medium"
              startIcon={ThumbUpMd}
              onClick={() => submitFeedback('great')}
              data-feedback="great"
              data-sign="experience-feedback-great"
            >
              {t('great')}
            </Button>
            <Button
              className="flex w-full items-center gap-1"
              type="button"
              variant="contained"
              color="secondary"
              size="medium"
              startIcon={ThumbDownMd}
              onClick={() => submitFeedback('can-be-better')}
              data-feedback="can-be-better"
              data-sign="experience-feedback-can-be-better"
            >
              {t('canBeBetter')}
            </Button>
          </div>
          <IconButton
            className="absolute right-1 top-0 p-2 text-neutral-b1"
            aria-label={t('closeFeedbackModal')}
            symbol={Xmd}
            variant="icon"
            size="medium"
            onClick={close}
            data-sign="experience-feedback-close"
          />
        </div>
      </div>
    );
  }
}
