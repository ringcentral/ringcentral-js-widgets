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
  RcModule,
  state,
  takeUntilAppDestroy,
  userStorage,
} from '@ringcentral-integration/next-core';
import { defer, EMPTY, filter, fromEvent, map, share, tap } from 'rxjs';

import { Auth } from '../Auth';

import { PendoAnalytics } from './PendoAnalytics';
import { type PendoGuideOptions } from './PendoGuide.interface';
import { t } from './i18n';

/**
 * For use data in pendo, use below methods
app.modules.PendoAnalytics.track('Int_settings-rating-display')
app.modules.PendoAnalytics.track('Int_settings-rating-submit')
app.modules.PendoAnalytics.track('Int_positive-rating-show')
app.modules.PendoAnalytics.track('Int_positive-rating-dismiss')
app.modules.PendoAnalytics.track('Int_positive-rating-submit')
app.modules.PendoAnalytics.track('Int_experience-feedback-show')
app.modules.PendoAnalytics.track('Int_experience-feedback-dismiss')
app.modules.PendoAnalytics.track('Int_experience-feedback-submit-great')
app.modules.PendoAnalytics.track('Int_experience-feedback-submit-can-be-better')
app.modules.PendoAnalytics.flushNow()
 */
export type PendoGuideEvent =
  // settings rating
  | {
      eventName: 'settings-rating-display';
      metadata: {
        guideId: string;
      };
    }
  | {
      eventName: 'settings-rating-submit';
      metadata: {
        feedbackText: string;
        selectedTags: string[];
        currentRating: number;
        showToast: boolean;
      };
    }
  // positive rating (auto rating)
  | {
      eventName: 'positive-rating-show';
      metadata: {
        guideId: string;
      };
    }
  | {
      eventName: 'positive-rating-dismiss';
      metadata: {
        guideId: string;
      };
    }
  | {
      eventName: 'positive-rating-submit';
      metadata: {
        feedbackText: string;
        selectedTags: string[];
        currentRating: number;
        showToast: boolean;
      };
    }
  // experience feedback
  | {
      eventName: 'experience-feedback-show';
      metadata: {
        guideId: string;
      };
    }
  | {
      eventName: 'experience-feedback-dismiss';
      metadata: {
        guideId: string;
      };
    }
  | {
      eventName: 'experience-feedback-submit-great';
      metadata: {
        showToast: boolean;
      };
    }
  | {
      eventName: 'experience-feedback-submit-can-be-better';
      metadata: {
        showToast: boolean;
      };
    };

// for tailwind can scan the template styles
export const pendoTemplateStyles = 'top-0 right-1';
const TEN_MIN = 1000 * 60 * 10;

@injectable({
  name: 'PendoGuide',
})
export class PendoGuide extends RcModule {
  /**
   * the state of the guides, the key is the guide name, the value is the existence of the guide
   *
   * the guide name is the name of the guide in the pendo, which is the same as the name of the guide in the pendo guide list
   *
   * the loaded names define in the `_pendoGuideOptions.checkGuideNames`
   *
   * which will be useful when you need check does the user have the ability to show the guide without trigger the guide display
   */
  @userStorage
  @state
  guidesExistence: Record<string, boolean> = {};

  @action
  private _setGuidesExistence(guides: Record<string, boolean>) {
    Object.assign(this.guidesExistence, guides);
  }

  @delegate('server')
  async setGuidesExistence(guides: Record<string, boolean>) {
    this._setGuidesExistence(guides);
  }

  /**
   * only save the value inside memory is fine, because the guide need complex behavior to display, we just want a small period of time to avoid display the same guide again due to the pendo events still not be processed and accumulated
   */
  private everDisplayedTimestamp = {
    positiveRating: 0,
    experienceFeedback: 0,
  };

  @delegate('clients')
  private async setEverDisplayed(
    guideName: keyof typeof this.everDisplayedTimestamp,
  ) {
    this.everDisplayedTimestamp[guideName] = Date.now();
  }
  /**
   * Observable that emits Pendo guide events, the event will send from our custom pendo template
   *
   * libs/pendo-guides-template/templates/rating.html
   */
  guideEvent$ = defer(() => {
    if (this._pendoAnalytics.enable) {
      return fromEvent(document, 'pendo-event').pipe(
        map((e) => {
          const data = (e as CustomEvent).detail as PendoGuideEvent;

          if (data.eventName && data.metadata) {
            return data;
          }

          return null;
        }),
        filter(Boolean),
      );
    }

    return EMPTY;
  }).pipe(share());

  constructor(
    private _auth: Auth,
    private _brand: Brand,
    private _pendoAnalytics: PendoAnalytics,
    private _toast: Toast,
    private _portManager: PortManager,
    @optional('PendoGuideOptions')
    private _pendoGuideOptions: PendoGuideOptions,
  ) {
    super();

    this.guideEvent$
      .pipe(
        tap((event) => {
          const { eventName, metadata } = event;
          this.logger.info('receive pendo event', event);

          switch (eventName) {
            case 'experience-feedback-submit-great':
            case 'experience-feedback-submit-can-be-better':
              this._pendoAnalytics.track(`Int_${eventName}`);

              if (metadata.showToast) {
                this._toast.success({
                  message: t('submitFeedbackSuccess'),
                });
              }
              break;
            case 'settings-rating-submit':
            case 'positive-rating-submit':
              if (metadata.showToast) {
                this._toast.success({
                  message: t('submitFeedbackSuccess'),
                });
              }

              break;
            case 'settings-rating-display':
            case 'positive-rating-show':
            case 'positive-rating-dismiss':
            case 'experience-feedback-show':
            case 'experience-feedback-dismiss':
              this._pendoAnalytics.track(`Int_${eventName}`);
              break;
            default:
              if (process.env.NODE_ENV !== 'production') {
                this.logger.warn(
                  'unknown pendo event, although we also track the event to pendo, but that will be better to have a record here, add the type above and add case to handle it will be better',
                  eventName,
                );
              }
              // rest of events also submit to pendo analytics for we can change events name dynamically without change the code and wait deploy
              this._pendoAnalytics.track(`Int_${eventName}`);
              break;
          }
        }),
        takeUntilAppDestroy,
      )
      .subscribe();

    // when logout, clear the everDisplayedTimestamp
    this._auth.beforeLogout$
      .pipe(
        tap(() => {
          this.everDisplayedTimestamp = {
            positiveRating: 0,
            experienceFeedback: 0,
          };
        }),
        takeUntilAppDestroy,
      )
      .subscribe();

    if (this._portManager.shared) {
      this._portManager.onMainTab(() => {
        this.loadOurPendoGuides();
      });
    } else {
      this.loadOurPendoGuides();
    }
  }

  private loadOurPendoGuides() {
    this._pendoAnalytics.guidesLoaded$
      .pipe(
        tap(() => {
          this.syncGuidesExistence();
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  private syncGuidesExistence() {
    if (this._pendoGuideOptions?.checkGuideNames) {
      const guidesExistence = this._pendoGuideOptions.checkGuideNames.reduce(
        (acc, guideName) => {
          acc[guideName] = this.getPendoGuideExistence(guideName);
          return acc;
        },
        {} as Record<string, boolean>,
      );
      this.setGuidesExistence(guidesExistence);
    }
  }

  private genPendoNamePrefix() {
    const appName = this._brand.defaultConfig.appName;
    return `[Int]: (${appName})`;
  }

  private genPendoGuideName(name: string) {
    return `${this.genPendoNamePrefix()} ${name}`;
  }

  private getPendoGuideExistence(guideName: string) {
    return Boolean(
      this._pendoAnalytics.pendo?.findGuideByName?.(
        this.genPendoGuideName(guideName),
      ),
    );
  }

  /**
   * Refresh Pendo guides and show a guide by its ID
   * @param guide Object containing guide id and name
   * @returns Promise that resolves to boolean indicating success
   */
  private async _showGuide(guide: { id: string } | { name: string }) {
    // when the guide not be focus state, skip that guide display until next time trigger (one of tab is focus will be display)
    if (!document.hasFocus()) {
      this.logger.info('Document not be focus, skip that guide display');
      return false;
    }

    try {
      // Check if Pendo is available
      const pendo = this._pendoAnalytics.pendo;
      if (!pendo) return false;

      this.logger.info('trigger opened guide', guide);

      const result = ('id' in guide
        ? pendo.showGuideById(guide.id)
        : pendo.showGuideByName(guide.name)) as unknown as boolean;

      this.logger.info('Guide opened result', result);

      return result;
    } catch (error) {
      this.logger.error('Failed to open Pendo guide', {
        guide,
        error,
      });
    }

    return false;
  }

  @delegate('clients')
  async experienceGuideProcess() {
    await this.refreshGuides();
    this.showPositiveRatingGuide();
    this.showExperienceFeedbackGuide();
  }

  async showGuideByNameWithPrefix(name: string) {
    return this._showGuide({ name: this.genPendoGuideName(name) });
  }

  async refreshGuides() {
    await this._pendoAnalytics.refreshGuides();
    // after refresh guides, we need to sync the guides existence to the guidesState
    this.syncGuidesExistence();
  }

  /**
   * * we use static guide name here, for different project can use the same name without add additional guide id config settings
   */

  /**
   * @link https://app.pendo.io/s/6255039312297984/guides/yzDNMrhXW3KaBZ4xfx12yNvaN58
   */
  async showPositiveRatingGuide() {
    const positiveRating = this.everDisplayedTimestamp.positiveRating;
    if (positiveRating && positiveRating > Date.now() - TEN_MIN) {
      this.logger.info(
        'Positive rating guide ever displayed, not display again in 10 minutes',
      );
      return false;
    }

    const result = await this.showGuideByNameWithPrefix('positive-rating');

    if (result) this.setEverDisplayed('positiveRating');

    return result;
  }

  /**
   * Show the experience feedback guide
   *
   * @link https://app.pendo.io/s/6255039312297984/guides/hnIXRpoFTY4rI0yzdmGnhHqkpsQ
   */
  async showExperienceFeedbackGuide() {
    const experienceFeedback = this.everDisplayedTimestamp.experienceFeedback;
    if (experienceFeedback && experienceFeedback > Date.now() - TEN_MIN) {
      this.logger.info(
        'Experience feedback guide ever displayed, not display again in 10 minutes',
      );
      return false;
    }

    const result = await this.showGuideByNameWithPrefix('experience-feedback');

    if (result) this.setEverDisplayed('experienceFeedback');

    return result;
  }

  /**
   * Show the experience feedback guide
   *
   * @link https://app.pendo.io/s/6255039312297984/guides/hnIXRpoFTY4rI0yzdmGnhHqkpsQ
   */
  async showSettingsRatingGuide() {
    return this.showGuideByNameWithPrefix('settings-rating');
  }
}
