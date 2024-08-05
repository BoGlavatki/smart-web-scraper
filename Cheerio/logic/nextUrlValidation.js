// Funktion zur Überprüfung, ob eine URL absolut ist
function isAbsoluteURL(url) {
  return /^https?:\/\//i.test(url) || /^\/\//.test(url);
}

// Funktion zur Überprüfung, ob eine URL relativ ist
function isRelativeURL(url) {
  return !isAbsoluteURL(url) && (url.startsWith('/') || url.startsWith('./') || url.startsWith('../'));
}

// Die Funktion exportieren
export function compareUrls(urls, domain) {
  // Array zur Speicherung der absoluten URLs
  let absoluteURLs = [];

  // Schleife durch alle URLs
  for (let url of urls) {
      if (isRelativeURL(url)) {
          // Wenn die URL relativ ist, füge die Domain hinzu
          absoluteURLs.push(domain + url);
      } else if (url === "#") {
          // Wenn die URL "#" ist, füge die Domain hinzu
          absoluteURLs.push(domain + "/");
      } else if (isAbsoluteURL(url)) {
          // Wenn die URL absolut ist, füge sie direkt hinzu
          absoluteURLs.push(url);
      }
  }

  // Gib das Array mit den absoluten URLs zurück
  return absoluteURLs;
}
