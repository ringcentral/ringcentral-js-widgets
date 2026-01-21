export interface PostCallViewOptions {
  /**
   * Callback that is called before navigating back from post-call view
   * Can be used to show warnings or perform cleanup
   * @param sessionId - The session ID of the call being closed
   */
  onBeforeGoBack?: (sessionId: string | null) => Promise<void> | void;
}

export interface PostCallViewPanelProps {}

export interface PostCallViewProps {
  variant: 'header' | 'info';
}
