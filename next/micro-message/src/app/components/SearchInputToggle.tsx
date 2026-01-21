import { SearchMd } from '@ringcentral/spring-icon';
import {
  type HTMLDataAttribute,
  Icon,
  IconButton,
  TextField,
} from '@ringcentral/spring-ui';
import React, { useEffect, useRef } from 'react';

type SearchInputToggleProps = {
  /**
   * Controlled expanded state
   */
  expanded?: boolean;
  /**
   * Always expanded (never show toggle button)
   */
  alwaysExpanded?: boolean;
  /**
   * Callback when expanded state changes
   */
  onExpandedChange?: (expanded: boolean) => void;
  /**
   * Current search input value
   */
  searchInput: string;
  /**
   * Callback when search input changes
   */
  onSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Placeholder text for search input
   */
  placeholder?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
} & HTMLDataAttribute;

export const SearchInputToggle: React.FC<SearchInputToggleProps> = ({
  expanded: controlledExpanded,
  alwaysExpanded = false,
  onExpandedChange,
  searchInput,
  onSearchInputChange,
  placeholder,
  className,
  ...rest
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // If always expanded, ignore expansion logic
  const expanded = alwaysExpanded ? true : controlledExpanded ?? false;

  const handleSearchButtonClick = () => {
    if (!alwaysExpanded) {
      const newExpanded = true;
      onExpandedChange?.(newExpanded);
    }

    // Focus input after state update
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 0);
  };

  const handleSearchBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.relatedTarget?.getAttribute('data-prevent-blur') === 'true') {
      return;
    }

    if (!alwaysExpanded && searchInput.length === 0) {
      const newExpanded = false;
      onExpandedChange?.(newExpanded);
    }
  };

  // Update expanded state when searchInput changes externally
  useEffect(() => {
    if (!alwaysExpanded && searchInput.length > 0 && !expanded) {
      const newExpanded = true;
      onExpandedChange?.(newExpanded);
    }
  }, [searchInput, expanded, alwaysExpanded, onExpandedChange]);

  return (
    <div className={className}>
      {expanded ? (
        <div className="overflow-hidden flex-1 min-w-0">
          <TextField
            inputRef={searchInputRef}
            placeholder={placeholder}
            startAdornment={<Icon symbol={SearchMd} size="small" />}
            variant="standard"
            size="medium"
            RootProps={{
              classes: {
                focusEffect: 'hidden',
                content: 'border-none',
              },
            }}
            fullWidth
            value={searchInput}
            inputProps={{
              'data-sign': rest['data-sign'],
            }}
            onChange={onSearchInputChange}
            onBlur={handleSearchBlur}
          />
        </div>
      ) : (
        <div className="h-8 -ml-1 flex items-center">
          <IconButton
            variant="icon"
            size="small"
            color="secondary"
            onClick={handleSearchButtonClick}
            data-sign={`${rest['data-sign']}-button`}
            TooltipProps={{
              title: placeholder,
            }}
          >
            <Icon symbol={SearchMd} size="small" />
          </IconButton>
        </div>
      )}
    </div>
  );
};
