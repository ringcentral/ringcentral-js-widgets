import {
  injectable,
  optional,
  RcModule,
} from '@ringcentral-integration/next-core';
import type { HistoryAction } from '@ringcentral-integration/next-widgets/components';

import type {
  EntityOrCorrespondentMatch,
  IntegrationConfigOptions,
} from './IntegrationConfig.interface';
import { t } from './i18n';

const DEFAULT_VIEWABLE_ENTITY_TYPES = ['company', 'personal'];

@injectable({
  name: 'IntegrationConfig',
})
export class IntegrationConfig extends RcModule {
  constructor(
    @optional('IntegrationConfigOptions')
    protected _integrationConfigOptions?: IntegrationConfigOptions,
  ) {
    super();
  }

  /**
   * Get the name of the third party app
   */
  get name() {
    const name = this._integrationConfigOptions?.name;

    return name;
  }

  /**
   * Get the search source key
   */
  get key() {
    const key = this._integrationConfigOptions?.key;
    if (process.env.NODE_ENV !== 'production' && !key) {
      throw new Error('key is not allowed to be undefined in development mode');
    }

    return key!;
  }

  /**
   * Get the viewable entity types with default fallback
   */
  get viewableEntityTypes(): string[] {
    return (
      this._integrationConfigOptions?.viewableEntityTypes ??
      DEFAULT_VIEWABLE_ENTITY_TYPES
    );
  }

  get supportViewEntity() {
    return Boolean(this._integrationConfigOptions?.onViewEntity);
  }

  get supportCreateEntity() {
    return Boolean(this._integrationConfigOptions?.onCreateEntity);
  }

  /**
   * the tooltip of the create new entity button use in many places that support create new entity
   */
  get createNewEntityTooltip() {
    return (
      this._integrationConfigOptions?.createNewEntityTooltip || t('createNew')
    );
  }

  /**
   * Get the onViewLog callback
   */
  get onViewLog() {
    return this._integrationConfigOptions?.onViewLog;
  }

  /**
   * Get the onCreateEntity callback
   */
  get onCreateEntity() {
    return this._integrationConfigOptions?.onCreateEntity;
  }

  /**
   * Get the onViewEntity callback
   */
  get onViewEntity() {
    return this._integrationConfigOptions?.onViewEntity;
  }

  /**
   * Get the viewExternalEntity callback
   */
  get viewExternalEntity() {
    return this._integrationConfigOptions?.viewExternalEntity;
  }

  /**
   * Get the onCreateLog callback
   */
  get onCreateLog() {
    return this._integrationConfigOptions?.onCreateLog;
  }

  getActionButtons({
    dialToPhoneNumber,
    matchedContact,
    disabled,
    isLogged,
  }: {
    dialToPhoneNumber: string | undefined;
    matchedContact: EntityOrCorrespondentMatch;
    disabled: boolean;
    /**
     * when be logged, will not show viewEntity button anymore
     */
    isLogged?: boolean;
  }) {
    const actions: HistoryAction[] = [];
    if (dialToPhoneNumber) {
      if (
        matchedContact?.type &&
        this.viewableEntityTypes.includes(matchedContact.type)
      ) {
        if (this.supportViewEntity && !isLogged) {
          actions.push({
            type: 'viewEntity',
            disabled: disabled,
          });
        }
      } else {
        if (this.supportCreateEntity) {
          actions.push({
            type: 'addEntity',
            disabled: disabled,
          });
        }
      }
    }

    return actions;
  }
}
