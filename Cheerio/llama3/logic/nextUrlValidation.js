
function isAbsoluteURL(url) {
    // Überprüfen, ob die URL mit einem Protokoll wie http:// oder https:// beginnt
    return /^https?:\/\//i.test(url) || /^\/\//.test(url);
  }
  function isRelativeURL(url) {
    // Überprüfen, ob die URL relativ ist
    return !isAbsoluteURL(url) && (url.startsWith('/') || url.startsWith('./') || url.startsWith('../'));
  }

  var absoluteURL;

export  function compareUrls(url, domain){
    if(isRelativeURL(url)){
        absoluteURL.push(domain + url);
        // console.log(absoluteURL);
    }
    else if(url === "#"){
         absoluteURL = domain + "/" + url;
        // console.log(absoluteURL);
    }
    else  if(isAbsoluteURL(url)){
        absoluteURL = url;
    }
  console.log(absoluteURL)
  return absoluteURL
}
