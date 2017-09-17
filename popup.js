function addEntry(){
  var secondsOK = document.getElementById("myinput").value;
  alert(secondsOK);
}
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
    return JSON.parse(request.responseText).author_url;
  }
};
document.getElementById('mybutton').onclick = addEntry;
