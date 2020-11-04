import { computed, RcUIModuleV2 } from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';

import { QueueLabelProps } from '../../components/ManualDialSettingsPanel/QueueLabel';
import {
  EvManualDialSettingsUIFunctions,
  EvManualDialSettingsUIProps,
} from '../../interfaces/EvManualDialSettingsUI.interface';
import {
  EvAvailableCountry,
  EvAvailableQueue,
  EvCallerId,
} from '../../lib/EvClient';
import {
  Deps,
  EvManualDialSettingsRenderProps,
  ManualDialSettingsUI,
} from './EvManualDialSettingsUI.interface';
import i18n from './i18n';

@Module({
  name: 'EvManualDialSettingsUI',
  deps: ['Locale', 'RouterInteraction', 'EvCall', 'EvAuth'],
})
class EvManualDialSettingsUI
  extends RcUIModuleV2<Deps>
  implements ManualDialSettingsUI {
  private _renderProps: EvManualDialSettingsRenderProps;

  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  @computed((that: EvManualDialSettingsUI) => [
    that._deps.evAuth.callerIds,
    that._deps.evCall.formGroup.dialoutCallerId,
  ])
  get callerId() {
    return this._deps.evAuth.callerIds.find(
      ({ number }) => number === this._deps.evCall.formGroup.dialoutCallerId,
    );
  }

  @computed((that: EvManualDialSettingsUI) => [
    that._deps.evAuth.availableQueues,
    that._deps.evCall.formGroup.dialoutQueueId,
  ])
  get queue() {
    return this._deps.evAuth.availableQueues.find(
      (queue) => queue.gateId === this._deps.evCall.formGroup.dialoutQueueId,
    );
  }

  @computed((that: EvManualDialSettingsUI) => [
    that._deps.evAuth.availableCountries,
    that._deps.evCall.formGroup.dialoutCountryId,
  ])
  get country() {
    return this._deps.evAuth.availableCountries.find(
      (country) =>
        country.countryId === this._deps.evCall.formGroup.dialoutCountryId,
    );
  }

  @computed((that: EvManualDialSettingsUI) => [
    that.queue,
    that.country,
    that.callerId,
    that._deps.evCall.formGroup.dialoutRingTime,
    that._deps.evCall.ringTimeLimit,
    that._deps.evAuth.callerIds,
    that._deps.evAuth.availableQueues,
    that._deps.evAuth.availableCountries,
    that._deps.evAuth.agentPermissions.allowManualOutboundGates,
    that._deps.evAuth.agentPermissions.allowManualIntlCalls,
    that._deps.locale.currentLocale,
  ])
  get settingFields() {
    return [
      {
        dataSign: 'callerId',
        value: this.callerId.number,
        onChange: (dialoutCallerId: string) => {
          if (this._validate(dialoutCallerId)) {
            this._deps.evCall.setFormGroup({
              dialoutCallerId,
            });
          }
        },
        select: {
          label: i18n.getString('callerId', this._deps.locale.currentLocale),
          required: true,
          options: this._deps.evAuth.callerIds,
          getItemValue: (value: EvCallerId) => value.number,
          itemRenderer: this._renderProps.renderCallerIdLabel,
          renderValue: this.callerId.description,
          searchOption: (value: EvCallerId, text: string) => {
            return this._searchMethod(
              `${value.description} ${value.number}`,
              text,
            );
          },
        },
      },
      ...(this._deps.evAuth.agentPermissions.allowManualOutboundGates
        ? [
            {
              dataSign: 'queue',
              value: this.queue.gateId,

              onChange: (dialoutQueueId: string) => {
                if (this._validate(dialoutQueueId)) {
                  this._deps.evCall.setFormGroup({
                    dialoutQueueId,
                  });
                }
              },
              select: {
                label: i18n.getString('queue', this._deps.locale.currentLocale),
                required: true,
                options: this._deps.evAuth.availableQueues,
                renderValue: this.queue.gateName,
                itemRenderer: (value: QueueLabelProps) =>
                  this._renderProps.renderQueueLabel({
                    ...value,
                    currentLocale: this._deps.locale.currentLocale,
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
      ...(this._deps.evAuth.agentPermissions.allowManualIntlCalls
        ? [
            {
              dataSign: 'country',
              value: this.country.countryId,
              onChange: (dialoutCountryId: string) => {
                if (this._validate(dialoutCountryId)) {
                  this._deps.evCall.setFormGroup({
                    dialoutCountryId,
                  });
                }
              },
              select: {
                label: i18n.getString(
                  'country',
                  this._deps.locale.currentLocale,
                ),
                required: true,
                options: this._deps.evAuth.availableCountries,
                renderValue: `${this.country.countryName} (${this.country.countryId})`,
                getItemValue: (value: EvAvailableCountry) => value.countryId,
                itemRenderer: ({
                  countryId,
                  countryName,
                }: EvAvailableCountry) => `${countryName} (${countryId})`,
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
        value: this._deps.evCall.formGroup.dialoutRingTime,
        onChange: (dialoutRingTime: number) => {
          this._deps.evCall.setFormGroup({
            dialoutRingTime,
          });
        },
        onBlur: () => {
          this._deps.evCall.checkDialoutRingTime();
        },
        input: {
          type: 'number',
          label: i18n.getString('ringTime', this._deps.locale.currentLocale),
          required: true,
          placeholder: i18n.getString(
            'ringTime',
            this._deps.locale.currentLocale,
          ),
          ...this._deps.evCall.ringTimeLimit,
        },
      },
    ];
  }

  private _validate(value: string) {
    return !(typeof value === 'undefined' || value === null);
  }

  private _navigateToDialer() {
    this._deps.routerInteraction.push('/dialer');
  }

  private _searchMethod(value: string, text: string) {
    return value.toLowerCase().includes(text.toLowerCase());
  }

  getUIProps(
    props: EvManualDialSettingsRenderProps = {},
  ): EvManualDialSettingsUIProps {
    this._renderProps = props;
    return {
      currentLocale: this._deps.locale.currentLocale,
      settingFields: this.settingFields,
    };
  }

  getUIFunctions(): EvManualDialSettingsUIFunctions {
    return {
      init: () => {
        this._deps.evCall.resetForm();
      },
      goBack: () => this._navigateToDialer(),
      save: () => {
        this._deps.evCall.saveForm();
        this._navigateToDialer();
      },
    };
  }
}

export { EvManualDialSettingsUI };
