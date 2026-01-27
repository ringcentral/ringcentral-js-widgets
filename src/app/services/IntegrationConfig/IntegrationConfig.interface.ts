import type MessageStoreCallerInfoResponseFrom from '@rc-ex/core/lib/definitions/MessageStoreCallerInfoResponseFrom';
import type MessageStoreCallerInfoResponseTo from '@rc-ex/core/lib/definitions/MessageStoreCallerInfoResponseTo';
import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import {
  CorrespondentMatch,
  FilteredConversation,
} from '@ringcentral-integration/micro-message/src/app/services';
import type {
  HistoryCall,
  SimpleCrmObject,
} from '@ringcentral-integration/micro-phone/src/app/services';

export type CreateEntityOptions =
  | MessageStoreCallerInfoResponseFrom
  | MessageStoreCallerInfoResponseTo;

export type EntityOrCorrespondentMatch =
  | Entity
  | CorrespondentMatch
  | undefined;

/**
 * the options for the integration config related config
 */
export type IntegrationConfigOptions = {
  /**
   * the name of the third party app
   */
  name?: string;
  /**
   * the key of the third party source entity use in search and match
   */
  key?: string;
  /**
   * be trigger when click the view log button
   */
  onViewLog?: (entity: SimpleCrmObject) => void;
  /**
   * be trigger when click the create entity button
   */
  onCreateEntity?: (options?: CreateEntityOptions) => Promise<void> | void;
  /**
   * be trigger when click the create log button
   */
  onCreateLog?: (
    conversationId: string,
    actionType: 'createLog' | 'selectRecordsForAutoLog',
  ) => Promise<void> | void | boolean;
  /**
   * the types that can be clickable to trigger `onContactClick`
   *
   * @default ['company', 'personal']
   */
  viewableEntityTypes?: string[];
  /**
   * trigger when click the view entity
   */
  onViewEntity?: (
    contact: EntityOrCorrespondentMatch,
    metadata?: {
      isMaybeMatch?: boolean;
      call?: HistoryCall;
      conversation?: FilteredConversation;
    },
  ) => Promise<void> | void;
  /**
   * trigger when click the view external entity
   */
  viewExternalEntity?: (
    entity: EntityOrCorrespondentMatch,
  ) => Promise<void> | void;
  /**
   * the tooltip of the create new entity button use in many places that support create new entity
   */
  createNewEntityTooltip?: string;
};
