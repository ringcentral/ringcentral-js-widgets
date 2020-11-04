import React, { FunctionComponent } from 'react';
import classnames from 'classnames';
import { ContactModel } from 'ringcentral-integration/interfaces/Contact.model';
import { extensionStatusTypes } from 'ringcentral-integration/enums/extensionStatusTypes';
import { PresenceModel } from 'ringcentral-integration/interfaces/Presence.model';
import { Avatar } from './Avatar';
import styles from '../styles.scss';
import i18n from '../i18n';
import PresenceStatusIcon from '../../PresenceStatusIcon';
import { getPresenceStatusName } from '../../../lib/getPresenceStatusName';
import { sourceNodeRenderer } from '../ContactDetails.interface';

interface StatusProps {
  inactive: boolean;
  presence?: PresenceModel;
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
    const { presenceStatus, dndStatus } = presence;
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
        <span className={styles.presenceName}>{presenceName}</span>
      </div>
    );
  }
  return null;
};

interface NameProps {
  presence?: PresenceModel;
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
    >
      {name}
    </div>
  );
};

export interface ProfileProps extends sourceNodeRenderer {
  contact: ContactModel;
  currentLocale: string;
  isMultipleSiteEnabled: boolean;
}

export const Profile: FunctionComponent<ProfileProps> = ({
  contact: { name, presence, profileImageUrl, status, site, type },
  sourceNodeRenderer,
  currentLocale,
  isMultipleSiteEnabled,
}) => {
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
