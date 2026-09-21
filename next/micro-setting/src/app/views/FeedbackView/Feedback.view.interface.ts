export type FeedbackStep = 'rating' | 'helpImprove' | 'thankYou';

export interface FeedbackViewProps {}

/** Payload sent to guide iframe via postMessage when feedback dialog closes */
export interface FeedbackDataPayload {
  feedbackText: string;
  selectedTags: string[];
  rating: number;
}

export interface FeedbackViewOptions {
  /** Optional review link for "Share review" (e.g. marketplace link) */
  reviewLink?: string;
}
