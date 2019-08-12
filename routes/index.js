var express = require('express');
var http = require('https');
var router = express.Router();
var Jimp = require('jimp');

/* GET home page. */
router.get('/*', function(req, res, next) {
  var uri = req.url;
	uri = uri.replace(/ /g,"%20");
  var host = req.query.host;
  console.log("The host is --->");
  console.log(host);

  //uri = uri.split('source=')[1];
   //  var str_esc = encodeURIComponent(uri);
    // var final_string = "/ccstore/v1/images/?source=" + str_esc;  
	 
	 console.log("The image path is --->");
	 console.log(uri);
  
  var options = {
  "method": "GET",
  "hostname": host,
  "path": uri,
  "headers": {
    "authorization": "Basic YWRtaW46YWRtaW4="
  }
};

var request = http.request(options, function (response) {
  var chunks = [];

  response.on("data", function (chunk) {
    chunks.push(chunk);
  });

 // response.on("end", function () {
  //  var body = Buffer.concat(chunks);
 //   res.end(body);
 // });
	  response.on("end", function () {
    var body = Buffer.concat(chunks);
	
	Jimp.read(body)
	  .then(image => {
		image
		.resize(382, 200);
		
		image.getBufferAsync(Jimp.AUTO).then(function(result) {
			console.log('Result is ...');
			console.log(result);
			res.end(result);
		});
		
	  })
	  .catch(err => {
		// Handle an exception.
		res.end(JSON.stringify(err));
	  });
		//res.end(body);
	  });
	
 
});


  request.on('error', function(err) {
    console.log("Error Found");
	console.log(err);
});

request.end();
  
});

module.exports = router;
