let xhttp = new XMLHttpRequest();
let res = "";

const regex = /"video_dash_manifest": ".+",/;

// Make request and operate on response
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // Remove malformed JSON and parse it
    res = JSON.parse(this.responseText.replace(regex, ""));
    // Open URL in new tab
    window.open(res.items[0].video_versions[0].url);
  }
};

// Send request to instagram post URL + parameter to open with no authentication
xhttp.open("GET", window.location.href + "?__a=1", true);
xhttp.send();
