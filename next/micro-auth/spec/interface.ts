export interface Interaction {
  Listen: {
    /**
     * login success callback
     */
    loginSuccess: () => void;
    /**
     * logout success callback
     */
    logoutSuccess: () => void;
  };
  Emit: {
    /**
     * logout current user
     */
    logout: () => Promise<void>;
    /**
     * generate auth code
     */
    generateAuth: (options: {
      clientId: string;
      ttl?: number;
      redirectUrl?: string;
    }) => Promise<string>;
  };
}
