import type { AudioPromptInfo } from './AudioPromptInfo';
import type { PromptLanguageInfo } from './PromptLanguageInfo';

// Prompt metadata
export interface IVRMenuPromptInfo {
  /**
   * Prompt mode: custom media or text
   */
  mode: 'Audio' | 'TextToSpeech';
  /**
   */
  audio: AudioPromptInfo;
  /**
   * For 'TextToSpeech' mode only. Prompt text
   */
  text: string;
  /**
   */
  language: PromptLanguageInfo;
}
