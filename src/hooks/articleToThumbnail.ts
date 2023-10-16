export const articleToThumbnail = (article : string) => {
  const regex = /<img[^>]+src="([^">]+)/g;
  const match = regex.exec(article);
  
  if (match && match[1]) {
    console.log(match[1]);
    return match[1];
  }
  
  return "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg";
}