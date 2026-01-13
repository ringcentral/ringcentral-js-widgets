import { fireEvent, render, screen } from '@ringcentral-integration/test-utils';
import React from 'react';

import IssuesTrackingPanel from '../../components/IssuesTrackingPanel';

describe('IssuesTrackingPanel', () => {
  it('renders the page header correctly', () => {
    const mockProps = {
      currentLocale: 'en-US',
      downloading: false,
      enabled: true,
      goBack: jest.fn(),
      toggleEnable: jest.fn(),
      downloadLog: jest.fn(),
      ConfirmPanelProps: {},
    };
    render(<IssuesTrackingPanel {...mockProps} />);
    expect(screen.getByText('Contact support')).toBeInTheDocument();
    expect(screen.getByTestId('backButton')).toBeInTheDocument();
  });

  it('toggles the enable switch correctly', () => {
    const mockProps = {
      currentLocale: 'en-US',
      downloading: false,
      enabled: true,
      goBack: jest.fn(),
      toggleEnable: jest.fn(),
      downloadLog: jest.fn(),
      ConfirmPanelProps: {},
    };
    render(<IssuesTrackingPanel {...mockProps} />);
    const enableSwitch = screen.getByRole('checkbox');
    fireEvent.click(enableSwitch);
    expect(mockProps.toggleEnable).toHaveBeenCalledWith(false);
  });

  it('disables the download button when downloading is true', () => {
    const mockProps = {
      currentLocale: 'en-US',
      downloading: true,
      enabled: true,
      goBack: jest.fn(),
      toggleEnable: jest.fn(),
      downloadLog: jest.fn(),
      ConfirmPanelProps: {},
    };
    render(<IssuesTrackingPanel {...mockProps} />);
    const downloadButton = screen.getByRole('button', { name: 'Downloading' });
    expect(downloadButton).toBeDisabled();
  });

  it('calls the downloadLog function when download button is clicked', () => {
    const mockProps = {
      currentLocale: 'en-US',
      downloading: false,
      enabled: true,
      goBack: jest.fn(),
      toggleEnable: jest.fn(),
      downloadLog: jest.fn(),
      ConfirmPanelProps: {},
    };
    render(<IssuesTrackingPanel {...mockProps} />);
    const downloadButton = screen.getByRole('button', { name: 'Download' });
    fireEvent.click(downloadButton);
    expect(mockProps.downloadLog).toHaveBeenCalled();
  });

  it('renders the support ticket link correctly', () => {
    const mockProps = {
      currentLocale: 'en-US',
      downloading: false,
      enabled: true,
      goBack: jest.fn(),
      toggleEnable: jest.fn(),
      downloadLog: jest.fn(),
      ConfirmPanelProps: {},
    };
    render(<IssuesTrackingPanel {...mockProps} />);
    const supportTicketLink = screen.getByRole('link', {
      name: 'Create a support ticket',
    });
    expect(supportTicketLink).toHaveAttribute(
      'href',
      'https://support.ringcentral.com/new-case.html',
    );
    expect(supportTicketLink).toHaveAttribute('target', '_blank');
  });
});
