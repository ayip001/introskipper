function getVideoID(url) {
  var patt = new RegExp(
    "^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:" +
    "[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$"
  );
  if (patt.test(url)&&url.indexOf("t=")==-1){
    return true;
  }
}
chrome.tabs.onUpdated.addListener(function(tabid, changeinfo, tab) {
  chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
    function(tabs){
       myurl = tabs[0].url+"&feature=youtu.be&t=05s";
       if(getVideoID(tabs[0].url)){}
        chrome.tabs.update(undefined, {url: myurl});
      }
    }
 );
});
