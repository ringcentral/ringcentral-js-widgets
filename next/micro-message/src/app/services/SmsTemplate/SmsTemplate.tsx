import {
  DataFetcher,
  DataFetcherConsumer,
  DataSource,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  Toast,
  ToastManager,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  Auth,
  Client,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  action,
  computed,
  delegate,
  injectable,
  optional,
  PortManager,
  RouterPlugin,
  state,
  takeUntilAppDestroy,
} from '@ringcentral-integration/next-core';
import type { ApiError } from '@ringcentral/sdk';
import { tap } from 'rxjs';

import type {
  CreateServerSmsTemplateRequest,
  CreateSmsTemplateParams,
  ServerSmsTemplateItem,
  ServerSmsTemplatesResponse,
  SmsTemplateError,
  SmsTemplateItem,
  SmsTemplateOptions,
  UpdateServerSmsTemplateRequest,
  UpdateSmsTemplateParams,
} from './SmsTemplate.interface';
import { t } from './i18n';

const ONE_HOUR = 1000 * 60 * 60;

@injectable({
  name: 'SmsTemplate',
})
export class SmsTemplate extends DataFetcherConsumer<ServerSmsTemplatesResponse> {
  @state
  isLoading = false;

  @action
  private _setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  uniqueManager = this._toastManager.createUniqueManager();

  private haveEverViewedUseTemplateRelatedPaths = false;

  constructor(
    private _auth: Auth,
    private _toast: Toast,
    private _client: Client,
    private _router: RouterPlugin,
    private _toastManager: ToastManager,
    private _portManager: PortManager,
    protected override _dataFetcher: DataFetcher,
    @optional('SmsTemplateOptions')
    private _smsTemplateOptions?: SmsTemplateOptions,
  ) {
    super(_dataFetcher);

    this._source = new DataSource({
      ...this._smsTemplateOptions,
      key: 'smsTemplate',
      fetchFunction: async () => {
        const response = await this._client.service
          .platform()
          .get('/restapi/v1.0/account/~/extension/~/message-store-templates');
        return response.json() as ServerSmsTemplatesResponse;
      },
      readyCheckFunction: () => {
        // when become logged out, clear the flag again
        if (
          !this.haveEverViewedUseTemplateRelatedPaths &&
          // check if the current path is every view SMS related path
          (this._router.currentPath.startsWith('/conversations') ||
            this._router.currentPath.startsWith('/composeText'))
        ) {
          this.haveEverViewedUseTemplateRelatedPaths = true;
        }

        return (
          this.haveEverViewedUseTemplateRelatedPaths && this._auth.loggedIn
        );
      },
      polling: true,
      pollingInterval: ONE_HOUR,
      cleanOnReset: true,
    });
    this._dataFetcher.register(this._source);

    const listener = () => {
      this._auth.afterLogout$
        .pipe(
          tap(() => {
            this.haveEverViewedUseTemplateRelatedPaths = false;
          }),
          takeUntilAppDestroy,
        )
        .subscribe();
    };

    if (this._portManager.shared) {
      this._portManager.onServer(() => {
        listener();
      });
    } else {
      listener();
    }
  }

  @computed
  get serverData() {
    return this.data ?? { records: [] };
  }

  @computed
  get templates(): SmsTemplateItem[] {
    return (
      this.serverData.records
        .filter((template) => template.scope === 'Personal')
        .map((template) => this._transformServerTemplate(template))
        // the server data is not sorted by id, so we need to sort it by id
        .sort((a, b) => -a.id.localeCompare(b.id))
    );
  }

  /**
   * Transform server template to local format
   */
  private _transformServerTemplate(
    serverTemplate: ServerSmsTemplateItem,
  ): SmsTemplateItem {
    return {
      id: serverTemplate.id,
      title: serverTemplate.displayName,
      content: serverTemplate.body.text,
    };
  }

  /**
   * Transform local template to server format for creation
   */
  private _transformToServerRequest(
    params: CreateSmsTemplateParams,
  ): CreateServerSmsTemplateRequest {
    return {
      displayName: params.title,
      body: {
        text: params.content,
      },
    };
  }

  /**
   * Transform local template update to server format
   */
  private _transformToServerUpdateRequest(
    params: UpdateSmsTemplateParams,
  ): UpdateServerSmsTemplateRequest {
    const request: UpdateServerSmsTemplateRequest = {};

    if (params.title !== undefined) {
      request.displayName = params.title;
    }

    if (params.content !== undefined) {
      request.body = {
        text: params.content,
      };
    }

    return request;
  }

  /**
   * Create a new template on server
   */
  @delegate('server')
  async createTemplate(params: CreateSmsTemplateParams) {
    this._setLoading(true);
    try {
      const requestData = this._transformToServerRequest(params);
      await this._client.service
        .platform()
        .post(
          '/restapi/v1.0/account/~/extension/~/message-store-templates',
          requestData,
        );

      // Refresh data after successful creation
      await this.refreshTemplates();

      this.uniqueManager.unique(() =>
        this._toast.success(t('createTemplateSuccess')),
      );
      return true;
    } catch (error) {
      const result = await this._handleError(error);
      if (result) {
        return typeof result === 'string' ? result : null;
      }

      this.logger.error('Failed to create SMS template:', error);
      this.uniqueManager.unique(() =>
        this._toast.danger(t('createTemplateFailed')),
      );
      return null;
    } finally {
      this._setLoading(false);
    }
  }

  /**
   * Update template on server
   */
  @delegate('server')
  async updateTemplate(params: UpdateSmsTemplateParams) {
    this._setLoading(true);
    try {
      const requestData = this._transformToServerUpdateRequest(params);
      await this._client.service
        .platform()
        .put(
          `/restapi/v1.0/account/~/extension/~/message-store-templates/${params.id}`,
          requestData,
        );

      // Refresh data after successful update
      await this.refreshTemplates();

      this.uniqueManager.unique(() =>
        this._toast.success(t('updateTemplateSuccess')),
      );
      return true;
    } catch (error) {
      const result = await this._handleError(error);
      if (result) {
        return typeof result === 'string' ? result : false;
      }

      this.logger.error('Failed to update SMS template:', error);
      this.uniqueManager.unique(() =>
        this._toast.danger(t('updateTemplateFailed')),
      );
      return false;
    } finally {
      this._setLoading(false);
    }
  }

  /**
   * Delete template from server
   */
  @delegate('server')
  async deleteTemplate(id: string): Promise<boolean> {
    this._setLoading(true);
    try {
      await this._client.service
        .platform()
        .delete(
          `/restapi/v1.0/account/~/extension/~/message-store-templates/${id}`,
        );

      // Refresh data after successful deletion
      await this.refreshTemplates();

      this.uniqueManager.unique(() =>
        this._toast.success(t('deleteTemplateSuccess')),
      );
      return true;
    } catch (error) {
      this.logger.error('Failed to delete SMS template:', error);
      this.uniqueManager.unique(() =>
        this._toast.danger(t('deleteTemplateFailed')),
      );
      return false;
    } finally {
      this._setLoading(false);
    }
  }

  /**
   *
   * @returns does already handle the error
   */
  private async _handleError(error: unknown) {
    try {
      const errorData = (await (error as ApiError).response
        ?.clone()
        .json()) as SmsTemplateError;
      const { errorCode, limit, resourceName, parameterName } = errorData;

      if (errorCode === 'CMN-423' && resourceName === 'Templates' && limit) {
        this.logger.error('Failed to create SMS template:', errorData);
        this.uniqueManager.unique(() =>
          this._toast.danger(
            t('createTemplateFailedByLimit', { limit: limit || 25 }),
          ),
        );

        return true;
      }

      if (errorCode === 'CMN-152' && parameterName === 'displayName') {
        this.logger.error('Failed to create SMS template:', errorData);

        return t('sameTemplateName');
      }
    } catch (error) {
      //
    }

    return false;
  }

  /**
   * Get template by ID
   */
  getTemplate(id: string): SmsTemplateItem | undefined {
    return this.templates.find((template) => template.id === id);
  }

  /**
   * Refresh templates from server
   */
  async refreshTemplates(): Promise<void> {
    await this.fetchData();
  }
}
