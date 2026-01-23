import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { OverflowVerticalMd } from '@ringcentral/spring-icon';
import {
  Icon,
  IconButton,
  IconButtonProps,
  List,
  Menu,
  MenuItem,
  MenuItemText,
  MenuList,
  SubMenu,
} from '@ringcentral/spring-ui';
import React, {
  FunctionComponent,
  Ref,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';

import { Drawer } from '../Drawer';
import { HoverAction } from '../HoverAction';

import i18n from './i18n';

export type SubmenuAction = {
  actionType: string;
  symbol?: React.ComponentType;
  /**
   * click handler for the submenu action
   *
   * if the action return true, the effect will not be called
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | boolean;
  /**
   * whether the submenu action is disabled
   */
  disabled?: boolean;
  /**
   * the label of the submenu action
   */
  label: string;
  /**
   * Custom icon JSX element - if provided, this will be used instead of the symbol
   */
  customIcon?: React.ReactNode;
};

export type ActionMenuListButtonProps = IconButtonProps & {
  actionType: string;
  tooltip?: string;
  /**
   * when you want full control the button, use that custom component
   */
  Component?: React.ComponentType<IconButtonProps>;
  /**
   * indicates this should render as a submenu
   */
  isSubmenu?: boolean;
  /**
   * array of submenu actions (only used when isSubmenu is true)
   */
  submenuActions?: SubmenuAction[];
};

export type ActionMenuListAction = {
  /**
   * get the open state of the menu
   */
  getListOpened: () => boolean;
};

export type ActionMenuListProps = {
  /**
   * An array of action objects to be rendered as buttons.
   */
  buttons: ActionMenuListButtonProps[];
  /**
   * The mode of the action menu
   *
   * - `hover`: the list will show when hover at parent layer `group`, default `displayCount` be `3`
   * - `plain`: the list just render at target, the default `displayCount` be same as the length of `buttons`
   *
   * @default 'hover'
   */
  variant?: 'hover' | 'plain';
  /**
   * The variant of the list
   *
   * - `menu`: the list will be a menu list
   * - `drawer`: the list will be a drawer list
   *
   * @default 'menu'
   */
  listVariant?: 'menu' | 'drawer';
  /**
   * The number of actions to display outside the menu, the rest will be in the menu
   *
   * when variant is `plain`, the displayCount default be the length of `buttons`
   *
   * @default 3
   */
  displayCount?: number;
  /**
   * when items fold into menu list, does show icon at the menu list at start
   *
   * @default true
   */
  showIconAtMenuList?: boolean;
  /**
   * The props for the tooltip component
   */
  TooltipProps?: Omit<IconButtonProps['TooltipProps'], 'title'>;
  /**
   * The props for the more button
   */
  moreButtonProps?: IconButtonProps;
  /**
   * The component for the more button
   *
   * @default `IconButton`
   */
  MoreButtonComponent?: React.ComponentType<IconButtonProps>;
  /**
   * The ref map for the action buttons
   *
   * use the `actionType` as the key
   */
  refMap?: Record<string, React.RefObject<any>>;
  /**
   * The ref map for the action buttons
   *
   * use the `actionType` as the key
   *
   * if you want set props for all buttons, you `all` as the key
   *
   * @example
   *
   * ```tsx
   * propsMap={{
   *   all: {
   *      onMouseOver: () => console.log('onMouseOver'),
   *   },
   * }
   * ```
   */
  propsMap?: Record<string, IconButtonProps>;
  /**
   * the draggable actions for control inner state
   */
  action?: Ref<ActionMenuListAction>;
  /**
   * keep the actions button open
   */
  forceActionsOpen?: boolean;
};

/**
 * a wrapper component to ignore rest props pass into fragment
 */
const FragmentWrap: FunctionComponent = ({ children }) => (
  <React.Fragment>{children}</React.Fragment>
);

const MORE_ACTION_TYPE = 'more';

/**
 * It displays a specified number of action buttons and groups the remaining actions into a menu.
 *
 * @returns {JSX.Element | null} The rendered ActionMenuList component or null if there are no visible actions.
 */
export const ActionMenuList: React.FC<ActionMenuListProps> = ({
  buttons,
  displayCount: displayCountProp,
  variant = 'hover',
  listVariant = 'menu',
  showIconAtMenuList = true,
  TooltipProps,
  moreButtonProps,
  MoreButtonComponent = IconButton,
  refMap,
  propsMap,
  action,
  forceActionsOpen,
}) => {
  const { t } = useLocale(i18n);
  const isPlain = variant === 'plain';
  const defaultDisplayCount = isPlain ? buttons.length : 3;

  const displayCount = displayCountProp ?? defaultDisplayCount;
  const [anchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null);

  const { visibleActions, menuActions } = useMemo(() => {
    const moreThenMaxDisplay = buttons.length > displayCount;

    if (!moreThenMaxDisplay) {
      return {
        visibleActions: buttons,
        menuActions: [],
      };
    }

    // one space for the menu button
    const splitCount = displayCount - 1;

    return {
      visibleActions: buttons.slice(0, splitCount),
      menuActions: buttons.slice(splitCount),
    };
  }, [buttons, displayCount]);

  const [keepActions, setKeepActions] = useState(false);

  // State for visible button submenus
  const [visibleSubmenuAnchor, setVisibleSubmenuAnchor] = useState<{
    anchor: HTMLElement;
    submenuActions: SubmenuAction[];
  } | null>(null);

  const visibleActionButtons = visibleActions.map(
    ({
      actionType,
      Component = IconButton,
      label,
      tooltip,
      isSubmenu,
      submenuActions,
      onClick,
      ...rest
    }) => {
      const combineProps = {
        ...rest,
        ...propsMap?.['all'],
        ...propsMap?.[actionType],
      };

      const additionalProps = {
        ...combineProps,
        TooltipProps: {
          title: tooltip || label,
          ...TooltipProps,
          ...combineProps.TooltipProps,
        },
      };

      // Handle submenu for visible buttons
      if (isSubmenu && submenuActions && submenuActions.length > 0) {
        return (
          <Component
            key={actionType}
            size="medium"
            data-sign={actionType}
            ref={refMap?.[actionType]}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              setVisibleSubmenuAnchor({
                anchor: e.currentTarget,
                submenuActions,
              });
              setKeepActions?.(true);

              e.stopPropagation();
            }}
            {...additionalProps}
          />
        );
      }

      return (
        <Component
          key={actionType}
          data-sign={actionType}
          ref={refMap?.[actionType]}
          onClick={onClick}
          {...additionalProps}
        />
      );
    },
  );

  const Container = isPlain ? FragmentWrap : HoverAction;

  const open = Boolean(anchor);

  // TODO: Fix when spring UI supports positioning of Submenus
  //  https://jira_domain/browse/UXSYS-4114
  // Workaround for rendering the submenu in the view.
  // Fix submenu positioning to prevent overflow on the left side of viewport
  useEffect(() => {
    if (!open) return;

    const fixSubmenuPosition = () => {
      const leftSubmenus = document.querySelectorAll(
        '.sui-popper-menu[data-sui-popper-placement*="left"]',
      );

      leftSubmenus.forEach((element) => {
        const htmlElement = element as HTMLElement;
        const currentTransform = htmlElement.style.transform;

        // Extract translate3d values: translate3d(x, y, z)
        const match = currentTransform.match(
          /translate3d\(([^,]+),\s*([^,]+),\s*([^)]+)\)/,
        );

        if (match) {
          const [, x, y, z] = match;
          const xValue = parseFloat(x);

          // If X offset is negative, submenu goes off-screen to the left
          // Reset X to 0 to keep submenu within viewport
          if (xValue < 0) {
            htmlElement.style.transform = `translate3d(6px, ${y}, ${z})`;
          }
        }
      });
    };

    // Fix positioning immediately after menu opens
    const timer = setTimeout(fixSubmenuPosition, 0);

    // Watch for dynamically added submenus (when user hovers over submenu items)
    const observer = new MutationObserver(fixSubmenuPosition);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style'],
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [open]);

  const menuList = useMemo(
    () =>
      menuActions.map(
        ({
          onClick,
          disabled,
          label,
          symbol,
          actionType,
          isSubmenu,
          submenuActions,
        }) => {
          // Render as SubMenu if isSubmenu is true and submenuActions are provided
          if (isSubmenu && submenuActions && submenuActions.length > 0) {
            return (
              <SubMenu
                key={actionType}
                data-sign={actionType}
                itemContent={
                  <>
                    {showIconAtMenuList && (
                      <Icon size="small" symbol={symbol} />
                    )}
                    <MenuItemText>{label}</MenuItemText>
                  </>
                }
                className="h-8 px-1"
                classes={{
                  container: 'py-0 h-8 min-h-0',
                }}
              >
                {submenuActions.map((action) => (
                  <MenuItem
                    key={action.actionType}
                    onClick={action.onClick}
                    disabled={action.disabled}
                    data-sign={action.actionType}
                    {...(propsMap?.['all'] as any)}
                    {...(propsMap?.[actionType] as any)}
                  >
                    {action.customIcon ? (
                      action.customIcon
                    ) : action.symbol ? (
                      <Icon size="small" symbol={action.symbol} />
                    ) : null}
                    <MenuItemText>{action.label}</MenuItemText>
                  </MenuItem>
                ))}
              </SubMenu>
            );
          }

          // Regular MenuItem for non-submenu items
          return (
            <MenuItem
              key={actionType}
              disabled={disabled}
              data-sign={actionType}
              onClick={onClick as never}
              classes={{
                root: 'h-8 px-1',
                container: 'py-0 h-8 min-h-0',
              }}
              {...(propsMap?.['all'] as any)}
              {...(propsMap?.[actionType] as any)}
            >
              {showIconAtMenuList && <Icon size="small" symbol={symbol} />}
              <MenuItemText>{label}</MenuItemText>
            </MenuItem>
          );
        },
      ),
    [menuActions, propsMap, showIconAtMenuList],
  );

  const menu = useMemo(() => {
    if (listVariant === 'drawer') {
      return (
        <Drawer
          bodyProps={{
            'data-sign': 'moreActionList',
          }}
          open={open}
          onClose={() => {
            setMenuAnchor(null);
          }}
        >
          <List tabIndex={0} className="my-2">
            {menuList}
          </List>
        </Drawer>
      );
    }

    return (
      <Menu
        open={open}
        anchorEl={anchor}
        onClose={() => {
          setMenuAnchor(null);
        }}
        onClick={(e) => {
          // TODO: spring-ui issue, when click the backdrop will trigger the onClick event also UXSYS-3892
          e.stopPropagation();
        }}
        onExitComplete={() => {
          setKeepActions?.(false);
        }}
        data-sign="moreActionList"
        classes={{
          paper: 'py-1',
        }}
      >
        <MenuList nowrap={false}>{menuList}</MenuList>
      </Menu>
    );
  }, [anchor, listVariant, menuList, open]);

  useImperativeHandle(
    action,
    () => ({
      getListOpened: () => open,
    }),
    [open],
  );

  if (visibleActions.length === 0 && menuActions.length === 0) return null;

  const render = (
    <Container open={keepActions || forceActionsOpen}>
      {visibleActionButtons}
      {menuActions.length > 0 && (
        <>
          <MoreButtonComponent
            shape="squircle"
            variant="outlined"
            size="medium"
            color={'secondary'}
            symbol={OverflowVerticalMd}
            data-sign={MORE_ACTION_TYPE}
            ref={refMap?.[MORE_ACTION_TYPE]}
            {...moreButtonProps}
            TooltipProps={{
              title: t(MORE_ACTION_TYPE),
              ...TooltipProps,
              ...moreButtonProps?.TooltipProps,
            }}
            onClick={(e) => {
              setMenuAnchor(e.currentTarget);
              setKeepActions?.(true);
              e.stopPropagation();
              moreButtonProps?.onClick?.(e);
            }}
            {...propsMap?.[MORE_ACTION_TYPE]}
          />
          {menu}
        </>
      )}
    </Container>
  );

  // Render visible button submenu
  const visibleSubmenuMenu = visibleSubmenuAnchor && (
    <Menu
      open={true}
      anchorEl={visibleSubmenuAnchor.anchor}
      onClose={() => {
        setVisibleSubmenuAnchor(null);
        setKeepActions?.(false);
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {visibleSubmenuAnchor.submenuActions.map((action) => (
        <MenuItem
          key={action.actionType}
          onClick={(e) => {
            action.onClick?.(e);
            setVisibleSubmenuAnchor(null);
            setKeepActions?.(false);
          }}
          disabled={action.disabled}
          data-sign={action.actionType}
        >
          {action.customIcon ? (
            action.customIcon
          ) : action.symbol ? (
            <Icon size="small" symbol={action.symbol} />
          ) : null}
          <MenuItemText>{action.label}</MenuItemText>
        </MenuItem>
      ))}
    </Menu>
  );

  // in test env, render the action type for debug test easier
  if (process.env.NODE_ENV === 'test') {
    return (
      <>
        <span data-sign="actionTypes">
          {buttons.map((b) => b.actionType).join(',')}
        </span>
        {render}
        {visibleSubmenuMenu}
      </>
    );
  }

  return (
    <>
      {render}
      {visibleSubmenuMenu}
    </>
  );
};
