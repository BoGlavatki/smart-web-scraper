function isAbsoluteURL(url) {
  // Überprüfen, ob die URL mit einem Protokoll wie http:// oder https:// beginnt
  return /^https?:\/\//i.test(url) || /^\/\//.test(url);
}

function isRelativeURL(url) {
  // Überprüfen, ob die URL relativ ist
  if (typeof url !== 'string') {
      return false;
  }
  return !isAbsoluteURL(url) && (url.startsWith('/') || url.startsWith('./') || url.startsWith('../'));
}

var absoluteURLs = [];

export function compareUrls(urls, domain) {
  for (const url of urls) {
      if (isRelativeURL(url)) {
          absoluteURLs.push(domain + url);
      } else if (url === "#") {
          absoluteURLs.push(domain + "/");
      } else {
          absoluteURLs.push(url);
      }
  }
  console.log(absoluteURLs);
  return absoluteURLs;
}
