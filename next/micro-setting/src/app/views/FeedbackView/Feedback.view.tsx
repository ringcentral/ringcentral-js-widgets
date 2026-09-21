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
  useConnector,
} from '@ringcentral-integration/next-core';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Text,
  Textarea,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import type {
  FeedbackStep,
  FeedbackViewOptions,
} from './Feedback.view.interface';
import i18n from './i18n';

const FEEDBACK_TAG_IDS = [
  'Call log failure',
  'Poor call quality',
  'Server errors',
  'Very slow',
] as const;
const DEFAULT_TAB_ID = 'default';
const FEEDBACK_SHOW_EVENT = 'settings-rating-show';

const isFeedbackGuideShowPayload = (payload: unknown) => {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const guidePayload = payload as Record<string, unknown>;

  return guidePayload.eventName === FEEDBACK_SHOW_EVENT;
};

@injectable({
  name: 'FeedbackView',
})
export class FeedbackView extends RcViewModule {
  @state
  openTabIds: Record<string, boolean> = {};

  constructor(
    private _toast: Toast,
    @optional()
    private _userpilotService: UserpilotService,
    private _brand: Brand,
    private _portManager: PortManager,
    @optional('FeedbackViewOptions')
    private _options?: FeedbackViewOptions,
  ) {
    super();
  }

  get currentTabId() {
    return this._portManager.clientId || DEFAULT_TAB_ID;
  }

  get isOpen() {
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

  async openFeedback() {
    await this._setTabOpenOnServer(this.currentTabId, true);
  }

  async closeFeedback() {
    await this._setTabOpenOnServer(this.currentTabId, false);
  }

  component() {
    const [step, setStep] = useState<FeedbackStep>('rating');
    const [rating, setRating] = useState(0);
    const [feedbackText, setFeedbackText] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const { t } = useLocale(i18n);
    const { brandConfig, open } = useConnector(() => ({
      brandConfig: this._brand.brandConfig,
      open: this.isOpen,
    }));
    const appName = String(brandConfig?.appName) as string;
    const application = String(brandConfig?.application) as string;
    const reviewLink = this._options?.reviewLink ?? '';

    useEffect(() => {
      if (!open) {
        setStep('rating');
        setRating(0);
        setFeedbackText('');
        setSelectedTags([]);
      }
    }, [open]);

    const handleClose = (submit: boolean) => {
      if (submit) {
        this._userpilotService?.sendGuideData(
          {
            action: 'submit',
            feedbackText,
            selectedTags,
            rating: rating.toString(),
          },
          isFeedbackGuideShowPayload,
        );
      } else {
        this._userpilotService?.sendGuideData(
          { action: 'dismiss' },
          isFeedbackGuideShowPayload,
        );
      }
      void this.closeFeedback();
    };

    const handleNext = () => {
      if (rating >= 1 && rating <= 3) {
        setStep('helpImprove');
      } else if (rating >= 4 && rating <= 5) {
        setStep('thankYou');
      }
    };

    const handleSubmit = () => {
      handleClose(true);
      this._toast.success({ message: t('submitFeedbackSuccess') });
    };

    const handleShareReview = () => {
      if (reviewLink) {
        window.open(reviewLink, '_blank');
      }
      handleClose(true);
    };

    const handleCancelThankYou = () => {
      handleClose(true);
    };

    const handleToggleTag = (tag: string) => {
      setSelectedTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
      );
    };

    const getRatingLabelText = (value: number | null) =>
      value === 1
        ? t('starLabelOne')
        : value != null
        ? t('starLabelMany', { count: value })
        : t('emptyRating');

    const tagLabelMap: Record<string, string> = {
      'Call log failure': t('tagCallLogFailure'),
      'Poor call quality': t('tagPoorCallQuality'),
      'Server errors': t('tagServerErrors'),
      'Very slow': t('tagVerySlow'),
    };

    if (!open) {
      return null;
    }

    const renderStep = () => {
      switch (step) {
        case 'rating':
          return (
            <>
              <DialogTitle className="px-3">
                {t('ratingTitle', { appName })}
              </DialogTitle>
              <DialogContent className="flex justify-center">
                <Rating
                  name="feedback-rating"
                  value={rating || null}
                  className="gap-3"
                  max={5}
                  onChange={(_event, value) => setRating(value ?? 0)}
                  getLabelText={getRatingLabelText}
                  emptyLabelText={t('emptyRating')}
                />
              </DialogContent>
              <DialogActions className="px-2">
                <Button
                  variant="outlined"
                  color="secondary"
                  size="medium"
                  onClick={() => handleClose(false)}
                  data-sign="cancel-btn"
                >
                  {t('cancel')}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  disabled={rating === 0}
                  onClick={handleNext}
                  data-sign="next-btn"
                >
                  {t('next')}
                </Button>
              </DialogActions>
            </>
          );
        case 'helpImprove':
          return (
            <>
              <DialogTitle className="px-3">
                {t('helpImproveTitle')}
              </DialogTitle>
              <DialogContent className="px-3 overflow-hidden">
                <Textarea
                  fullWidth
                  variant="outlined"
                  placeholder={t('feedbackPlaceholder')}
                  value={feedbackText}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFeedbackText(e.target.value)
                  }
                  rows={2}
                  size="xlarge"
                  inputProps={{
                    'data-sign': 'textarea-feedback',
                  }}
                />
                <div className="flex flex-wrap gap-1 mt-2">
                  {FEEDBACK_TAG_IDS.map((tagId) => {
                    const active = selectedTags.includes(tagId);
                    return (
                      <Chip
                        key={tagId}
                        label={tagLabelMap[tagId] ?? tagId}
                        clickable
                        onClick={() => handleToggleTag(tagId)}
                        color="default"
                        size="medium"
                        className={clsx(
                          'typography-subtitleMini',
                          active ? 'bg-neutral-b0' : 'bg-neutral-b4',
                        )}
                        classes={{
                          label: active ? 'text-neutral-base' : '',
                        }}
                        data-sign="feedback-tag"
                        data-tag={tagId}
                      />
                    );
                  })}
                </div>
              </DialogContent>
              <DialogActions className="px-3">
                <Button
                  variant="outlined"
                  color="secondary"
                  size="medium"
                  onClick={() => handleClose(false)}
                  data-sign="cancel-improve-btn"
                >
                  {t('cancel')}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  onClick={handleSubmit}
                  data-sign="submit-feedback-btn"
                >
                  {t('submit')}
                </Button>
              </DialogActions>
            </>
          );
        case 'thankYou':
          return (
            <>
              <DialogTitle className="px-3">{t('thankYouTitle')}</DialogTitle>
              <DialogContent>
                <Text
                  component="p"
                  className="typography-mainText text-neutral-b1"
                  id="thankyou-text"
                >
                  {t('thankYouText', { application })}
                </Text>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="medium"
                  onClick={handleCancelThankYou}
                  data-sign="cancel-thankyou-btn"
                >
                  {t('cancel')}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  onClick={handleShareReview}
                  data-sign="share-review-btn"
                >
                  {t('shareReview')}
                </Button>
              </DialogActions>
            </>
          );
        default:
          return null;
      }
    };

    return (
      <Dialog
        open={open}
        disableBackdropClick
        disableEscapeKeyDown
        onClose={() => handleClose(false)}
        size="medium"
      >
        {renderStep()}
      </Dialog>
    );
  }
}
