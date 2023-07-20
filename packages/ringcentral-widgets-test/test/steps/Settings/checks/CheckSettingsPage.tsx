import { screen } from '@testing-library/react';
import type { StepFunction } from '../../../lib/step';
import { CheckRouterNavigation } from '../../Navigate';
import { CheckAppVersionDisplay } from './CheckAppVersionDisplay';

export const CheckRegionDisplay: StepFunction = async (props, context) => {
  expect(screen.queryByText('Region')).not.toBeNull();
};

export const CheckRegionNotDisplay: StepFunction = async (props, context) => {
  expect(screen.queryByText('Region')).toBeNull();
};

export const CheckUserLicenseDisplay: StepFunction = async (props, context) => {
  expect(screen.queryByText('End User License Agreement')).not.toBeNull();
};

export const CheckSettingsOptionDisplay: StepFunction<{
  optionText: string;
  show?: boolean;
}> = async ({ optionText, show = true }) => {
  if (show) {
    expect(screen.queryByText(optionText)).not.toBeNull();
  } else {
    expect(screen.queryByText(optionText)).toBeNull();
  }
};

export const CheckLogoutButtonDisplay: StepFunction = async (
  props,
  context,
) => {
  expect(screen.queryByTestId('logoutButton')).not.toBeNull();
};

export const CheckCallingSettingDisplay: StepFunction = async () => {
  expect(screen.queryByText('Calling')).not.toBeNull();
};

export const CheckCallingSettingNotDisplay: StepFunction = async (
  props,
  context,
) => {
  expect(screen.queryByText('Calling')).toBeNull();
};

export const CheckSettingsPage: StepFunction = async (props, context) => {
  return (
    <>
      <CheckRouterNavigation toPage="Settings" />
      <CheckRegionDisplay />
      <CheckAppVersionDisplay />
      <CheckUserLicenseDisplay />
      <CheckLogoutButtonDisplay />
    </>
  );
};
