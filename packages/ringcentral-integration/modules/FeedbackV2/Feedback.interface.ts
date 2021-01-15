import { Storage } from '../StorageV2';

interface FeedbackOptions {}

export interface Deps {
  storage: Storage;
  feedbackOptions?: FeedbackOptions;
}
