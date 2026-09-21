/**
 * Optional noise reduction service. When provided (e.g. NoiseReduction from
 * micro-internal-features), AudioSettings exposes the setting state and
 * Webphone can run the local media stream through the denoiser.
 */
export interface NoiseReductionLike {
  enabled: boolean;
  setEnabled(enabled: boolean): void;
  denoiser(sessionId: string, stream: MediaStream): Promise<void>;
  reset(sessionId: string): void;
}
