var express     = require('express');
var cheerio     = require('cheerio');
var interceptor = require('express-interceptor');
var open        = require("open");
var app         = express();
var port        = 3000;
var finalScriptInterceptor = interceptor(function(req, res){
  return {
    isInterceptable: function(){
      return /text\/html/.test(res.get('Content-Type'));
    },
    intercept: function(body, send) {
      var $document = cheerio.load(body);
      $document('head').append('<link rel="stylesheet" href="/assets/css/override-crawler-styles.css">');
      $document('body').append('<script type="text/javascript" src="/assets/js/override-crawler-scripts.js"></script>');
      send($document.html());
    }
  };
})
 

app.use(finalScriptInterceptor); 
app.use(express.static(__dirname + '/public'));

app.listen(port);
open("http://localhost:"+ port);
