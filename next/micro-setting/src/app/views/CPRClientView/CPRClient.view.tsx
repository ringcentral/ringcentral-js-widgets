import { trackEvent } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  BrowserLogger,
  Toast,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  action,
  delegate,
  injectable,
  optional,
  RcViewModule,
  state,
  useConnector,
} from '@ringcentral-integration/next-core';
import { FileInfoWithAction } from '@ringcentral-integration/next-widgets/components/MessageInput/FileAttacher';
import { useAsyncState } from '@ringcentral-integration/react-hooks';
import { fileToBase64 } from '@ringcentral-integration/utils';
import { AttachMd, DownloadMd, FileMd, Xsm } from '@ringcentral/spring-icon';
import {
  Button,
  CircularProgressIndicator,
  Icon,
  IconButton,
  Text,
  Textarea,
} from '@ringcentral/spring-ui';
import React from 'react';
import { combineLatest, firstValueFrom, from, timer } from 'rxjs';
import { useFileUpload } from 'use-file-upload';

import { CPRClient } from '../../services/CPRClient';
import type { FileMeta } from '../../services/CPRClient/CPRClient.interface';

import type { CPRClientViewOptions } from './CPRClient.view.interface';
import { t } from './i18n';

const AUTO_LOG_META: FileMeta = {
  id: 'auto-log_𖩕',
  name: 'applicationLogs.zip',
  size: 0,
  base64Url: '',
};

const MINIMUM_SUBMISSION_DELAY = 500;
const MAX_USER_ATTACHMENT_SIZE = 10 * 1024 * 1024; // 10MB limit for individual user attachments

@injectable({
  name: 'CPRClientView',
})
export class CPRClientView extends RcViewModule {
  @state
  details: string = '';

  @state
  attachments: FileMeta[] = [];

  @state
  isSubmitting: boolean = false;

  @state
  maxSizeInBytes: number = 120 * 1024 * 1024;

  constructor(
    protected _cPRClient: CPRClient,
    protected _toast: Toast,
    protected _browserLogger: BrowserLogger,
    @optional('CPRClientViewOptions')
    protected _cPRClientViewOptions?: CPRClientViewOptions,
  ) {
    super();
  }

  async downloadLogs() {
    await this._browserLogger.saveLog();
  }

  @action
  protected _setDetails(value: string) {
    this.details = value;
  }

  @action
  protected _setIsSubmitting(value: boolean) {
    this.isSubmitting = value;
  }

  @delegate('server')
  protected async setIsSubmitting(value: boolean) {
    this._setIsSubmitting(value);
  }

  @action
  protected _addAttachment(meta: FileMeta) {
    this.attachments.push(meta);
  }

  @action
  protected _setAttachments(value: FileMeta[]) {
    this.attachments = value;
  }

  @delegate('server')
  async resetForm() {
    this._setDetails('');
    this._setAttachments([]);
  }

  @delegate('server')
  async onDetailsValueChange(value: string) {
    this._setDetails(value);
  }

  sanitizeFilename(name: string) {
    return name
      .normalize('NFKD')
      .replace(/[^\p{L}\p{N}._\-\s]/gu, '_')
      .trim();
  }

  @action
  private _addAttachments(files: FileMeta[]) {
    files.forEach((file) => {
      const sanitizedFileName = this.sanitizeFilename(file.name);
      const duplicate = this.attachments.find(
        (a) => a.name === sanitizedFileName && a.size === file.size,
      );
      if (duplicate) {
        this._toast.info({ message: t('fileDuplicate') });
        return;
      }
      const current =
        this.attachments.reduce((s, a) => s + a.size, 0) + file.size;

      if (current > MAX_USER_ATTACHMENT_SIZE) {
        this._toast.danger({ message: t('attachmentSize') });
        return;
      }

      this._addAttachment(file);
    });
  }

  @delegate('server')
  async addAttachments(files: FileMeta[]) {
    this._addAttachments(files);
  }

  @delegate('server')
  async removeAttachment(id: string) {
    this._setAttachments(this.attachments.filter((x) => x.id !== id));
  }

  async submitReport() {
    if (!this.details.trim()) return;

    this.setIsSubmitting(true);

    const [result] = await firstValueFrom(
      combineLatest([
        from(this._cPRClient.sendCPR(this.details, this.attachments)),
        // submit report at least take 500ms, if not, wait that until 500ms
        timer(MINIMUM_SUBMISSION_DELAY),
      ]),
    );

    this.setIsSubmitting(false);

    if (result === null) {
      // when be null means that already show toast already, so check false only
      // do nothing
    } else if (result === false) {
      this._toast.danger({ message: t('submitFailure') });
    } else {
      this._toast.success({ message: t('submitSuccess') });
      this.resetForm();
    }

    return result;
  }

  component() {
    const { details, attachments, isSubmitting, downloading } = useConnector(
      () => ({
        details: this.details,
        attachments: this.attachments,
        isSubmitting: this.isSubmitting,
        downloading: this._browserLogger.downloading,
      }),
    );

    const [, selectFile] = useFileUpload();
    const showDownloadLogs =
      this._cPRClientViewOptions?.showDownloadLogs ?? true;
    const showUserAttachments =
      this._cPRClientViewOptions?.showUserAttachments ?? true;

    const [inputValue, setInputValue] = useAsyncState(details, (value) =>
      this.onDetailsValueChange(value),
    );

    return (
      <>
        <div>
          <Text
            className="typography-subtitle font-bold mb-2 text-neutral-b0"
            component="p"
          >
            {t('step2Title')}
          </Text>
          <Text
            data-sign="step2Desc"
            className="typography-mainText mb-4 text-neutral-b2"
            component="p"
          >
            {t('step2Description')}
          </Text>
          <div>
            <Textarea
              placeholder={t('DescriptionPlaceholder')}
              className="typography-mainText font-bold mb-4 text-neutral-b0"
              label={t('DescriptionLabel')}
              rows={3}
              fullWidth
              value={inputValue}
              onChange={({ target: { value } }) => setInputValue(value)}
              required
              disabled={isSubmitting}
            />
          </div>
          {showUserAttachments && (
            <Button
              className="typography-mainText mb-4"
              data-sign="attachFileBtn"
              variant="text"
              color="primary"
              size="small"
              startIcon={<Icon symbol={AttachMd}></Icon>}
              onClick={() => {
                selectFile({ accept: '*', multiple: true }, async (result) => {
                  if (Array.isArray(result)) {
                    const files = await Promise.all(
                      result.map(async (uploadFile) => {
                        const { name, size, file } = uploadFile;
                        const base64Url = await fileToBase64(file);
                        return {
                          id: crypto.randomUUID(),
                          name,
                          size,
                          base64Url,
                        };
                      }),
                    );

                    this.addAttachments(files);
                  }
                });
              }}
              disabled={isSubmitting}
            >
              {t('attachFile')}
            </Button>
          )}

          <div className="typography-mainText mb-4" data-sign="attachments">
            {showDownloadLogs && (
              <FileInfoWithAction
                key={AUTO_LOG_META.id}
                symbol={FileMd}
                fileName={AUTO_LOG_META.name}
                FileIconProps={{ className: 'mr-2 text-neutral-b1' }}
                action={
                  downloading ? (
                    <div className="flex items-center justify-center size-9">
                      <CircularProgressIndicator
                        variant="indeterminate"
                        size="small"
                        data-sign="downloading"
                      />
                    </div>
                  ) : (
                    <IconButton
                      symbol={DownloadMd}
                      data-sign="downloadButton"
                      disabled={isSubmitting}
                      variant="icon"
                      onClick={() => {
                        trackEvent('CPR_Logs_Downloaded', {});
                        this.downloadLogs();
                      }}
                      TooltipProps={{
                        title: t('downloadLogs'),
                        placement: 'top',
                      }}
                    />
                  )
                }
              />
            )}
            {showUserAttachments &&
              attachments.map((file) => (
                <FileInfoWithAction
                  key={file.id}
                  symbol={FileMd}
                  fileName={file.name}
                  fileSize={file.size}
                  FileIconProps={{ className: 'mr-2 text-neutral-b1' }}
                  action={
                    <IconButton
                      symbol={Xsm}
                      data-sign="removeBtn"
                      disabled={isSubmitting}
                      variant="icon"
                      onClick={() => {
                        this.removeAttachment(file.id);
                      }}
                    />
                  }
                />
              ))}
          </div>

          <div data-sign="submitButton">
            <Button
              className="typography-subtitle mb-4"
              data-sign="submitBtn"
              fullWidth
              onClick={() => {
                trackEvent('CPR_Submitted', {});
                this.submitReport();
              }}
              disabled={!details.trim() || isSubmitting || downloading}
            >
              {isSubmitting ? (
                <CircularProgressIndicator
                  variant="indeterminate"
                  size="small"
                />
              ) : (
                t('submit')
              )}
            </Button>
          </div>
        </div>
      </>
    );
  }
}
