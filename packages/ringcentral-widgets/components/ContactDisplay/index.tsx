import type { FunctionComponent } from 'react';
import React, { useState } from 'react';

import classnames from 'classnames';

import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import {
  ellipsis,
  flexWidth,
  palette2,
  radius,
  RcButton,
  RcIcon,
  RcMenu,
  RcMenuItem,
  spacing,
  styled,
} from '@ringcentral/juno';
import { ArrowDown2, ArrowUp2 } from '@ringcentral/juno-icon';

import type { ContactDisplayItemProps } from './ContactDisplayItem';
import { ContactDisplayItem } from './ContactDisplayItem';
import { displayFormatter } from './displayFormatter';
import type { Entity } from './Entity.interface';
import i18n from './i18n';
import styles from './styles.scss';

export const UnReadDot = styled.div`
  display: inline-block;
  height: 8px;
  ${flexWidth('8px')}
  background-color: ${palette2('interactive', 'f01')};
  border-radius: ${radius('round')};
  margin-right: ${spacing(1.5)};
`;

const MenuButton = styled(RcButton)`
  && {
    padding: 0;
    font-size: 14px;
    font-weight: normal;
    max-width: 100%;
  }
`;

type ContactDisplayProps = {
  name?: string;
  isOnConferenceCall?: boolean;
  reference?: (...args: any[]) => any;
  className?: string;
  contactMatches: Entity[];
  selected: number;
  onSelectContact?: (...args: any[]) => any;
  disabled?: boolean;
  isLogging: boolean;
  fallBackName?: string;
  enableContactFallback?: boolean;
  areaCode: string;
  countryCode: string;
  phoneNumber?: string;
  currentLocale: string;
  currentSiteCode?: string;
  isMultipleSiteEnabled?: boolean;
  groupNumbers?: string[];
  showType?: boolean;
  selectClassName?: string;
  selectedClassName?: string;
  showPlaceholder?: boolean;
  placeholder?: string;
  brand?: string;
  stopPropagation?: boolean;
  sourceIcons?: ContactDisplayItemProps['sourceIcons'];
  phoneSourceNameRenderer?: (...args: any[]) => any;
  showGroupNumberName?: boolean;
  contactName?: any;
  subContactName?: any;
  iconClassName?: string;
  dropdownRenderFunction?: (...args: any[]) => any;
  dropdownClassName?: string;
  unread?: boolean;
  missed?: boolean;
  formatPhone?: (phoneNumber: string) => string | undefined;
  warmTransferRole?: string;
  maxExtensionNumberLength?: number;
};

type TitleProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  unread?: boolean;
  missed?: boolean;
};

const _Title: FunctionComponent<TitleProps> = ({
  children,
  // just pick out of props
  unread,
  missed,
  ...rest
}) => (
  <div {...rest} data-sign="currentName">
    {children}
  </div>
);

export const Title = styled(_Title)`
  font-size: 14px;
  color: ${({ unread, missed }) =>
    // eslint-disable-next-line no-nested-ternary
    missed
      ? palette2('danger', 'f02')
      : unread
      ? palette2('interactive', 'f01')
      : palette2('neutral', 'f06')};
  ${ellipsis};
  line-height: 1.3;
`;

const StyledMenu = styled(RcMenu)`
  ${RcMenuItem} {
    max-width: 230px;

    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const ContactDisplay: React.FC<ContactDisplayProps> = ({
  warmTransferRole,
  name,
  reference,
  className,
  contactMatches,
  selected,
  onSelectContact,
  disabled,
  isLogging,
  fallBackName,
  enableContactFallback,
  areaCode,
  countryCode,
  phoneNumber,
  currentLocale,
  currentSiteCode,
  isMultipleSiteEnabled,
  groupNumbers,
  showType,
  selectClassName,
  selectedClassName,
  showPlaceholder,
  placeholder,
  brand,
  stopPropagation,
  sourceIcons = {},
  phoneSourceNameRenderer,
  showGroupNumberName,
  contactName,
  subContactName,
  isOnConferenceCall,
  iconClassName,
  dropdownRenderFunction,
  dropdownClassName,
  unread,
  missed,
  formatPhone,
  maxExtensionNumberLength,
}) => {
  const phoneNumberAfterFormat =
    // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
    formatPhone?.(phoneNumber) ??
    formatNumber({
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      phoneNumber,
      countryCode,
      areaCode,
      siteCode: currentSiteCode,
      isMultipleSiteEnabled,
      maxExtensionLength: maxExtensionNumberLength,
    });

  const unreadDot = unread && (
    <UnReadDot data-sign="unread" aria-label="unread" />
  );

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const contentEl = (() => {
    if (isOnConferenceCall) {
      const confStr = i18n.getString('conferenceCall', currentLocale);
      return (
        <Title title={confStr} unread={unread} missed={missed}>
          {unreadDot}
          {confStr}
        </Title>
      );
    }

    if (contactName) {
      return (
        <Title
          title={
            subContactName
              ? `${contactName.title || contactName}${subContactName.title}`
              : contactName.title || contactName
          }
          unread={unread}
          missed={missed}
        >
          {unreadDot}
          {contactName.tag || contactName}
          {warmTransferRole}
          {subContactName && subContactName.tag}
        </Title>
      );
    }

    if (groupNumbers && showGroupNumberName) {
      const groupNames = groupNumbers.map((groupNumber) => {
        const groupContact = contactMatches.find(
          (match) => match.extensionNumber === groupNumber,
        );
        return (groupContact && groupContact.name) || groupNumber;
      });
      const display = groupNames.join(', ');

      return (
        <Title title={display} unread={unread} missed={missed}>
          {unreadDot}
          {display}
        </Title>
      );
    }

    if (groupNumbers) {
      const display = groupNumbers.join(', ');
      return (
        <Title title={display} unread={unread} missed={missed}>
          {unreadDot}
          {display}
        </Title>
      );
    }

    if (contactMatches.length === 0) {
      const fallBackResult = enableContactFallback && fallBackName;

      const display =
        name ||
        fallBackResult ||
        phoneNumberAfterFormat ||
        i18n.getString('unknownNumber', currentLocale);

      const groupedNameTitle = name
        ? `${name} | ${phoneNumberAfterFormat}`
        : undefined;

      const title =
        // grouped name with phone number
        groupedNameTitle ||
        fallBackResult ||
        phoneNumberAfterFormat ||
        undefined;

      return (
        <Title title={title} unread={unread} missed={missed}>
          {unreadDot}
          {display}
        </Title>
      );
    }

    if (contactMatches.length === 1) {
      const display = contactMatches[0].name;
      const title = displayFormatter({
        entityName: display,
        entityType: contactMatches[0].entityType,
        // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
        phoneNumber: phoneNumberAfterFormat,
        brand,
        currentLocale,
        phoneSourceNameRenderer,
      });

      return (
        <Title title={title} unread={unread} missed={missed}>
          {unreadDot}
          {display}
        </Title>
      );
    }

    if (contactMatches.length > 1) {
      const entities = [...contactMatches];
      let currPlaceholder: string;
      let _selected = selected;
      if (showPlaceholder) {
        currPlaceholder =
          placeholder || i18n.getString('select', currentLocale);
      } else {
        _selected = _selected < 0 ? 0 : _selected;
      }

      const curr = entities[_selected];

      const value = displayFormatter({
        entityName: curr?.name,
        // @ts-expect-error TS(2322): Type 'string | false | undefined' is not assignabl... Remove this comment to see the full error message
        entityType: showType && curr.entityType,
        brand,
        currentLocale,
        phoneSourceNameRenderer,
      });

      const title = curr
        ? displayFormatter({
            entityName: curr.name,
            entityType: curr.entityType,
            // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
            phoneNumber: phoneNumberAfterFormat,
            brand,
            currentLocale,
            phoneSourceNameRenderer,
          })
        : phoneNumberAfterFormat;

      const open = Boolean(anchorEl);

      // @ts-expect-error TS(2454): Variable 'currPlaceholder' is used before being as... Remove this comment to see the full error message
      const items = currPlaceholder ? [{} as Entity, ...entities] : entities;

      return (
        <Title unread={unread} missed={missed}>
          <MenuButton
            variant="plain"
            data-sign="menuButton"
            color={unread ? 'interactive.f01' : 'neutral.f06'}
            onClick={handleClick}
            disabled={disabled || isLogging}
            // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
            title={title}
            endIcon={
              <RcIcon
                symbol={open ? ArrowUp2 : ArrowDown2}
                size="small"
                color="neutral.f04"
              />
            }
          >
            {unreadDot}
            <Title unread={unread} missed={missed}>
              {/* @ts-expect-error TS(2454): Variable 'currPlaceholder' is used */}
              {selected > -1 ? value : currPlaceholder}
            </Title>
          </MenuButton>
          <StyledMenu
            open={open}
            anchorEl={anchorEl}
            onClose={(e: any, reason) => {
              // stop event propagation to prevent click event on item
              if (reason === 'backdropClick') {
                e.stopPropagation();
              }

              handleClose();
            }}
            aria-label="choice a presence state"
          >
            {items.map((entity, i) => {
              const title = entity
                ? displayFormatter({
                    entityName: entity.name,
                    entityType: entity.entityType,
                    // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
                    phoneNumber: phoneNumberAfterFormat,
                    brand,
                    currentLocale,
                    phoneSourceNameRenderer,
                  })
                : phoneNumberAfterFormat;

              const itemValue = displayFormatter({
                entityName: entity.name,
                // @ts-expect-error TS(2322): Type 'string | false | undefined' is not assignabl... Remove this comment to see the full error message
                entityType: showType && entity.entityType,
                brand,
                currentLocale,
                phoneSourceNameRenderer,
              });

              const isPlaceholder = showPlaceholder && i === 0;

              const child = (() => {
                if (isPlaceholder) {
                  return currPlaceholder;
                }

                return dropdownRenderFunction ? (
                  dropdownRenderFunction(entity)
                ) : (
                  <ContactDisplayItem
                    entityName={entity.name}
                    entityType={entity.entityType}
                    sourceIcons={sourceIcons}
                  />
                );
              })();

              return (
                <RcMenuItem
                  // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
                  title={title}
                  value={itemValue}
                  key={i}
                  selected={value === itemValue}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (isPlaceholder) {
                      // TODO: should check that feature in salesforce
                      // do nothing
                    } else {
                      onSelectContact?.(entity, i);
                    }

                    handleClose();
                  }}
                >
                  {child}
                </RcMenuItem>
              );
            })}
          </StyledMenu>
        </Title>
      );
    }
  })();

  return <div className={classnames(styles.root, className)}>{contentEl}</div>;
};
ContactDisplay.defaultProps = {
  currentSiteCode: '',
  isMultipleSiteEnabled: false,
  isOnConferenceCall: false,
  disabled: false,
  fallBackName: '',
  showType: true,
  showPlaceholder: true,
  placeholder: '',
  stopPropagation: true,
  showGroupNumberName: false,
  maxExtensionNumberLength: 6,
};

export default ContactDisplay;
