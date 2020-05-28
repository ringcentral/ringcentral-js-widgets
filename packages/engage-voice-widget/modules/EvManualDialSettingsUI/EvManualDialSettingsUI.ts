import { RcUIModuleV2, createSelector } from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';

import {
  EvManualDialSettingsUIFunctions,
  EvManualDialSettingsUIProps,
} from '../../interfaces/EvManualDialSettingsUI.interface';
import {
  EvAvailableCountry,
  EvAvailableQueue,
  EvCallerId,
} from '../../lib/EvClient';
import { EvCall } from '../EvCall';
import {
  DepsModules,
  EvManualDialSettingsRenderProps,
  ManualDialSettingsUI,
} from './EvManualDialSettingsUI.interface';
import i18n from './i18n';

@Module({
  name: 'EvManualDialSettingsUI',
  deps: ['Locale', 'RouterInteraction', 'EvCall', 'EvAuth'],
})
class EvManualDialSettingsUI extends RcUIModuleV2<DepsModules>
  implements ManualDialSettingsUI {
  private _renderProps: EvManualDialSettingsRenderProps;

  constructor({ locale, routerInteraction, evCall, evAuth }) {
    super({
      modules: {
        locale,
        routerInteraction,
        evCall,
        evAuth,
      },
    });
  }

  getCallerId = createSelector(
    () => this._modules.evCall.formGroup.dialoutCallerId,
    () => this._modules.evAuth.getCallerIds(),
    (callerId, callerIds) =>
      callerIds.find(({ number }) => number === callerId),
  );

  getQueue = createSelector(
    () => this._modules.evCall.formGroup.dialoutQueueId,
    () => this._modules.evAuth.availableQueues,
    (queueId, availableQueues) =>
      availableQueues.find((queue) => queue.gateId === queueId),
  );

  getCountry = createSelector(
    () => this._modules.evCall.formGroup.dialoutCountryId,
    () => this._modules.evAuth.getAvailableCountries(),
    (countryId, countries) =>
      countries.find((country) => country.countryId === countryId),
  );

  getSettingFields = createSelector(
    () => this.getCallerId(),
    () => this._modules.evAuth.getCallerIds(),
    () => this._modules.evAuth.availableQueues,
    () => this.getQueue(),
    () => this.getCountry(),
    () => this._modules.evAuth.getAvailableCountries(),
    () => this._modules.evCall.ringTime,
    () => this._modules.evCall.ringTimeLimit,
    () => this._modules.evAuth.agentPermissions.allowManualOutboundGates,
    () => this._modules.evAuth.agentPermissions.allowManualIntlCalls,
    (
      callerId,
      callerIds,
      availableQueues,
      queue,
      country,
      availableCountries,
      ringTime,
      ringTimeLimit,
      allowManualOutboundGates,
      allowManualIntlCalls,
    ) => {
      return [
        {
          dataSign: 'callerId',
          value: callerId.number,
          onChange: (dialoutCallerId) => {
            if (this._validate(dialoutCallerId)) {
              this._modules.evCall.setFormGroup({
                dialoutCallerId,
              });
            }
          },
          select: {
            label: i18n.getString(
              'callerId',
              this._modules.locale.currentLocale,
            ),
            required: true,
            options: callerIds,
            getItemValue: (value: EvCallerId) => value.number,
            itemRenderer: this._renderProps.renderCallerIdLabel,
            renderValue: callerId.description,
            searchOption: (value: EvCallerId, text: string) => {
              return this._searchMethod(
                `${value.description} ${value.number}`,
                text,
              );
            },
          },
        },
        ...(allowManualOutboundGates
          ? [
              {
                dataSign: 'queue',
                value: queue.gateId,

                onChange: (dialoutQueueId) => {
                  if (this._validate(dialoutQueueId)) {
                    this._modules.evCall.setFormGroup({
                      dialoutQueueId,
                    });
                  }
                },
                select: {
                  label: i18n.getString(
                    'queue',
                    this._modules.locale.currentLocale,
                  ),
                  required: true,
                  options: availableQueues,
                  renderValue: queue.gateName,
                  itemRenderer: (value) =>
                    this._renderProps.renderQueueLabel({
                      ...value,
                      currentLocale: this._modules.locale.currentLocale,
                    }),
                  getItemValue: (value: EvAvailableQueue) => value.gateId,
                  searchOption: (value: EvAvailableQueue, text: string) => {
                    return this._searchMethod(
                      `${value.gateName} ${value.gateId}`,
                      text,
                    );
                  },
                },
              },
            ]
          : []),
        ...(allowManualIntlCalls
          ? [
              {
                dataSign: 'country',
                value: country.countryId,
                onChange: (dialoutCountryId: string) => {
                  if (this._validate(dialoutCountryId)) {
                    this._modules.evCall.setFormGroup({
                      dialoutCountryId,
                    });
                  }
                },
                select: {
                  label: i18n.getString(
                    'country',
                    this._modules.locale.currentLocale,
                  ),
                  required: true,
                  options: availableCountries,
                  renderValue: `${country.countryName} (${country.countryId})`,
                  getItemValue: (value: EvAvailableCountry) => value.countryId,
                  itemRenderer: ({ countryId, countryName }) =>
                    `${countryName} (${countryId})`,
                  searchOption: (value: EvAvailableCountry, text: string) => {
                    return this._searchMethod(
                      `${value.countryName}(${value.countryId})`,
                      text,
                    );
                  },
                },
              },
            ]
          : []),
        {
          dataSign: 'ringTime',
          value: ringTime,
          onChange: (dialoutRingTime) => {
            this._modules.evCall.setFormGroup({
              dialoutRingTime,
            });
          },
          onBlur: () => {
            this._modules.evCall.checkDialoutRingTime();
          },
          input: {
            type: 'number',
            label: i18n.getString(
              'ringTime',
              this._modules.locale.currentLocale,
            ),
            required: true,
            placeholder: i18n.getString(
              'ringTime',
              this._modules.locale.currentLocale,
            ),
            ...ringTimeLimit,
          },
        },
      ];
    },
  );

  private _validate(value: string) {
    return !(typeof value === 'undefined' || value === null);
  }

  private _navigateToDialer() {
    this._modules.routerInteraction.push('/dialer');
  }

  private _searchMethod(value: string, text: string) {
    return value.toLowerCase().includes(text.toLowerCase());
  }

  getUIProps(
    props: EvManualDialSettingsRenderProps = {},
  ): EvManualDialSettingsUIProps {
    this._renderProps = props;
    return {
      currentLocale: this._modules.locale.currentLocale,
      settingFields: this.getSettingFields(),
    };
  }

  getUIFunctions(): EvManualDialSettingsUIFunctions {
    return {
      init: () => {
        this._modules.evCall.resetForm();
      },
      goBack: () => this._navigateToDialer(),
      save: () => {
        this._modules.evCall.saveForm();
        this._navigateToDialer();
      },
    };
  }
}

export { EvManualDialSettingsUI };
