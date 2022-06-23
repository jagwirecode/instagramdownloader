let xhttp = new XMLHttpRequest();
let res = "";

const VDMRegex = /"video_dash_manifest": ".+",/;
const DMRegex = /"dash_manifest": ".+",/;

const getComposedRegex = (...regexes) =>
  new RegExp(regexes.map((regex) => regex.source).join("|"));

const composedReg = getComposedRegex(VDMRegex, DMRegex);

// Make request and operate on response
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // Remove malformed JSON and parse it
    res = JSON.parse(this.responseText.replace(composedReg, ""));
    //Open URL in new tab
    if (res.items[0].hasOwnProperty("video_versions")) {
      window.open(res.items[0].video_versions[0].url);
    }
    // If the post contains multiple videos
    else if (res.items[0].hasOwnProperty("carousel_media")) {
      for (let i in res.items[0].carousel_media) {
        if (res.items[0].carousel_media[i].hasOwnProperty("video_versions")) {
          window.open(res.items[0].carousel_media[i].video_versions[0].url);
        }
      }
    }
  }
};

// Send request to instagram post URL + parameter to open with no authentication
xhttp.open("GET", window.location.href + "?__a=1&__d=dis", true);
xhttp.send();
