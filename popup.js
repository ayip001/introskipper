function addEntry(){
  var secondsOK = document.getElementById("myinput").value;
  url = myurl;
  if (!isYTURL(url)){
    alert("This is not a valid Youtube URL");
  }
  if isYTURL(url){
    var a = {};
    aut = getChannel(url);
    var channels = "";
    var keywords = "";
    chrome.storage.local.get('channels', function (result) {
        channels = result.channels;
        alert(result.channels);
        $("#channels").val(channels);
    });
    a = JSON.parse(channels);
    a[aut]=secondsOK;
  }
}

var myurl;

 chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
    function(tabs){
       myurl = tabs[0].url
    }
 );

function isYTURL(url) {
  // this regex verifies if a URL is a YouTube video
  var patt = /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.)?youtube\.com\/watch(?:\.php)?\?.*v=)([a-zA-Z0-9\-_]+)/g;
  // this also checks if there's already a time modification on the URL
  return (patt.test(url));
}

function getChannel(url) {
  if (!isYTURL(url))
    return false;
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
    return JSON.parse(request.responseText).author_url;
  }
};
document.getElementById('mybutton').onclick = addEntry;
