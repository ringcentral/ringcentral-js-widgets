/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { DEFAULT_WIDTH } from '@ringcentral-integration/next-core/src/modules/Root';
import { MasterTemplateMd, PlusMd, SearchMd } from '@ringcentral/spring-icon';
import { Icon, IconButton, Popper } from '@ringcentral/spring-ui';
import React, { useMemo, useRef, useState } from 'react';
import { usePromise } from 'react-use';

import { AddTemplateForm } from './AddTemplateForm';
import { TemplateItem } from './TemplateItem';
import i18n from './i18n';
import { useLeaveGuard } from './useLeaveGuard';

export interface TemplatePopoverProps {
  onApplyTemplate: (content: string) => Promise<boolean>;
  templates: Array<{
    id: string;
    title: string;
    content: string;
  }>;
  onCopy: (content: string) => void;
  onDelete: (id: string) => Promise<boolean>;
  onAddTemplate: (
    title: string,
    content: string,
  ) => Promise<string | boolean | null>;
  onUpdateTemplate: (
    id: string,
    title: string,
    content: string,
  ) => Promise<string | boolean>;
  isLoading: boolean;
}

export const TemplatePopover: React.FunctionComponent<TemplatePopoverProps> = ({
  onApplyTemplate,
  templates: templatesProp,
  onCopy,
  onDelete,
  onAddTemplate,
  onUpdateTemplate,
  isLoading,
}) => {
  const { t } = useLocale(i18n);
  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState('');

  const anchorElRef = useRef<HTMLButtonElement>(null);
  const mounted = usePromise();

  const { attemptLeave, LeaveGuardDialog } = useLeaveGuard({
    condition: () => isAdding || !!editingId,
    onLeave: () => {
      setIsAdding(false);
      setEditingId(null);
      setFilterValue('');
      setIsOpen(false);
    },
  });

  const handleToggle = () => {
    if (isOpen) {
      handleClose();
    } else {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    attemptLeave();
  };

  const handleClickAway = () => {
    handleClose();
  };

  const handleUpdateTemplate = async (
    id: string,
    title: string,
    content: string,
  ) => {
    const result = await mounted(onUpdateTemplate(id, title, content));
    if (typeof result === 'string') {
      return result;
    }
    if (!result) return;

    setEditingId(null);
    setExpandedId(null);
  };

  const handleEditTemplate = (id: string) => {
    setEditingId(id);
    setExpandedId(id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDeleteTemplate = async (id: string) => {
    const success = await mounted(onDelete(id));
    return success;
  };

  const handleApplyTemplate = async (content: string) => {
    const success = await mounted(onApplyTemplate(content));

    if (success) {
      handleClose();
    }
  };

  const handleCopyTemplate = (content: string) => {
    onCopy(content);
  };

  const handleTemplateClick = (templateId: string) => {
    setExpandedId(expandedId === templateId ? null : templateId);
  };

  const handleStartAdd = () => {
    setIsAdding(true);
    setFilterValue('');
  };

  const highlightWords = useMemo(
    () => filterValue.toLowerCase().split(' ').filter(Boolean),
    [filterValue],
  );

  const templates = useMemo(() => {
    return templatesProp.filter((template) => {
      const title = template.title.toLowerCase();
      const content = template.content.toLowerCase();

      return highlightWords.every(
        (search) => title.includes(search) || content.includes(search),
      );
    });
  }, [highlightWords, templatesProp]);

  return (
    <>
      <IconButton
        variant="icon"
        size="large"
        color="secondary"
        className="text-neutral-b2"
        ref={anchorElRef}
        TooltipProps={{
          title: t('useTemplate'),
        }}
        data-sign="templateButton"
        symbol={MasterTemplateMd}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
        onClick={handleToggle}
      />
      {isOpen && (
        <>
          <div
            data-sign="templatePopoverBackdrop"
            className="absolute top-0 left-0 size-full z-modal"
            onClick={handleClickAway}
          />
          <Popper
            placement="top"
            className="z-modal !w-full"
            anchorEl={anchorElRef.current}
            padding={16}
            autoUpdate={{
              ancestorScroll: false, // Updates when parent scrolls
              ancestorResize: false, // Updates when parent resizes
              elementResize: true, // 🔑 Key: Auto-detects when popper content size changes
              animationFrame: false, // Keep false for performance unless smooth animations needed
            }}
            style={{
              maxWidth: DEFAULT_WIDTH - 32,
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={t('useTemplate')}
              className="border border-neutral-b0-t20 overflow-hidden rounded-sui-sm shadow-md bg-neutral-base"
            >
              <div className="flex flex-col h-[350px]">
                {/* Header */}
                <div className="flex items-center justify-between px-3 py-1 border-b border-neutral-b4">
                  <span className="typography-subtitle text-neutral-b1 truncate flex-1">
                    {t('title')}
                  </span>
                  <i className="h-8" />
                  {/* Add Button */}
                  {!isAdding && (
                    <IconButton
                      variant="icon"
                      TooltipProps={{
                        title: t('addTemplate'),
                      }}
                      size="medium"
                      color="secondary"
                      symbol={PlusMd}
                      onClick={handleStartAdd}
                      data-sign="addTemplateButton"
                    />
                  )}
                </div>

                {/* Search bar */}
                {!isAdding && templatesProp.length > 0 && (
                  <div
                    className="border-b border-neutral-b4 flex gap-2 items-center typography-mainText text-neutral-b2"
                    data-sign="searchTemplate"
                  >
                    <label htmlFor="searchTemplate" className="pl-3">
                      <Icon size="small" symbol={SearchMd} />
                    </label>
                    <input
                      id="searchTemplate"
                      data-sign="searchTemplateInput"
                      className="w-full outline-none py-3 pr-3 text-neutral-b0 placeholder:text-neutral-b2 bg-transparent"
                      placeholder={t('searchTemplate')}
                      value={filterValue}
                      onChange={(e) => {
                        setFilterValue(e.target.value);
                      }}
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                  {isAdding && (
                    <AddTemplateForm
                      isLoading={isLoading}
                      onAddTemplate={onAddTemplate}
                      onAddingChange={setIsAdding}
                    />
                  )}
                  {/* Template List */}
                  {templatesProp.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full py-8 px-3 text-center">
                      <div className="typography-subtitle text-neutral-b0 mb-2">
                        {t('noTemplatesYet')}
                      </div>
                      <div className="typography-descriptor text-neutral-b2">
                        {t('createTemplatesHint')}
                      </div>
                    </div>
                  ) : templates.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full py-8 px-3 text-center">
                      <div className="typography-subtitle text-neutral-b0">
                        {t('noResults')}
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 overflow-hidden pb-2">
                      <div className="space-y-1 overflow-y-auto">
                        {templates.map((template) => {
                          const isExpanded = expandedId === template.id;
                          const isEditing = editingId === template.id;

                          return (
                            <TemplateItem
                              key={template.id}
                              template={template}
                              highlightWords={highlightWords}
                              isExpanded={isExpanded}
                              isEditing={isEditing}
                              onTemplateClick={handleTemplateClick}
                              onApplyTemplate={handleApplyTemplate}
                              onCopyTemplate={handleCopyTemplate}
                              onEditTemplate={handleEditTemplate}
                              onUpdateTemplate={handleUpdateTemplate}
                              onDeleteTemplate={handleDeleteTemplate}
                              onCancelEdit={handleCancelEdit}
                              isLoading={isLoading}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Popper>
        </>
      )}
      <LeaveGuardDialog />
    </>
  );
};
