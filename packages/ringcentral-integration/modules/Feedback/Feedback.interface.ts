import { Storage } from '../Storage';

interface FeedbackOptions {}

export interface Deps {
  storage: Storage;
  feedbackOptions?: FeedbackOptions;
}
