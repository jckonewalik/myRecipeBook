export const limitText = (text, limit = 25) => {
  return text.length > limit ? `${text.substring(0, limit)}...` : text;
};
