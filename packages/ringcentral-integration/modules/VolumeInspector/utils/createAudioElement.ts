export const createAudioElement = () => {
  const audioElement = document.createElement('audio');
  audioElement.hidden = true;
  document.body.appendChild(audioElement);
  return audioElement as HTMLAudioElement;
};
