import { trackEvent } from '@ringcentral-integration/micro-auth/src/app/services';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { Toast } from '@ringcentral-integration/micro-core/src/app/services';
import {
  ModalView,
  useModalItemView,
} from '@ringcentral-integration/micro-core/src/app/views';
import modalI18n from '@ringcentral-integration/micro-core/src/app/views/ModalView/ModalItemView/ModalItemPanel/i18n';
import {
  delegate,
  injectable,
  optional,
  portal,
  RcViewModule,
  useConnector,
} from '@ringcentral-integration/next-core';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  type getSelectionPosition,
  setSelectionPosition,
} from '@ringcentral/spring-ui';
import writeText from 'copy-to-clipboard';
import React from 'react';

import { SmsTemplate } from '../../services';

import type {
  SmsTemplateViewOptions,
  SmsTemplateViewProps,
} from './SmsTemplate.view.interface';
import { TemplatePopover } from './TemplatePopover';
import i18n, { t } from './i18n';

type UpdateTemplateType = 'add' | 'replace';

@injectable({
  name: 'SmsTemplateView',
})
export class SmsTemplateView extends RcViewModule {
  @portal
  private deleteConfirmDialog = this._modalView.create<{
    id: string;
  }>({
    props: ({ id }) => ({
      'data-sign': 'deleteSmsTemplateConfirmDialog',
      header: t('deleteTemplateConfirm'),
      variant: 'confirm',
      confirmButtonText: t('delete'),
      confirmButtonProps: {
        color: 'danger',
      },
      onConfirm: async () => {
        const result = await this.smsTemplate.deleteTemplate(id);

        if (result) {
          trackEvent('Int_Text_useTemplate', {
            templateActions: 'Delete',
          });
        }
      },
    }),
  });

  @portal
  private replaceOrAddTemplateDialog = this._modalView.create({
    view: () => {
      const { t } = useLocale(i18n, modalI18n);

      const info = useModalItemView();
      const action = info.action!;

      return (
        <>
          <DialogTitle>{t('replaceOrAddTemplate')}</DialogTitle>
          <DialogContent>{t('replaceOrAddTemplateContent')}</DialogContent>
          <DialogActions>
            <Button
              data-sign="DialogCancelButton"
              color="secondary"
              variant="outlined"
              onClick={() => {
                action.close();
              }}
            >
              {t('cancel')}
            </Button>
            <Button
              data-sign="DialogAddButton"
              color="primary"
              variant="contained"
              onClick={() => {
                action.confirm({
                  type: 'add',
                });
              }}
            >
              {t('add')}
            </Button>
            <Button
              data-sign="DialogReplaceButton"
              color="primary"
              variant="contained"
              onClick={() => {
                action.confirm({
                  type: 'replace',
                });
              }}
            >
              {t('replace')}
            </Button>
          </DialogActions>
        </>
      );
    },
    props: () => ({
      'data-sign': 'replaceOrAddTemplateDialog',
      'aria-label': 'the dialog for replace or add template',
      header: null,
    }),
  });

  constructor(
    private _modalView: ModalView,
    private smsTemplate: SmsTemplate,
    private toast: Toast,
    @optional('SmsTemplateViewOptions')
    private _smsTemplateViewOptions?: SmsTemplateViewOptions,
  ) {
    super();
  }

  @delegate('server')
  async openDeleteConfirmDialog(id: string) {
    const { closed } = this._modalView.open(this.deleteConfirmDialog, {
      id,
    });
    const success = await closed;
    return !!success;
  }

  @delegate('server')
  async openReplaceOrAddTemplateDialog(id: string) {
    const { closed } = this._modalView.open(this.replaceOrAddTemplateDialog, {
      id,
    });
    const result = await closed;

    return result;
  }

  copyTemplate(content: string) {
    if (content && writeText(content)) {
      this.smsTemplate.uniqueManager.unique(() =>
        this.toast.success(t('copyTemplateSuccess')),
      );
      return true;
    }

    return false;
  }

  getFinalContent(
    type: UpdateTemplateType,
    textarea: HTMLTextAreaElement,
    content: string,
  ) {
    const currentValue = textarea.value;

    if (type === 'add') {
      const latestPos = JSON.parse(
        textarea.dataset.latestPos ?? 'null',
      ) as ReturnType<typeof getSelectionPosition> | null;

      if (latestPos) {
        const start = latestPos.position.start;
        const end = latestPos.position.end;
        const endContent = currentValue.slice(0, start) + content;
        const newContent =
          endContent + currentValue.slice(end, currentValue.length);
        return { content: newContent, position: endContent.length };
      }
    }

    return { content };
  }

  async handleApplyTemplate(
    targetInputRef: React.RefObject<HTMLTextAreaElement>,
    content: string,
  ) {
    const textarea = targetInputRef.current;
    if (!textarea) return false;

    const currentValue = textarea.value;
    const doesShowConfirm =
      currentValue.length > 0 && currentValue.trim() !== '';
    const result = doesShowConfirm
      ? await this.openReplaceOrAddTemplateDialog(content)
      : { type: 'replace' };

    if (!result || typeof result !== 'object') return false;

    const type: UpdateTemplateType = result.type;
    const info = this.getFinalContent(type, textarea, content);
    const { content: finalContent, position } = info;

    // Limit to 1000 characters
    const truncatedValue = finalContent.slice(0, 1000);

    // in mui, that is not able to trigger the change event, so we need to dispatch a custom event and listen it in the MessageInput component
    textarea.dispatchEvent(
      new CustomEvent('change-programmatically', {
        bubbles: false,
        detail: truncatedValue,
      }),
    );

    const newPosition = position ?? truncatedValue.length;

    const setNewPosition = () => {
      const textarea = targetInputRef.current;
      if (!textarea) return;
      setSelectionPosition(textarea, {
        start: newPosition,
        end: newPosition,
        scrollIntoView: true,
      });
    };

    if (doesShowConfirm) {
      setTimeout(setNewPosition, 195);
    } else {
      requestAnimationFrame(setNewPosition);
    }

    trackEvent('Int_Text_useTemplate', {
      templateActions: 'Apply',
    });

    return true;
  }

  component({ targetInputRef }: SmsTemplateViewProps) {
    const { templates, isLoading } = useConnector(() => ({
      templates: this.smsTemplate.templates,
      isLoading: this.smsTemplate.isLoading,
    }));

    const handleCopyTemplate = (content: string) => {
      const result = this.copyTemplate(content);

      if (result) {
        trackEvent('Int_Text_useTemplate', {
          templateActions: 'Copy',
        });
      }

      return result;
    };

    const handleDeleteTemplate = (id: string) => {
      return this.openDeleteConfirmDialog(id);
    };

    const handleAddTemplate = async (title: string, content: string) => {
      const result = await this.smsTemplate.createTemplate({
        title,
        content,
      });

      // the result also have the error message, so we need to check if it is true
      if (result === true) {
        trackEvent('Int_Text_useTemplate', {
          templateActions: 'Add',
        });
      }

      return result;
    };

    const handleUpdateTemplate = async (
      id: string,
      title: string,
      content: string,
    ) => {
      const result = await this.smsTemplate.updateTemplate({
        id,
        title,
        content,
      });

      // the result also have the error message, so we need to check if it is true
      if (result === true) {
        trackEvent('Int_Text_useTemplate', {
          templateActions: 'Edit',
        });
      }

      return result;
    };

    return (
      <TemplatePopover
        onApplyTemplate={(content) =>
          this.handleApplyTemplate(targetInputRef, content)
        }
        templates={templates}
        onCopy={handleCopyTemplate}
        onDelete={handleDeleteTemplate}
        onAddTemplate={handleAddTemplate}
        onUpdateTemplate={handleUpdateTemplate}
        isLoading={isLoading}
      />
    );
  }
}
