import { screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';
import { CheckRouterNavigation } from '../../Navigate';

export const CheckAppVersionDisplay: StepFunction = async (props, context) => {
  expect(screen.queryByTestId('version')).not.toBeNull();
};

export const CheckRegionDisplay: StepFunction = async (props, context) => {
  expect(screen.queryByText('Region')).not.toBeNull();
};

export const CheckRegionNotDisplay: StepFunction = async (props, context) => {
  expect(screen.queryByText('Region')).toBeNull();
};

export const CheckUserLicenseDisplay: StepFunction = async (props, context) => {
  expect(screen.queryByText('End User License Agreement')).not.toBeNull();
};

export const CheckLogoutButtonDisplay: StepFunction = async (
  props,
  context,
) => {
  expect(screen.queryByTestId('logoutButton')).not.toBeNull();
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
