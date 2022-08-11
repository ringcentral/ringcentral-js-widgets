import React, { FunctionComponent, useEffect, useState } from 'react';

import { formatSameSiteExtension } from '@ringcentral-integration/phone-number/lib/format';
import { useSleep } from '@ringcentral/juno';

import DefaultAvatar from '../../assets/images/DefaultAvatar.svg';
import PlaceholderImage from '../PlaceholderImage';
import PresenceStatusIcon from '../PresenceStatusIcon';
import i18n from './i18n';
import styles from './styles.scss';
import { GetPresenceFn, usePresence } from '../../react-hooks/usePresence';

interface AvatarNodeProps {
  name: string;
  avatarUrl: string;
  isInactive: boolean;
}

const AvatarNode: FunctionComponent<AvatarNodeProps> = ({
  name,
  avatarUrl,
  isInactive,
}) => {
  const avatarStyle = isInactive
    ? styles.inactiveAvatarNode
    : styles.avatarNode;
  return (
    <PlaceholderImage
      // @ts-expect-error TS(2322): Type '{ className: string; alt: any; src: any; pla... Remove this comment to see the full error message
      className={avatarStyle}
      alt={name}
      src={avatarUrl}
      placeholder={
        <DefaultAvatar
          data-sign="profile"
          data-inactive={isInactive}
          className={avatarStyle}
        />
      }
    />
  );
};

interface ContactItemProps {
  currentLocale: string;
  currentSiteCode: string;
  isMultipleSiteEnabled: boolean;
  contact: {
    id: string;
    type: string;
    name: string;
    extensionNumber: string;
    email: string;
    profileImageUrl: string;
    presence: any;
    contactStatus: string;
  };
  getAvatarUrl: Function;
  getPresence: GetPresenceFn;
  onSelect: Function;
  sourceNodeRenderer: Function;
}

const defaultSourceNodeRenderer = () => null;
export const ContactItem: FunctionComponent<ContactItemProps> = ({
  contact,
  currentLocale,
  getPresence,
  getAvatarUrl,
  onSelect,
  currentSiteCode = '',
  isMultipleSiteEnabled = false,
  sourceNodeRenderer = defaultSourceNodeRenderer,
}) => {
  const [loading, setLoading] = useState(true);

  const { sleep: sleepForLoading } = useSleep();
  const { sleep: sleepForGettingInfo } = useSleep();

  const presence = usePresence(contact, { fetch: getPresence, timeout: 500 });

  const onItemSelected = () => {
    if (onSelect) {
      onSelect(contact);
    }
  };

  const renderMiddle = () => {
    const { name, contactStatus } = contact;
    if (contactStatus === 'NotActivated') {
      return (
        <div className={styles.infoWrapper}>
          <div
            className={styles.inactiveContactName}
            data-inactive
            title={name}
          >
            {name}
          </div>
          <div className={styles.inactiveText}>
            {i18n.getString('notActivated', currentLocale)}
          </div>
        </div>
      );
    }
    return (
      <div className={styles.contactName} title={name}>
        {name}
      </div>
    );
  };

  useEffect(() => {
    // TODO: should know why need 3s delay
    sleepForLoading(3).then(() => {
      setLoading(false);
    });

    sleepForGettingInfo(500).then(async () => {
      getAvatarUrl(contact);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div className={styles.root} />;
  }

  const { name, extensionNumber, type, profileImageUrl, contactStatus } =
    contact;

  let displayingNumber = extensionNumber;
  if (isMultipleSiteEnabled) {
    displayingNumber = formatSameSiteExtension({
      currentSiteCode,
      extension: extensionNumber,
    });
  }
  const sourceNode = sourceNodeRenderer({ sourceType: type });

  return (
    <div
      className={styles.root}
      onClick={onItemSelected}
      data-sign="contactItem"
    >
      <div className={styles.contactProfile}>
        <div className={styles.avatarNodeContainer}>
          <AvatarNode
            name={name}
            avatarUrl={profileImageUrl}
            isInactive={contactStatus === 'NotActivated'}
          />
        </div>
        {sourceNode ? (
          <div className={styles.sourceNodeContainer}>{sourceNode}</div>
        ) : null}
        {contactStatus !== 'NotActivated' && presence ? (
          <div className={styles.presenceNodeContainer}>
            <PresenceStatusIcon className={styles.presenceNode} {...presence} />
          </div>
        ) : null}
      </div>
      {renderMiddle()}
      <div className={styles.phoneNumber} title={displayingNumber}>
        {displayingNumber}
      </div>
    </div>
  );
};

export default ContactItem;
