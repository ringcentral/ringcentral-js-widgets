import React, { FunctionComponent } from 'react';
import classnames from 'classnames';
import { ContactModel } from 'ringcentral-integration/models/Contact.model';
import { extensionStatusTypes } from 'ringcentral-integration/enums/extensionStatusTypes';
import { PresenceModel } from 'ringcentral-integration/models/Presence.model';
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
}

export const Profile: FunctionComponent<ProfileProps> = ({
  contact: { name, presence, profileImageUrl, status, type },
  sourceNodeRenderer,
  currentLocale,
}) => {
  const inactive = status === extensionStatusTypes.notActivated;
  return (
    <div className={styles.profile}>
      <div className={styles.profileWrapper}>
        <Avatar
          name={name}
          avatarUrl={profileImageUrl}
          inactive={inactive}
          source={sourceNodeRenderer({ sourceType: type })}
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
    </div>
  );
};
Profile.defaultProps = {
  sourceNodeRenderer: () => null,
};
