import React, { FunctionComponent } from 'react';

import classnames from 'classnames';

import { extensionStatusTypes } from '@ringcentral-integration/commons/enums/extensionStatusTypes';
import {
  ContactModel,
  ContactPresence,
} from '@ringcentral-integration/commons/interfaces/Contact.model';

import { getPresenceStatusName } from '../../../lib/getPresenceStatusName';
import PresenceStatusIcon from '../../PresenceStatusIcon';
import { sourceNodeRenderer } from '../ContactDetails.interface';
import i18n from '../i18n';
import styles from '../styles.scss';
import { Avatar } from './Avatar';
import { GetPresenceFn, usePresence } from '../../../react-hooks/usePresence';

interface StatusProps {
  inactive: boolean;
  presence?: ContactPresence | null;
  currentLocale: string;
}

const Status: FunctionComponent<StatusProps> = ({
  presence,
  inactive,
  currentLocale,
}) => {
  if (inactive) {
    return (
      <div className={styles.status}>
        <div>
          <span className={styles.inactiveText}>
            {i18n.getString('notActivated', currentLocale)}
          </span>
        </div>
      </div>
    );
  }
  if (presence) {
    const { presenceStatus = '', dndStatus = '' } = presence;
    const presenceName = getPresenceStatusName(
      presenceStatus,
      dndStatus,
      currentLocale,
    );
    return (
      <div className={styles.status}>
        <div className={styles.presence}>
          <PresenceStatusIcon
            className={styles.presenceIcon}
            presenceStatus={presenceStatus}
            dndStatus={dndStatus}
          />
        </div>
        {presenceName && (
          <span className={styles.presenceName}>{presenceName}</span>
        )}
      </div>
    );
  }
  return null;
};

interface NameProps {
  presence?: ContactPresence | null;
  inactive: boolean;
  name: string;
}

const Name: FunctionComponent<NameProps> = ({ presence, inactive, name }) => {
  return (
    <div
      className={classnames(
        styles.name,
        !presence && styles.withoutPresence,
        inactive && styles.inactiveText,
      )}
      title={name}
      data-sign="contactName"
      data-inactive={inactive}
    >
      {name}
    </div>
  );
};

export interface ProfileProps extends sourceNodeRenderer {
  contact: ContactModel &
    Partial<{
      profileImageUrl: string;
      status: string;
      site: {
        name: string;
        code: string;
      };
    }>;
  currentLocale: string;
  isMultipleSiteEnabled: boolean;
  getPresence: GetPresenceFn;
}

export const Profile: FunctionComponent<ProfileProps> = ({
  contact,
  sourceNodeRenderer,
  currentLocale,
  isMultipleSiteEnabled,
  getPresence,
}) => {
  const { name, profileImageUrl, status, site, type } = contact;
  const presence = usePresence(contact, { fetch: getPresence });
  const inactive = status === extensionStatusTypes.notActivated;
  return (
    <section className={styles.profile} aria-label="profile">
      <div className={styles.profileWrapper}>
        <Avatar
          name={name}
          avatarUrl={profileImageUrl}
          inactive={inactive}
          source={
            sourceNodeRenderer && sourceNodeRenderer({ sourceType: type })
          }
        />
        <div className={styles.info}>
          <Name inactive={inactive} name={name} presence={presence} />
          <Status
            inactive={inactive}
            presence={presence}
            currentLocale={currentLocale}
          />
        </div>
      </div>
      {isMultipleSiteEnabled && site?.name && (
        <div className={styles.site} aria-label={`Site: ${site.name}`}>
          <span className={styles.label}>
            {i18n.getString('site', currentLocale)}
          </span>
          <span className={styles.content}>{site.name}</span>
        </div>
      )}
    </section>
  );
};
Profile.defaultProps = {
  sourceNodeRenderer: () => null,
};
