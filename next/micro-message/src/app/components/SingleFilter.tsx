import {
  ExpandCollapseCaret,
  type HTMLDataAttribute,
  IconButton,
  type IconButtonProps,
  Menu,
  MenuItem,
  MenuList,
  type MenuProps,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { useMemo, useRef, useState } from 'react';

const filterButtonStyle =
  'sui-filter-button sui-filter-button-root max-w-[120px]';

type SingleFilterData = {
  label: string;
  value: string;
};

type SingleFilterProps = {
  /**
   * Data array for filter options
   */
  data: SingleFilterData[];
  /**
   * Current selected value
   */
  value?: string;
  /**
   * Callback when selection changes
   */
  onSelect: (value: string) => void;
  /**
   * Number of visible items when menu is closed
   */
  visibleCount?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Props to pass to the Menu component
   */
  MenuProps?: Partial<MenuProps>;
  /**
   * Props to pass to the More button
   */
  MoreButtonProps?: IconButtonProps & HTMLDataAttribute;
};

/**
 * Single filter component with more menu button
 *
 * for replace the spring-ui SingleFilter component, which is not working as expected, buggy.
 */
export const SingleFilter: React.FC<SingleFilterProps> = ({
  data,
  value,
  onSelect,
  visibleCount = 2,
  className,
  MenuProps,
  MoreButtonProps,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Fix visibleCount when menu opens, until it closes
  const [fixedVisibleCount, setFixedVisibleCount] = useState<number | null>(
    null,
  );

  // Calculate visible items (follow original data order)
  const visibleItems = useMemo(() => {
    const visibleItems = data.slice(0, visibleCount);

    if (visibleItems.find((item) => item.value === value)) {
      return visibleItems;
    }

    // when not in the visible list, replace end of item to target selected item
    return [
      ...visibleItems.slice(0, -1),
      data.find((item) => item.value === value)!,
    ];
  }, [data, value, visibleCount]);

  // Calculate hidden items
  const hiddenItems = useMemo(() => {
    // exclude visible items
    return data.filter((item) => !visibleItems.includes(item));
  }, [data, visibleItems]);

  const handleMenuOpen = () => {
    setMenuOpen(true);
    // Fix the visible count when menu opens
    if (fixedVisibleCount === null) {
      setFixedVisibleCount(visibleCount);
    }
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    // Reset fixed visible count when menu closes
    setFixedVisibleCount(null);
    // Call the onClose from MenuProps if provided
    MenuProps?.onClose?.({} as React.MouseEvent<HTMLElement>, 'backdropClick');
  };

  const handleItemClick = (itemValue: string) => {
    onSelect(itemValue);
    handleMenuClose();
  };

  return (
    <div
      className={clsx('sui-single-filter sui-single-filter-root', className)}
    >
      {/* Visible filter buttons */}
      {visibleItems.map((item) => (
        <button
          key={item.value}
          className={clsx(
            filterButtonStyle,
            value === item.value && 'sui-selected',
          )}
          title={item.label}
          aria-current={value === item.value}
          type="button"
          onClick={() => handleItemClick(item.value)}
          data-sign={`filter-${item.value}`}
        >
          {item.label}
        </button>
      ))}

      {/* More button if there are hidden items */}
      {hiddenItems.length > 0 && (
        <>
          <IconButton
            ref={menuButtonRef}
            shape="squircle"
            variant="contained"
            size="small"
            color="secondary"
            background={false}
            className="sui-single-filter-more"
            onClick={handleMenuOpen}
            aria-expanded={menuOpen}
            data-prevent-blur="true"
            {...MoreButtonProps}
          >
            <ExpandCollapseCaret orientation="vertical" expanded={menuOpen} />
          </IconButton>

          <Menu
            anchorEl={menuButtonRef.current}
            open={menuOpen}
            {...MenuProps}
            onClose={handleMenuClose}
          >
            {/* Show all hidden items */}
            <MenuList>
              {hiddenItems.map((item) => (
                <MenuItem
                  key={item.value}
                  selected={value === item.value}
                  onClick={() => handleItemClick(item.value)}
                  title={item.label}
                >
                  {item.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </>
      )}
    </div>
  );
};
