export const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const getMusicDuration = (url) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio(url);

    audio.addEventListener("loadedmetadata", () => {
      resolve(audio.duration);
    });

    audio.addEventListener("error", (e) => {
      reject(`Failed to load audio: ${e.message}`);
    });
  });
};
