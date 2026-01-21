import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { Button, Textarea, TextField } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';

import i18n from './i18n';

export interface TemplateFormProps {
  title: string;
  content: string;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onSave: () => void;
  onCancel: () => void;
  className?: string;
  isLoading: boolean;
  error: string | null;
}

export const TemplateForm: React.FunctionComponent<TemplateFormProps> = ({
  title,
  content,
  onTitleChange,
  onContentChange,
  onSave,
  onCancel,
  className,
  isLoading,
  error,
}) => {
  const { t } = useLocale(i18n);

  const initDataRef = useRef<{ title: string; content: string }>({
    title,
    content,
  });

  const isDisabled = !title || !content;
  const initData = initDataRef.current;
  const isChanged = initData.title !== title || initData.content !== content;

  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  // when that display, scroll to the form for display the form
  useEffect(() => {
    if (scrollAnchorRef.current) {
      scrollAnchorRef.current.scrollIntoView({
        block: 'center',
      });
    }
  }, []);

  return (
    <div
      ref={scrollAnchorRef}
      data-sign="editTemplateForm"
      className={clsx(
        'px-2 pb-2 border border-neutral-b4 relative rounded',
        className,
      )}
    >
      <TextField
        label={t('fieldTitle')}
        value={title}
        size="medium"
        fullWidth
        inputProps={{
          maxLength: 250,
          'data-sign': 'editTemplateTitleInput',
        }}
        showCharacterCount
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder={t('fieldTitlePlaceholder')}
        clearBtn={false}
        error={!!error}
        helperText={error}
      />
      <Textarea
        label={t('fieldContent')}
        value={content}
        size="medium"
        fullWidth
        inputProps={{
          maxLength: 1000,
          'data-sign': 'editTemplateContentInput',
        }}
        showCharacterCount
        onChange={(e) => onContentChange(e.target.value)}
        minRows={2}
        maxRows={10}
        placeholder={t('fieldContentPlaceholder')}
        clearBtn={false}
      />
      <div className="flex gap-2 mt-3 justify-end">
        <Button
          variant="outlined"
          size="small"
          onClick={onCancel}
          data-sign="cancelEditTemplateButton"
          disabled={isLoading}
        >
          {t('cancel')}
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={onSave}
          disabled={isDisabled || isLoading || !isChanged}
          data-sign="saveEditTemplateButton"
          loading={isLoading}
        >
          {t('save')}
        </Button>
      </div>
    </div>
  );
};
