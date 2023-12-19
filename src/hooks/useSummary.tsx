export const useSummary = (content: string) => {
  const contentArr = content.split(/<[^>]*>/);
  const contentText = contentArr.filter((item) => item !== "");
  if (contentText[0] && contentText[0].length > 100) {
    return contentText[0].slice(0, 100) + "...";
  }
  return contentText[0];
};
