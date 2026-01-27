export const createAudioElement = () => {
  const audioElement = globalThis.document.createElement('audio');
  audioElement.hidden = true;
  globalThis.document.body.appendChild(audioElement);
  return audioElement as HTMLAudioElement;
};
