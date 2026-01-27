import {
  AppFooterNav,
  AppHeaderNav,
} from '@ringcentral-integration/micro-core/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  FromField,
  PageHeader,
  SpringSpinnerOverlay as SpinnerOverlay,
} from '@ringcentral-integration/next-widgets/components';
import {
  useFileSize,
  AttachButton,
  AttachmentList,
} from '@ringcentral-integration/next-widgets/components/MessageInput/FileAttacher';
import { fileToBase64 } from '@ringcentral-integration/utils';
import { LinkMd } from '@ringcentral/spring-icon';
import { Textarea, Text, Divider, Button, Icon } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { FC, useState } from 'react';
import { v4 as uuid } from 'uuid';

import type { Recipient } from '../../../services';
import { getMimeTypeByFile } from '../../../services/Fax/utils/getMimeType';
import { FaxSendPanelProps } from '../FaxSend.view.interface';

import { FaxCoverPageSelect } from './FaxCoverPageSelect';
import i18n from './i18n';

export const FaxSendPanel: FC<FaxSendPanelProps> = ({
  acceptFileTypes,
  faxInfo,
  covers,
  canSendNow,
  maxAllowedAttachmentSize,
  showCoverTextInput,
  typingToNumber,
  senderNumber,
  senderNumbers,
  maxRecipients,
  currentFilesSize,
  updateSenderNumber,
  cleanTypingToNumber,
  addToNumbers,
  removeToNumber,
  updateTypingToNumber,
  onCoverTextChange,
  onCoverIndexChange,
  onUploadFiles,
  onRemoveFile,
  onSendNow,
  onCancel,
  formatPhone,
  showSpinner,
  ContactSearch: ToContactSearch,
}) => {
  const [contactSearchExpanded, setContactSearchExpanded] = useState(false);
  const maxLength = 1024;

  const addToRecipients = async (receiver: Recipient[]) => {
    const isAdded = await addToNumbers(receiver);

    if (isAdded) {
      cleanTypingToNumber();
    }
  };
  const removeFromRecipients = (phoneNumber: string) => {
    removeToNumber({ phoneNumber });
  };
  const { t } = useLocale(i18n);
  const fileSize = useFileSize(currentFilesSize);

  const title = t('createNewFax');
  return (
    <>
      <AppHeaderNav override>
        <PageHeader onBackClick={onCancel!}>
          <span className="sui-text sui-text-root truncate" title={title}>
            {title}
          </span>
        </PageHeader>
      </AppHeaderNav>
      <SpinnerOverlay loading={!!showSpinner}>
        <div className="flex flex-col w-full h-full px-4 gap-4 overflow-auto">
          <FromField
            fromNumber={senderNumber}
            fromPlaceholder={t('from')}
            fromNumbers={senderNumbers as any}
            onChange={(value) => {
              updateSenderNumber(value);
            }}
            hidden={!(senderNumbers.length > 0)}
            showAnonymous={false}
          />
          {/* @ts-ignore */}
          <ToContactSearch
            filterCallQueueExtension
            excludeCompanyExtension
            defaultTab="thirdParty"
            source="fax"
            open={contactSearchExpanded}
            inputValue={typingToNumber}
            toNumbers={faxInfo?.recipients}
            onSelect={addToRecipients}
            maxRecipients={maxRecipients}
            formatPhone={formatPhone}
            onInputValueChange={updateTypingToNumber}
            onRemove={removeFromRecipients}
            placeholder={t('toPlaceholder')}
            onExpanded={setContactSearchExpanded}
            autoFocusInput={false}
          />
          <div
            className={clsx(
              'flex flex-auto flex-col gap-2',
              contactSearchExpanded && 'hidden',
            )}
          >
            <FaxCoverPageSelect
              selectedCoverId={faxInfo?.coverIndex}
              covers={covers}
              label={t('coverPage')}
              onSelectChange={onCoverIndexChange}
            />
            {showCoverTextInput ? (
              <Textarea
                fullWidth
                minRows={4}
                clearBtn={!!faxInfo?.coverNotes?.length}
                value={faxInfo?.coverNotes}
                label={t('coverPageNote')}
                onChange={({ target: { value } }) => {
                  onCoverTextChange?.(value?.substring(0, maxLength));
                }}
                inputProps={{
                  maxLength,
                  'data-sign': 'fax-cover-page-note',
                }}
              />
            ) : null}
            <div className={clsx('flex items-center gap-2')}>
              <AttachButton
                multiple
                type="button"
                size="medium"
                startIcon={<Icon symbol={LinkMd} />}
                acceptTypes={acceptFileTypes}
                label={t('attach')}
                title={t('attachFiles')}
                onUpload={async (data) => {
                  if (data?.length) {
                    const files = await Promise.all(
                      data.map(async (file) => {
                        const id = `fax-attachment-${uuid()}`;
                        const formattedType = getMimeTypeByFile(file);
                        const { name, size } = file;
                        const newFile = new File([file], file.name, {
                          type: formattedType,
                        });
                        const base64Url = await fileToBase64(file);
                        return {
                          id,
                          name,
                          size,
                          file: newFile,
                          type: formattedType,
                          base64Url,
                        };
                      }),
                    );
                    onUploadFiles?.(files);
                  }
                }}
              />
              <Text
                className="text-xs text-neutral-b2"
                data-sign="attachments-summary"
              >
                {t('attachmentDescription', {
                  maxAllowedSize: maxAllowedAttachmentSize,
                })}
                {currentFilesSize && (
                  <>
                    <span>{' - '}</span>
                    <span className="text-primary-b">{fileSize}</span>
                  </>
                )}
              </Text>
            </div>
            {faxInfo.attachments.length > 0 && (
              <div
                className={clsx(
                  'mt-4 max-h-[125px] overflow-y-auto overflow-x-hidden',
                )}
              >
                <AttachmentList
                  files={faxInfo.attachments}
                  onRemoveAttachment={({ id }) => {
                    onRemoveFile?.(id);
                  }}
                  data-sign="faxAttachmentsList"
                />
              </div>
            )}
          </div>
        </div>
        <div>
          <Divider />
          <div className="px-4 py-2 flex justify-between items-center">
            <Button variant="text" size="large" onClick={onCancel}>
              {t('cancel')}
            </Button>
            <Button
              variant="contained"
              size="large"
              disabled={!canSendNow}
              onClick={onSendNow}
            >
              {t('sendNow')}
            </Button>
          </div>
        </div>
      </SpinnerOverlay>
      <AppFooterNav />
    </>
  );
};
