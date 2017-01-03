var e2eConf = require("./project.json");

// Function to select all the files from a provided folder
var getAllFilesFromFolder = function(dir) {

    var filesystem = require("fs");
    var results = [];

    filesystem.readdirSync(dir).forEach(function(file) {

        file = dir + '/' + file;
        var stat = filesystem.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(_getAllFilesFromFolder(file))
        }
        else {
            results.push(file);
        }
    });
    return results;
};

var sendData = function() {
    var testDataDir = './src/e2e/app/testData';
    var request = require('request');
    var cookie;

    // LogIn request, Cookie saved in "cookie" variable
    request({
        url: e2eConf.client.baseUrl + '/j_security_check', // URL to hit
        method: 'POST',
        form: {
              "j_username": "testsuperuser",
              "j_password": "testsuperuser123"
          }
    }, function(error, response, body){
        if(error) {
            console.log(error);

        } else {
            cookie = response.headers["set-cookie"][0].split(';')[0];
            var results = getAllFilesFromFolder(testDataDir);

            // Send Data of JSON Files
            for (var i = 0 ; i < results.length ; i++) {
                var fileContent = require(results[i]);
                request({
                    url: e2eConf.client.baseUrl + '/services/dossier-cases/', // URL to hit
                    method: 'POST',
                    headers: {
                          'Content-Type': 'application/json',
                          'Cookie': cookie
                      },
                    json: fileContent

                }, function(error, response, body){
                    if(error) {
                        console.log(error);
                    }
                });
            }
        }
    });
};

module.exports = {
    'sendData':sendData
};
