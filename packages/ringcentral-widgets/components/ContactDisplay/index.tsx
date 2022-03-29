import React, { FunctionComponent, useState } from 'react';

import classnames from 'classnames';

import formatNumber from '@ringcentral-integration/commons/lib/formatNumber';
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
import { ArrowDown2, ArrowUp2 } from '@ringcentral/juno/icon';

import {
  ContactDisplayItem,
  ContactDisplayItemProps,
} from './ContactDisplayItem';
import { displayFormatter } from './displayFormatter';
import { Entity } from './Entity.interface';
import i18n from './i18n';
import styles from './styles.scss';

const UnReadDot = styled.div`
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
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
  showGroupNumberName?: boolean;
  contactName?: any;
  subContactName?: any;
  iconClassName?: string;
  dropdownRenderFunction?: (...args: any[]) => any;
  dropdownClassName?: string;
  unread?: boolean;
  missed?: boolean;
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

const Title = styled(_Title)`
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
}) => {
  const phoneNumberAfterFormat = formatNumber({
    phoneNumber,
    countryCode,
    areaCode,
    siteCode: currentSiteCode,
    isMultipleSiteEnabled,
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
      const display =
        (enableContactFallback && fallBackName) ||
        phoneNumberAfterFormat ||
        i18n.getString('unknownNumber', currentLocale);
      const title =
        (enableContactFallback && fallBackName) || phoneNumberAfterFormat || '';
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
        entityType: showType && curr.entityType,
        brand,
        currentLocale,
        phoneSourceNameRenderer,
      });

      const title = curr
        ? displayFormatter({
            entityName: curr.name,
            entityType: curr.entityType,
            phoneNumber: phoneNumberAfterFormat,
            brand,
            currentLocale,
            phoneSourceNameRenderer,
          })
        : phoneNumberAfterFormat;

      const open = Boolean(anchorEl);

      const items = currPlaceholder ? [{} as Entity, ...entities] : entities;

      return (
        <Title unread={unread} missed={missed}>
          <MenuButton
            variant="plain"
            data-sign="menuButton"
            color={unread ? 'interactive.f01' : 'neutral.f06'}
            onClick={handleClick}
            disabled={disabled || isLogging}
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
                    phoneNumber: phoneNumberAfterFormat,
                    brand,
                    currentLocale,
                    phoneSourceNameRenderer,
                  })
                : phoneNumberAfterFormat;

              const itemValue = displayFormatter({
                entityName: entity.name,
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
                      onSelectContact(entity, i);
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
  iconClassName: null,
  dropdownClassName: null,
};

export default ContactDisplay;
