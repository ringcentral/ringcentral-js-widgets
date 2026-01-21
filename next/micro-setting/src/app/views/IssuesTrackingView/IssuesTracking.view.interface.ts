export interface IssuesTrackingViewOptions {
  /**
   * show header or not
   *
   * @default true
   */
  showHeader?: boolean;
}

export type IssuesTrackingViewProps = {
  /**
   * the route to go back
   *
   * @default '/settings'
   */
  backRoute: string;
};
