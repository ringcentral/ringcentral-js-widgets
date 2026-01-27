import { logger } from '@ringcentral-integration/next-core';

/**
 * for safari, we need to play a sound to enable audio can be played
 *
 * safari will block audio play if user never interact with the page
 */
export const ensureAudioSoundPermission = () => {
  let checked = false;
  let result = false;

  return {
    ensure: async () => {
      if (!checked) {
        checked = true;

        const audio = new Audio();
        audio.muted = true;
        // 0-second mp3
        // https://stackoverflow.com/questions/12150729/silent-sound-data-uri
        audio.src =
          'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU2LjM2LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV6urq6urq6urq6urq6urq6urq6urq6urq6v////////////////////////////////8AAAAATGF2YzU2LjQxAAAAAAAAAAAAAAAAJAAAAAAAAAAAASDs90hvAAAAAAAAAAAAAAAAAAAA//MUZAAAAAGkAAAAAAAAA0gAAAAATEFN//MUZAMAAAGkAAAAAAAAA0gAAAAARTMu//MUZAYAAAGkAAAAAAAAA0gAAAAAOTku//MUZAkAAAGkAAAAAAAAA0gAAAAANVVV';

        try {
          await audio.play();

          result = true;
        } catch (error) {
          logger.log('🐞 ~ error:', error);
          result = false;
        } finally {
          audio.remove();
        }
      }

      return result;
    },
  };
};
