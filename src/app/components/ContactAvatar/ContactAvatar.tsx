import type { IContact } from '@ringcentral-integration/commons/interfaces/Contact.model';
import { useContainer } from '@ringcentral-integration/next-core';
import { CallQueueMd, ProfileMd } from '@ringcentral/spring-icon';
import { Avatar, AvatarProps, HTMLDataAttribute } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, {
  forwardRef,
  Ref,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';

import { Contacts } from '../../services';

import type { TrackProfileFn } from './ContactAvatar.interface';
import { getAvatarLetter, jRcContactAvatarColorId } from './libs';
import { useAvatarColorToken } from './useAvatarColorToken';
import { useContactAvatar } from './useContactAvatar';

export type ContactAvatarRef = AvatarProps & HTMLDataAttribute;

export type ContactAvatarProps = {
  contact?: IContact;
  /**
   * is that can click to open mini profile
   *
   * // TODO: mini profile still not in our project, so still default to false
   * @default false
   */
  clickable?: boolean;
  contactName?: string;
  /**
   * if isDepartment is `true` and `url`, `contactName` not set, use callQueue default department avatar
   */
  isDepartment?: boolean;
  textAvatarColor?: string;
  phoneNumber?: string;
  url?: string;
  /**
   * avatar will render presence if showPresence is true
   * please make sure that contact.account.id set in contact prop, otherwise get presence will return null in AccountContacts module
   *
   * # ensure the value only use once in the component lifetime when initial, not able to change after initial, must be static
   */
  showPresence?: boolean;
  /**
   * provide you can get inner props with ref, useful when you need get props to show in image preview or other place, like mini profile.
   */
  dataRef?: Ref<ContactAvatarRef>;
  /**
   * track related function
   */
  trackMiniProfileFn?: TrackProfileFn;
  trackFullProfileFn?: TrackProfileFn;
  trackProfileLocation?: string;
} & Omit<AvatarProps, 'clickable' | 'src'>;
// TODO: mini profile still not in this stage, so still not enable
// & Pick<MiniProfilePopperProps, 'preventMouseHoverEvents'> &
//    &
//   Pick<MiniProfilePopperProps, 'onOpen'>;

export const ContactAvatar = forwardRef<HTMLDivElement, ContactAvatarProps>(
  (props, ref) => {
    const {
      contact,
      contactName,
      textAvatarColor,
      phoneNumber,
      variant = 'circle',
      // TODO: mini profile still not in our project
      // clickable = false,
      dataRef,
      size = 'large',
      // preventMouseHoverEvents,
      // trackFullProfileFn,
      // trackMiniProfileFn,
      // trackProfileLocation,
      url,
      showPresence: showPresenceProp,
      isDepartment,
      ...rest
    } = props;
    const showPresence =
      showPresenceProp &&
      // only company type contact can show presence
      contact?.type === 'company';

    const showPresenceRef = useRef(showPresence);

    if (process.env.NODE_ENV !== 'production') {
      if (showPresence !== showPresenceRef.current) {
        // eslint-disable-next-line no-console
        console.warn(
          'showPresence is static value, not able to change after initial, please ensure that value only use once in the component lifetime when initial',
        );
      }
    }

    const contactId = contact?.id;

    const contractUrl =
      useContactAvatar(
        contact,
        // in spring-ui largest avatar size is 64x64, use small is enough 90x90
        'xsmall',
      ) || url;

    const presenceProps = (() => {
      // because the showPresenceRef.current is static value, so we can use it in condition
      if (showPresenceRef.current) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const contacts = useContainer<Contacts>('Contacts');
        const presence = contacts.usePresence(contact);
        const presenceStatus = presence || 'unavailable';

        const presenceProps: ContactAvatarRef['IndicatorProps'] = presence
          ? {
              variant: presenceStatus,
              ['data-presence-server-status']: presence,
              ['data-presence-status']: presenceStatus,
              ['data-sign']: 'presenceIndicator',
            }
          : undefined;
        return presenceProps;
      }
      return undefined;
    })();

    const colorId = useMemo(
      () => jRcContactAvatarColorId(contactId, phoneNumber),
      [contactId, phoneNumber],
    );

    const avatarColor = useAvatarColorToken(colorId);

    const shortName = useMemo(
      () => contactName && getAvatarLetter(contactName),
      [contactName],
    );

    const avatarProps = useMemo(() => {
      const avatarProps: ContactAvatarRef = {
        src: contractUrl,
        size,
        IndicatorProps: presenceProps,
        showStatusIndicator: presenceProps && showPresence,
        ...rest,
      };

      avatarProps.rootProps ??= {};
      (avatarProps.rootProps as any)['data-sign'] = 'contactAvatar';

      avatarProps.classes ??= {};
      if (contractUrl) {
        avatarProps.imgProps = {
          loading: 'lazy',
        };
        avatarProps['data-sign'] = 'contactAvatarImg';
        avatarProps['onErrorCapture'] = (err) => {
          // eslint-disable-next-line no-console
          console.warn('avatar onErrorCapture error?', err);
        };

        return avatarProps;
      }

      if (contactName) {
        avatarProps['data-sign'] = 'contactAvatarText';
        avatarProps['data-color-id'] = colorId;

        const bgColor = textAvatarColor || avatarColor;

        if (variant === 'circle') {
          avatarProps.classes.content = clsx(
            avatarProps.classes.content,
            bgColor,
            bgColor ? 'text-neutral-static-w0' : undefined,
          );
        } else {
          avatarProps.classes.shape = clsx(
            avatarProps.classes.shape,
            bgColor
              ? // that color able to use is because the tailwind static scan be scan in  apps/micro-contacts/src/app/components/ContactAvatar/useAvatarColorToken.ts
                `sui-squircle-bg-color-${bgColor.replace('bg-', '')}`
              : undefined,
            bgColor ? 'text-neutral-static-w0' : undefined,
          );
        }
        avatarProps.children = shortName;

        return avatarProps;
      }

      // if isDepartment is true and custom avatar or contactName not set, use callQueue default department avatar
      if (isDepartment) {
        return {
          symbol: CallQueueMd,
          ...avatarProps,
          'data-sign': 'contactAvatarDepartmentDefault',
        };
      }

      return {
        symbol: ProfileMd,
        ...avatarProps,
        'data-sign': 'contactAvatarDefault',
      };
    }, [
      contractUrl,
      size,
      presenceProps,
      showPresence,
      rest,
      contactName,
      isDepartment,
      colorId,
      textAvatarColor,
      avatarColor,
      variant,
      shortName,
    ]);

    useImperativeHandle(dataRef, () => avatarProps);

    return (
      <Avatar
        variant={variant}
        ref={ref}
        aria-label="contact avatar"
        {...avatarProps}
      />
    );

    // TODO: clickable still not enable in any project
    // return clickable ? (
    //   <MiniProfileAvatar
    //     ref={ref as any}
    //     {...avatarProps}
    //     contactId={contactId}
    //     phoneNumber={phoneNumber}
    //     contactName={contactName}
    //     aria-label="Contact avatar clickable"
    //     preventMouseHoverEvents={preventMouseHoverEvents}
    //     trackFullProfileFn={trackFullProfileFn}
    //     trackMiniProfileFn={trackMiniProfileFn}
    //     trackProfileLocation={trackProfileLocation}
    //     contactSource={contactSource}
    //   />
    // ) : (
    //   <Avatar ref={ref as any} aria-label="contact avatar" {...avatarProps} />
    // );
  },
);

ContactAvatar.displayName = 'ContactAvatar';
