import { IssuesTrackingUI } from './IssuesTrackingUI';

jest.mock('@ringcentral-integration/core', () => {
  return {
    __esModule: true,
    ...jest.requireActual('@ringcentral-integration/core'),
    action: jest.fn(),
  };
});

describe('IssuesTrackingUI', () => {
  let issuesTrackingUI: IssuesTrackingUI;

  beforeEach(() => {
    issuesTrackingUI = new IssuesTrackingUI({
      routerInteraction: {
        push: jest.fn(),
      },
      locale: {
        currentLocale: 'en-US',
      },
      alert: {
        success: jest.fn(),
        danger: jest.fn(),
      },
      browserLogger: {
        enable: jest.fn(),
        disable: jest.fn(),
        saveLog: jest.fn(),
        enabled: true,
        downloading: false,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('setOpen', () => {
    it('should set the open state', () => {
      issuesTrackingUI.setOpen(true);
      expect(issuesTrackingUI.open).toBe(true);

      issuesTrackingUI.setOpen(false);
      expect(issuesTrackingUI.open).toBe(false);
    });
  });

  describe('goBack', () => {
    it('should navigate to the settings page', async () => {
      const props = {};
      const uiFunctions = issuesTrackingUI.getUIFunctions(props);
      expect(uiFunctions.goBack).toEqual(expect.any(Function));

      uiFunctions.goBack();

      expect(
        issuesTrackingUI._deps.routerInteraction.push,
      ).toHaveBeenCalledWith('/settings');
    });
  });

  describe('toggleEnable', () => {
    it('should enable browser logger when checked is true', async () => {
      const props = {};
      const uiFunctions = issuesTrackingUI.getUIFunctions(props);
      uiFunctions.toggleEnable(true);

      expect(issuesTrackingUI._deps.browserLogger.enable).toHaveBeenCalled();
    });

    it('should set the open state to true when checked is false', async () => {
      const props = {};
      const uiFunctions = issuesTrackingUI.getUIFunctions(props);
      uiFunctions.toggleEnable(false);
      expect(issuesTrackingUI.open).toBe(true);
    });
  });

  describe('downloadLog', () => {
    it('should save the log and show success message', async () => {
      const uiFunctions = issuesTrackingUI.getUIFunctions({});
      await uiFunctions.downloadLog();
      expect(issuesTrackingUI._deps.browserLogger.saveLog).toHaveBeenCalled();
      expect(issuesTrackingUI._deps.alert.success).toHaveBeenCalledWith({
        message: 'issueTracking-downloadSuccess',
      });
      expect(issuesTrackingUI._deps.browserLogger.disable).toHaveBeenCalled();
    });

    it('should show error message when log download fails', async () => {
      issuesTrackingUI._deps.browserLogger.saveLog.mockRejectedValueOnce(
        new Error('Download failed'),
      );
      await issuesTrackingUI.downloadLog();
      expect(issuesTrackingUI._deps.alert.danger).toHaveBeenCalledWith({
        message: 'issueTracking-downloadFail',
      });
    });
  });

  describe('getUIProps', () => {
    it('should return the UI props', () => {
      const props = {};
      const uiProps = issuesTrackingUI.getUIProps(props);
      expect(uiProps.enabled).toBe(true);
      expect(uiProps.downloading).toBe(false);
      expect(uiProps.currentLocale).toBe('en-US');
      expect(uiProps.ConfirmPanelProps).toEqual({
        open: false,
        onCancel: expect.any(Function),
        onClose: expect.any(Function),
        onConfirm: expect.any(Function),
      });

      issuesTrackingUI.setOpen(true);
      expect(issuesTrackingUI.open).toBe(true);
      uiProps.ConfirmPanelProps.onCancel();
      expect(issuesTrackingUI.open).toBe(false);

      issuesTrackingUI.setOpen(true);
      expect(issuesTrackingUI.open).toBe(true);
      uiProps.ConfirmPanelProps.onClose();
      expect(issuesTrackingUI.open).toBe(false);

      issuesTrackingUI.setOpen(true);
      expect(issuesTrackingUI.open).toBe(true);
      uiProps.ConfirmPanelProps.onConfirm();
      expect(issuesTrackingUI.open).toBe(false);
    });
  });

  describe('getUIFunctions', () => {
    it('should return the UI functions', async () => {
      const props = {};
      const uiFunctions = issuesTrackingUI.getUIFunctions(props);
      expect(uiFunctions.downloadLog).toEqual(expect.any(Function));
      expect(uiFunctions.toggleEnable).toEqual(expect.any(Function));

      uiFunctions.toggleEnable(true);
    });
  });
});
