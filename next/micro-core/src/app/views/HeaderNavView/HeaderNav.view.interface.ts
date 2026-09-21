import type { HeaderNav } from '@ringcentral-integration/next-widgets/deprecated/components/HeaderNav';

export interface HeaderNavViewOptions {
  component?: typeof HeaderNav;
}

export interface Manifest {
  /**
   * The name of the app.
   */
  name: string;
  /**
   * The code of the app.
   */
  appCode: string;
  /**
   * The version of the app.
   */
  version: string;
  /**
   * The description of the app.
   */
  description: string;
  /**
   * The clientId of the app.
   */
  clientId: string;
  /**
   * The dependencies of the app.
   */
  dependencies: Record<string, string>;
  /**
   * The entry url of the app.
   */
  entry: string;
  /**
   * The type of the app.
   */
  type: 'inline' | 'iframe' | 'extension';
  /**
   * The config of the app.
   */
  config: {
    /**
     * The route after login.
     */
    routeAfterLogin: string;
    /**
     * The tab layout of app.
     */
    tabLayout: string[];
    /**
     * The max tab count of app.
     */
    maxTabCount: number;
  };
}
