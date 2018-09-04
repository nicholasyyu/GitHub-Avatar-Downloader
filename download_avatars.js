var request = require('request');
var fs = require('fs');
var getToken = require('./secrets');

var object = {};
var filePath = "avatars/";
var args = process.argv.slice(2);

getRepoContributors(args[0], args[1], function(err, result) {
  console.log("Start HTTP request.")
  if(err){
    throw err
  }
  console.log("No err...")
  object = JSON.parse(result);
  getAvatarURL(object);
  console.log("End HTTP request.")
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

function getAvatarURL(object) {
  for(var i = 0; i < object.length; i++){
    downloadImageByURL(object[i].avatar_url, filePath + object[i].login);
  }
}

function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream(filePath));
}