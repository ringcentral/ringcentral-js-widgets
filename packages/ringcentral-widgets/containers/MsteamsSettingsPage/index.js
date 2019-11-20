import { connect } from 'react-redux';
import MsteamsSettings from '../../components/MsteamsSettings';
import { withPhone } from '../../lib/phoneContext';

function mapToProps(
  _,
  {
    phone: { locale, brand },
    showAudioSetting,
    showVideoSetting,
    audioTakeOverEnabled,
    videoTakeOverEnabled,
  },
) {
  return {
    showAudioSetting,
    showVideoSetting,
    audioTakeOverEnabled,
    videoTakeOverEnabled,
    brandName: brand.name,
    currentLocale: locale.currentLocale,
  };
}

function mapToFunctions(
  _,
  { phone: { routerInteraction }, onEnabledStatusChange },
) {
  return {
    onBackClick() {
      routerInteraction.goBack();
    },
    onAudioSwitchChange(checked) {
      onEnabledStatusChange('audio', checked);
    },
    onVideoSwitchChange(checked) {
      onEnabledStatusChange('video', checked);
    },
  };
}

const MsteamsSettingsPage = withPhone(
  connect(
    mapToProps,
    mapToFunctions,
  )(MsteamsSettings),
);

export { mapToFunctions, mapToProps, MsteamsSettingsPage as default };
