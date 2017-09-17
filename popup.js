chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   function(tabs){
      myurl = tabs[0].url
   }
);
var myurl;

function addEntry(){
  getChannel(myurl);
}





function isYTURL(url) {
  // this regex verifies if a URL is a YouTube video
  var patt = /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.)?youtube\.com\/watch(?:\.php)?\?.*v=)([a-zA-Z0-9\-_]+)/g;
  // this also checks if there's already a time modification on the URL
  return (patt.test(url));
}

function getChannel(url) {
  if (!isYTURL(url))
    return false;
  if (url.indexOf('&')>-1){
    url=url.substring(0,url.indexOf('&'))
  }
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
    var auth = JSON.parse(request.responseText).author_url;
    var secondsOK = document.getElementById("myinput").value;
    url = myurl;
    if (!isYTURL(url)){
      alert("This is not a valid Youtube URL");
    }
    if (isYTURL(url)){
      var a = {};
      var a = {};
      a = JSON.parse(localStorage.getItem('a'));
      if (a == null) {
        a = JSON.parse(localStorage['json']);
      }
      a[auth]=secondsOK;
      localStorage['json'] = a;
      chrome.storage.sync.set({
        a: a
      }, function() {})

    }
  }
};
}
document.getElementById('mybutton').onclick = addEntry;
