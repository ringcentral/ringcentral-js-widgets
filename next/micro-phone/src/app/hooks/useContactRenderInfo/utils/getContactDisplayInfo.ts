import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import type { CorrespondentMatch } from '@ringcentral-integration/micro-message/src/app/services';

import { t } from '../i18n';

type EntityOrCorrespondentMatch = Entity | CorrespondentMatch;

type ContactDisplayType =
  | 'contact'
  | 'phoneNumber'
  | 'extensionNumber'
  | 'callerIdName'
  | 'unknown';

export type GetContactDisplayInfoOptions<
  T extends Entity | CorrespondentMatch,
> = {
  /**
   * the caller id name from webphone during the call connection
   */
  callerId?: string | undefined | null;
  /**
   * the server name from backend server
   */
  serverName?: string | undefined | null;
  queueName: string | undefined | null;
  matches?: T[];
  phoneNumber?: string | null;
  extensionNumber?: string | null;
  groupNumbers?: string[];
  /**
   * does use external selection to display the contact instead of use matches, that will effect the `numberOfMatches` in metadata return value
   */
  displaySelection?: EntityOrCorrespondentMatch;
  /**
   * the selections of the contact from backend api
   */
  selections?: EntityOrCorrespondentMatch[];
  /**
   * when match type is `phoneNumber`, how to display the information
   *
   * usually use `phoneNumber`, but if the place that you use already render phoneNumber in other place, use `unknown` to prevent render the phone number again
   *
   * @default 'phoneNumber'
   */
  phoneNumberDisplayMode?: 'unknown' | 'phoneNumber';
  /** when enable that, and have match entities, we will always show the first match */
  alwaysShowFirstMatch?: boolean;
  /**
   * Provide to override the default crm match logic for Maybe: (Match)
   */
  getDefaultCrmMatch?: (matches: T[]) => T | undefined;
};

export const getContactDisplayInfo = <T extends Entity | CorrespondentMatch>(
  options: GetContactDisplayInfoOptions<T>,
) => {
  const {
    callerId,
    serverName,
    queueName,
    matches = [],
    phoneNumber,
    extensionNumber,
    phoneNumberDisplayMode = 'phoneNumber',
    displaySelection,
    selections,
    alwaysShowFirstMatch,
    getDefaultCrmMatch,
  } = options;
  let type = 'contact' as ContactDisplayType;

  const callerIdName = callerId || serverName;

  const callerIdNameGetter = () => {
    type = 'callerIdName';

    // when name be Unknown from server, mark that be unknown type
    if (callerIdName === 'Unknown' || callerIdName === 'Anonymous') {
      return unknownGetter();
    }

    /**
     *
     * server will add queue name into the callerIdName directly, so we need to remove the queue name from the callerIdName
     * some how like `callQueueName - callerIdName`=> `callerIdName`
     * some how like `callQueueName - `=> '', assume as not have callerId
     * some how like `callQueueName -`=> '', assume as not have callerId
     * when be queue call, should remove the queue name from the callerIdName
     */
    if (queueName) {
      // in platform when have caller id set in queue will group with queue name and caller id
      if (callerIdName?.startsWith(`${queueName} -`)) {
        return (
          callerIdName
            .slice(queueName.length + 2)
            // trim the start and end space
            .trim()
        );
      }
    }
    return callerIdName;
  };

  const phoneNumberGetter = () => {
    type = 'phoneNumber';

    if (phoneNumberDisplayMode === 'unknown') {
      return unknownGetter();
    }

    return phoneNumber;
  };

  const extensionNumberGetter = () => {
    type = 'extensionNumber';

    return extensionNumber;
  };

  const unknownGetter = () => {
    type = 'unknown';

    return t('unknownNumber');
  };

  const contactGetter = () => {
    if (matches.length === 0 && !selections?.length) return null;

    if (displaySelection) {
      return { contact: displaySelection, showMaybe: false };
    }

    // when single match, and have selection array pass in, but the data be empty, that means the use unselect this match, so we return null for show as non match
    if (
      matches.length === 1 &&
      matches[0].resourceType &&
      selections &&
      selections.length === 0
    ) {
      return null;
    }

    if (matches.length === 1 || alwaysShowFirstMatch) {
      return { contact: matches[0], showMaybe: false };
    }

    // use crm first matched contact as default match
    // if no crm contact, use rc directory as default match
    const defaultCrmMatch =
      getDefaultCrmMatch?.(matches) ||
      matches.find((match) => !!match.resourceType);
    const contact = defaultCrmMatch ? defaultCrmMatch : matches[0];

    if (contact) {
      return {
        contact: contact,
        showMaybe: true,
      };
    }

    return null;
  };

  const contactNameGetter = (
    contactInfo: {
      contact: Entity | CorrespondentMatch;
      showMaybe: boolean;
    } | null,
  ) => {
    type = 'contact';

    if (!contactInfo || !contactInfo.contact) return null;

    return contactInfo.contact.name;
  };

  const matchedContactMetadata = contactGetter();
  const displayName = (
    contactNameGetter(matchedContactMetadata) ||
    callerIdNameGetter() ||
    extensionNumberGetter() ||
    phoneNumberGetter() ||
    unknownGetter()
  )
    // always time all space
    .trim();

  const numberOfMatches = displaySelection
    ? selections?.length
    : matches.length;

  const returnResult = {
    /**
     * the render type of the result
     */
    type,
    displayName,
    matchedContact: (displaySelection ||
      matchedContactMetadata?.contact ||
      matches[0]) as T,
    dialToPhoneNumber: (extensionNumber ?? phoneNumber) || undefined,
    metadata: {
      ...matchedContactMetadata,
      selections,
      matches,
      queueName,
      serverName,
      numberOfMatches,
    },
  };

  return returnResult;
};

export type ContactDisplayInfo = ReturnType<typeof getContactDisplayInfo>;
