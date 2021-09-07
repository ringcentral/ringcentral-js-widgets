import { ActivityMatcher } from '../ActivityMatcherV2';
import { ContactMatcher } from '../ContactMatcherV2';
import { Storage } from '../StorageV2';

export interface Deps {
  storage: Storage;
  contactMatcher: ContactMatcher;
  activityMatcher: ActivityMatcher;
}
