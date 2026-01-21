import React, { useState } from 'react';
import { usePromise } from 'react-use';

import { TemplateForm } from './TemplateForm';

export interface AddTemplateFormProps {
  isLoading: boolean;
  onAddingChange: (isAdding: boolean) => void;
  onAddTemplate: (
    title: string,
    content: string,
  ) => Promise<string | boolean | null>;
}

export const AddTemplateForm: React.FunctionComponent<AddTemplateFormProps> = ({
  isLoading,
  onAddTemplate,
  onAddingChange,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const mounted = usePromise();

  const handleAddTemplate = async () => {
    if (newTitle.trim() && newContent.trim()) {
      const result = await mounted(
        onAddTemplate(newTitle.trim(), newContent.trim()),
      );
      if (typeof result === 'string') {
        setError(result);
        return;
      }
      if (!result) return;

      setNewTitle('');
      setNewContent('');
      onAddingChange(false);
    }
  };

  const handleCancelAdd = () => {
    onAddingChange(false);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className="m-2">
      <TemplateForm
        title={newTitle}
        content={newContent}
        onTitleChange={(value) => {
          setNewTitle(value);
          setError(null);
        }}
        onContentChange={setNewContent}
        onSave={handleAddTemplate}
        onCancel={handleCancelAdd}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};
