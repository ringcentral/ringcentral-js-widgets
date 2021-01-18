import { RcButton, RcTextField } from '@ringcentral/juno';
import React, { FunctionComponent, useEffect } from 'react';

import {
  EvManualDialSettingsUIFunctions,
  EvManualDialSettingsUIProps,
} from '../../interfaces/EvManualDialSettingsUI.interface';
import i18n from '../../modules/EvManualDialSettingsUI/i18n';
import { ListItemWithScrollCheck } from '../ListItemWithScrollCheck';
import { SearchSelectField } from '../SearchSelectField';
import ManualDialSettingsPanelI18n from './i18n';
import styles from './styles.scss';
import { BackHeader } from '../SelectList';

export type ManualDialSettingsPanelProps = EvManualDialSettingsUIProps &
  EvManualDialSettingsUIFunctions;

export const ManualDialSettingsPanel: FunctionComponent<ManualDialSettingsPanelProps> = ({
  currentLocale,
  goBack,
  init,
  settingFields,
  save,
}) => {
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BackHeader
        currentLocale={currentLocale}
        title={i18n.getString('manualDialSettings', currentLocale)}
        onBackClick={goBack}
      />
      <div className={styles.container}>
        {settingFields.map(
          ({ select, input, dataSign, onChange, onBlur, value }, key) => {
            if (select) {
              return (
                <SearchSelectField
                  input
                  key={key}
                  InputProps={{
                    value: select.renderValue,
                    required: select.required,
                    'data-sign': dataSign,
                  }}
                  options={select.options}
                  currentLocale={currentLocale}
                  searchOption={select.searchOption}
                  title={select.label}
                  listRenderer={(
                    transferPhoneBook,
                    scrollCheck,
                    toggleOpen,
                  ) => {
                    return (
                      <>
                        {transferPhoneBook.map((obj, i) => {
                          const thisValue = select.getItemValue(obj);
                          return (
                            <ListItemWithScrollCheck
                              onClick={() => {
                                onChange(thisValue);
                                toggleOpen();
                              }}
                              key={i}
                              selected={thisValue === value}
                              scrollCheck={scrollCheck}
                              className={styles.listItem}
                              data-sign={`${dataSign}-${thisValue}`}
                            >
                              {select.itemRenderer(obj)}
                            </ListItemWithScrollCheck>
                          );
                        })}
                      </>
                    );
                  }}
                />
              );
            }
            if (input) {
              return (
                <RcTextField
                  key={key}
                  label={input.label}
                  inputProps={{
                    min: input.min,
                    max: 120,
                  }}
                  clearBtn={false}
                  type={input.type}
                  required={input.required}
                  placeholder={input.placeholder}
                  value={value}
                  data-sign={dataSign}
                  onBlur={() => onBlur()}
                  onChange={(e) => onChange(e.target.value)}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <span>
                        {ManualDialSettingsPanelI18n.getString(
                          'second',
                          currentLocale,
                        )}
                      </span>
                    ),
                  }}
                />
              );
            }
            return null;
          },
        )}
      </div>
      <div className={styles.footer}>
        <RcButton
          data-sign="saveButton"
          size="medium"
          fullWidth
          onClick={() => save()}
        >
          {ManualDialSettingsPanelI18n.getString('save', currentLocale)}
        </RcButton>
      </div>
    </>
  );
};
