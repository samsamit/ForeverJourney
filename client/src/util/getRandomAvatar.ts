export const getRandomAvatar = (): string => {
    const imageId = 1 + Math.floor(Math.random() * Math.floor(42));
    return window.location.origin + `/images/avatar/con${imageId}.png`;
  };