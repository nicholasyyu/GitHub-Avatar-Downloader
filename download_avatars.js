var request = require('request');
var fs = require('fs');
var getToken = require('./secrets');

var object = {};
var filePath = "avatars/";

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  object = JSON.parse(result);
  console.log("Errors:", object);
  getAvatarURL(object);
});

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': getToken.GITHUB_TOKEN
    }
  }
  request(options, function(err, res, body) {
    cb(err, body);
  });
}

function getAvatarURL(object){
  for(var i = 0; i < object.length; i++){
    //console.log('avatar_url: ' + object[i].avatar_url);
    downloadImageByURL(object[i].avatar_url, filePath + object[i].login);
  }
}

function downloadImageByURL(url, filePath) {
  // ...
  request(url).pipe(fs.createWriteStream(filePath));

}