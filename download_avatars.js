var request = require('request');

getRepoContributors("nicholasyyu", "GitHub-Avatar-Downloader", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': ''
    }
  }
  request(options, function(err, res, body) {
    cb(err, body);
  });
}