import { EvClient } from '../../lib/EvClient';
import { EvTabManager } from '../EvTabManager';

export interface State {
  //
}

export interface Deps {
  evClient: EvClient;
  tabManager: EvTabManager;
}

export interface Subscription extends State {
  //
}
