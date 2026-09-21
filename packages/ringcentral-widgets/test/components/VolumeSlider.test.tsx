import { render, screen } from '@ringcentral-integration/test-utils';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import React from 'react';

import { VolumeSlider } from '../../components/AudioSettingsPanel/VolumeSlider';
import { VolumeSlider as VolumeSliderV2 } from '../../components/AudioSettingsPanelV2/components/VolumeSlider';

describe('VolumeSlider', () => {
  it('converts the slider percent value back to a volume value', () => {
    const onChange = jest.fn();
    render(<VolumeSlider volume={0.5} onChange={onChange} />);

    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });

    expect(onChange).toHaveBeenCalledWith(0.6);
  });
});

describe('VolumeSliderV2', () => {
  it('converts the slider percent value back to a volume value', () => {
    const onChange = jest.fn();
    render(
      <VolumeSliderV2 dataSign="volume" volume={0.5} onChange={onChange} />,
    );

    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });

    expect(onChange).toHaveBeenCalledWith(0.6);
  });
});
