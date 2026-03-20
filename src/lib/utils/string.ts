export const toTitleCase = (str: string | null | undefined): string => {
  if (!str) return "";
  // Reset case and split by space
  return str.toLowerCase()
    .split(' ')
    .map(word => {
      if (word.length === 0) return "";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};
