var express     = require('express');
var cheerio     = require('cheerio');
var interceptor = require('express-interceptor');
 
var app = express();
 
var finalScriptInterceptor = interceptor(function(req, res){
  return {
    isInterceptable: function(){
      return /text\/html/.test(res.get('Content-Type'));
    },
    intercept: function(body, send) {
      var $document = cheerio.load(body);
      $document('head').append('<link rel="stylesheet" href="/assets/js/override-crawler-scripts.css">');
      $document('body').append('<script type="text/javascript" src="/assets/js/override-crawler-scripts.js"></script>');
      send($document.html());
    }
  };
})
 
app.use(finalScriptInterceptor); 
app.use(express.static(__dirname));

app.listen(3000);
