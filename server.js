var express = require('express');
var cors = require('cors')
 var server = express();
 server.use(express.static(__dirname + '/public/'));

 //server.use(cors());

 server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  if ('OPTIONS' === req.method) {
      res.status(204).send();
  }
  else {
      next();
  }
});

  var port = 8080;
  server.listen(port, function() {
        console.log('server listening on port ' + port);
  });