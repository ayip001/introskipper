function isYTURL(url) {
  // this regex verifies if a URL is a YouTube video
  var patt = /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.)?youtube\.com\/watch(?:\.php)?\?.*v=)([a-zA-Z0-9\-_]+)/g;
  // this also checks if there's already a time modification on the URL
  return (patt.test(url) && url.indexOf("t=") == -1);
}

function getChannel(url) {
  if (!isYTURL(url))
    return undefined;
  url = "https://www.youtube.com/oembed?url=" + url + "&format=json";
  function makeHttpObject() {
  try {return new XMLHttpRequest();}
  catch (error) {}
  try {return new ActiveXObject("Msxml2.XMLHTTP");}
  catch (error) {}
  try {return new ActiveXObject("Microsoft.XMLHTTP");}
  catch (error) {}

  throw new Error("Could not create HTTP request object.");
}
var request = makeHttpObject();
request.open("GET", url, true);
request.send(null);
request.onreadystatechange = function() {
  if (request.readyState == 4){
    alert(request.responseText);
  }
};
  // literally coping code from google doesn't work either lmao
  /*var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://api.example.com/data.json", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      alert("this runs fine");
      var resp = JSON.parse(xhr.responseText);
      alert("and this doesnt for some fucking reason");
    }
  }
  xhr.send();*/
  // return resp.author_url;
}

chrome.tabs.onUpdated.addListener(function(tabid, changeinfo, tab) {
  chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
    function(tabs) {
      myurl = tabs[0].url;
      // reload the page with updated URL if match
      if (isYTURL(myurl))
      {
        getChannel(myurl);
        // alert(getChannel(myurl));
        chrome.tabs.update(undefined, {url: myurl + "&t=5"});
      }
    }
  );
});
