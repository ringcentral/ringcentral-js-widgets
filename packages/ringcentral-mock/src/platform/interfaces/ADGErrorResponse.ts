import type { ADGError } from './ADGError';

// Format of response in case that any error occurred during request processing
export interface ADGErrorResponse {
  /**
   * Collection of all gathered errors
   */
  errors: ADGError[];
}
