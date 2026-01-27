import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import {
  AccountInfo,
  RegionSettings,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { ContactSearchView } from '@ringcentral-integration/micro-contacts/src/app/views/ContactSearchView';
import { BlockPlugin } from '@ringcentral-integration/micro-core/src/app/plugins';
import {
  computed,
  injectable,
  RcViewModule,
  RouterPlugin,
  UIFunctions,
  UIProps,
  useConnector,
} from '@ringcentral-integration/next-core';
import React, { useRef } from 'react';

import { FaxSender, FileItem, Recipient } from '../../services';
import {
  FAX_ATTACHMENTS_ACCEPT,
  FAX_CONTENT_LIMIT,
  FAX_COVER_NONE_VALUE,
} from '../../services/Fax/constant';

import type { FaxSendPanelProps } from './FaxSend.view.interface';
import { FaxSendPanel } from './FaxSendPanel/FaxSendPanel';

@injectable({
  name: 'FaxSendView',
})
export class FaxSendView extends RcViewModule {
  constructor(
    private _block: BlockPlugin,
    private _faxSender: FaxSender,
    private _router: RouterPlugin,
    private _regionSettings: RegionSettings,
    private _accountInfo: AccountInfo,
    private _contactSearchView: ContactSearchView,
  ) {
    super();
  }

  get hasCoverPageSelected() {
    return this._faxSender.coverIndex !== FAX_COVER_NONE_VALUE;
  }

  async sendNow(sendTime?: string) {
    if (!this.canSendFaxNow) {
      this.logger.error('can not send fax now');
      return;
    }

    await this._block.next(async () => {
      await this._faxSender.send({
        sendTime,
        to: this._faxSender.toNumbers.map((it) => ({
          phoneNumber: it.phoneNumber,
          name: it.freeSolo ? '' : it.name,
        })),
        coverIndex: this._faxSender.coverIndex,
        coverPageText: this._faxSender.coverNotes,
        attachments: this._faxSender.attachments.map((it) => it.file),
      });
      this._faxSender.clean();
      this._router.push('/fax');
    });
  }

  @computed
  get allRecipientsValid() {
    return (
      this._faxSender.toNumbers.length > 0 &&
      !this._faxSender.toNumbers.some((it) => it.error)
    );
  }

  @computed
  get canSendFaxNow() {
    const hasPayloads =
      !!this._faxSender.attachments.length || this.hasCoverPageSelected;

    const hasRecipients = this.allRecipientsValid;

    return hasPayloads && hasRecipients;
  }

  @computed
  get currentFilesSize() {
    if (this._faxSender.attachmentsTotalSize === 0) {
      return undefined;
    }
    return this._faxSender.attachmentsTotalSize;
  }

  getUIProps(): UIProps<FaxSendPanelProps> {
    return {
      acceptFileTypes: FAX_ATTACHMENTS_ACCEPT,
      faxInfo: this._faxSender.faxEditingInfo,
      typingToNumber: this._faxSender.typingToNumber,
      showCoverTextInput: this.hasCoverPageSelected,
      maxAllowedAttachmentSize:
        FAX_CONTENT_LIMIT.MAX_ATTACHMENT_STORAGE_SIZE_IN_MB,
      covers: this._faxSender.allCovers,
      canSendNow: this.canSendFaxNow,
      senderNumber: this._faxSender.senderNumber,
      senderNumbers: this._faxSender.senderNumbersList,
      maxRecipients: this._faxSender.maxRecipients,
      currentFilesSize: this.currentFilesSize,
      showSpinner: !this._faxSender.ready,
    };
  }

  getUIFunctions(): UIFunctions<FaxSendPanelProps> {
    return {
      formatPhone: (phoneNumber: string) =>
        formatNumber({
          phoneNumber,
          areaCode: this._regionSettings.areaCode,
          countryCode: this._regionSettings.countryCode,
          maxExtensionLength: this._accountInfo.maxExtensionNumberLength,
        }),
      onCoverIndexChange: (coverIdx) =>
        this._faxSender.updateCoverIndex(coverIdx),
      onCoverTextChange: (text) => this._faxSender.updateCoverNotes(text),
      onUploadFiles: (files: FileItem[]) =>
        this._faxSender.addAttachments(files),
      onRemoveFile: (id) => this._faxSender.removeAttachment(id),
      addToNumbers: (recipient) => this._faxSender.addToNumbers(recipient),
      removeToNumber: (recipient: Recipient) =>
        this._faxSender.removeToNumber(recipient),
      updateSenderNumber: async ({ phoneNumber }) => {
        const cachedPhoneNumber = this._faxSender.senderNumber;
        const senderNumber = this._faxSender.senderNumbersList.find(
          (info) => info.phoneNumber === phoneNumber,
        );
        if (senderNumber?.id) {
          this._faxSender.updateSenderNumber(phoneNumber);
          const success = await this._faxSender.setFaxCallerId(
            `${senderNumber.id}`,
          );
          if (!success) {
            // if failed, rollback to last phoneNumber
            this._faxSender.updateSenderNumber(cachedPhoneNumber);
          }
        }
      },
      updateTypingToNumber: (toNumber: string) => {
        this._faxSender.updateTypingToNumber(toNumber);
      },
      cleanTypingToNumber: () => this._faxSender.cleanTypingToNumber(),
      onCancel: () => {
        this._router.push('/fax');
      },
      onSendNow: () => {
        this.sendNow();
      },
    };
  }

  component() {
    const { current: uiFunctions } = useRef(this.getUIFunctions());
    const props = useConnector(() => this.getUIProps());
    return (
      <FaxSendPanel
        {...props}
        ContactSearch={this._contactSearchView.component}
        {...uiFunctions}
      />
    );
  }
}
