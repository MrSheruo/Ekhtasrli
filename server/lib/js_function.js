const database = [];
const shortenUrl = (url) => {
  const shortUrl = Math.random().toString(36).substring(2, 15);
  if (isUrlShortened(shortUrl)) {
    return shortenUrl(url);
  }

  database.push({
    url,
    shortUrl,
  });
  return shortUrl;
};
const isUrlShortened = (shortUrl) => {
  return database.some((item) => item.shortUrl === shortUrl);
};
const searchUrl = (shortUrl) => {
  const url = database.find((item) => item.shortUrl === shortUrl);
  return url.url;
};

shortenUrl("https://www.google.com");
shortenUrl("https://www.youtube.com");
shortenUrl("https://www.facebook.com");

console.log(searchUrl(database[0].shortUrl));
