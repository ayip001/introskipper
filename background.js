function isYTURL(url) {
  // this regex verifies if a URL is a YouTube video
  var patt = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu\.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/g;
  // this also checks if there's already a time modification on the URL
  return (patt.test(url) && url.indexOf("t=") == -1);
}

chrome.tabs.onUpdated.addListener(function(tabid, changeinfo, tab) {
  chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
    function(tabs) {
      myurl = tabs[0].url;
      // reload the page with updated URL if match
      if (isYTURL(myurl))
        chrome.tabs.update(undefined, {url: myurl + "&t=5"});
    }
  );
});
