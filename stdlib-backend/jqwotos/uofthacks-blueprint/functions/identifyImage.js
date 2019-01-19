/**
 * @param {string} img A base64 encoded string
 * @returns {string}
 */

// const https = require("https");

// const post_options = {
//   host: "vision.googleapis.com",
//   port: "443",
//   path: "/v1/images:annotate",
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   }
// };

const request = require("request");

module.exports = (img = 'test', context, callback) => {
  request.post({
    headers: {
      "Content-Type": "application/json",
    },
    url: "https://vision.googleapis.com/v1/images:annotate",
    body: `{
      "requests": [
          {
              "image": {
                  "content": "${img}"
              },
              "features": [{
                  "type": "LABEL_DETECTION",
                  "maxResults": 1
              }]
          }
      ]
  }`
  }, (err, response, body) => {
    callback(null, `Data: ${body}`);
  });

  callback(null, `There was an error processing the data`);
};