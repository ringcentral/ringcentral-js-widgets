/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  ActionMenuList,
  TextWithHighlight,
} from '@ringcentral-integration/next-widgets/components';
import { CopyMd, EditMd, EnterMd, TrashMd } from '@ringcentral/spring-icon';
import { IconButton, type IconButtonProps } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import { TemplateForm } from './TemplateForm';
import i18n from './i18n';

export interface TemplateItemProps {
  template: {
    id: string;
    title: string;
    content: string;
  };
  highlightWords: string[];
  isExpanded: boolean;
  isEditing: boolean;
  onTemplateClick: (templateId: string) => void;
  onApplyTemplate: (content: string) => Promise<void>;
  onCopyTemplate: (content: string) => void;
  onEditTemplate: (id: string) => void;
  onUpdateTemplate: (
    id: string,
    title: string,
    content: string,
  ) => Promise<string | undefined>;
  onDeleteTemplate: (id: string) => Promise<boolean>;
  onCancelEdit: () => void;
  isLoading: boolean;
}

const actionButtonProps: IconButtonProps = {
  size: 'small',
  variant: 'icon',
  color: 'secondary',
};
const CUSTOM_HIGH_LIGHT_STYLE = {
  highlight: 'text-neutral-b0 font-bold bg-warning-f bg-opacity-40',
};

export const TemplateItem: React.FunctionComponent<TemplateItemProps> = ({
  template,
  highlightWords,
  isExpanded,
  isEditing,
  onTemplateClick,
  onApplyTemplate,
  onCopyTemplate,
  onEditTemplate,
  onUpdateTemplate,
  onDeleteTemplate,
  onCancelEdit,
  isLoading,
}) => {
  const { t } = useLocale(i18n);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  // Initialize edit values when editing starts
  useEffect(() => {
    if (isEditing) {
      setEditTitle(template.title);
      setEditContent(template.content);
    }
  }, [isEditing, template.title, template.content]);

  const handleSave = async () => {
    const title = editTitle.trim();
    const content = editContent.trim();
    if (title && content) {
      const result = await onUpdateTemplate(template.id, title, content);
      if (typeof result === 'string') {
        setError(result);
      }
    }
  };

  const handleCancel = () => {
    setEditTitle('');
    setEditContent('');
    onCancelEdit();
  };

  return (
    <div
      key={template.id}
      className={clsx((isExpanded || isEditing) && 'm-2')}
      data-sign="templateItem"
    >
      {isEditing ? (
        // Inline Edit Form
        <TemplateForm
          title={editTitle}
          content={editContent}
          onTitleChange={(value) => {
            setEditTitle(value);
            setError(null);
          }}
          onContentChange={setEditContent}
          onSave={handleSave}
          onCancel={handleCancel}
          isLoading={isLoading}
          error={error}
        />
      ) : (
        // Regular Template Display
        <div
          role="button"
          tabIndex={0}
          className={clsx(
            'p-3 hover:bg-neutral-b5 cursor-pointer w-full text-left',
            isExpanded && 'border border-neutral-b4 rounded',
          )}
          onClick={(e) => {
            if (e.currentTarget.contains(e.target as Node)) {
              onTemplateClick(template.id);
            }
          }}
          onKeyDown={(e) => {
            const target = e.target as HTMLElement;
            if (
              e.currentTarget.contains(target) &&
              target.dataset?.['sign'] !== 'applyTemplateButton' &&
              (e.key === 'Enter' || e.key === ' ')
            ) {
              e.preventDefault();
              e.stopPropagation();
              onTemplateClick(template.id);
            }
          }}
        >
          <div className="flex justify-between items-center overflow-hidden">
            <div className="flex-1 min-w-0">
              <div
                className={clsx(
                  'flex justify-between ',
                  isExpanded
                    ? 'border-b border-neutral-b4 pb-1 mb-2 items-start'
                    : 'items-center',
                )}
              >
                <div
                  className={clsx(
                    'typography-subtitle text-neutral-b0 truncate mb-1 break-words flex-auto',
                    isExpanded ? 'overflow-hidden text-wrap' : 'truncate',
                  )}
                  data-sign="templateTitle"
                >
                  {highlightWords ? (
                    <TextWithHighlight
                      text={template.title}
                      highLightText={highlightWords}
                      classes={CUSTOM_HIGH_LIGHT_STYLE}
                    />
                  ) : (
                    template.title
                  )}
                </div>

                {isExpanded && (
                  <div
                    className="flex gap-1 items-center"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <ActionMenuList
                      variant="plain"
                      displayCount={3}
                      propsMap={{
                        all: actionButtonProps,
                      }}
                      moreButtonProps={actionButtonProps}
                      buttons={[
                        {
                          actionType: 'apply',
                          label: t('apply'),
                          symbol: EnterMd,
                          onClick: () => onApplyTemplate(template.content),
                        },
                        {
                          actionType: 'copy',
                          label: t('copy'),
                          symbol: CopyMd,
                          onClick: () => onCopyTemplate(template.content),
                        },
                        {
                          actionType: 'edit',
                          label: t('edit'),
                          symbol: EditMd,
                          onClick: () => onEditTemplate(template.id),
                        },
                        {
                          actionType: 'delete',
                          label: t('delete'),
                          symbol: TrashMd,
                          onClick: () => onDeleteTemplate(template.id),
                        },
                      ]}
                    />
                  </div>
                )}
              </div>
              <div
                className={clsx(
                  'typography-descriptor text-neutral-b2 whitespace-pre-line break-words',
                  !isExpanded && 'line-clamp-2',
                )}
                data-sign="templateContent"
              >
                {highlightWords ? (
                  <TextWithHighlight
                    text={template.content}
                    highLightText={highlightWords}
                    classes={CUSTOM_HIGH_LIGHT_STYLE}
                  />
                ) : (
                  template.content
                )}
              </div>
            </div>
            {!isExpanded && (
              <IconButton
                size="small"
                variant="icon"
                color="secondary"
                symbol={EnterMd}
                TooltipProps={{
                  title: t('apply'),
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onApplyTemplate(template.content);
                }}
                data-sign="applyTemplateButton"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
