var _crawler				 = require('./app'),
	config					 = require('./config/index'),
	_						 = require('lodash'),
	lib						 = require('./resources/lib'),
	axios					 = require('axios'),
	cheerio					 = require('cheerio'),
	request					 = require('request-promise'),
	_entryURL				 = process.env.npm_config_url || false;
_entryURL					 = process.env.npm_config_url || false;
_entryOPT_recursive			 = process.env.npm_config_recursive ? process.env.npm_config_recursive : false;
_entryOPT_maxRecursiveDepth	 = process.env.npm_config_maxRecursiveDepth ? process.env.npm_config_maxRecursiveDepth : 4;
_entryOPT_maxDepth			 = process.env.npm_config_maxDepth ? process.env.npm_config_maxDepth : 4;

var _entryOptions = {
	recursive: _entryOPT_recursive,
	maxRecursiveDepth: _entryOPT_maxRecursiveDepth,
	maxDepth: _entryOPT_maxDepth
}

var urls;

var defaults = {
	url: _entryURL,
	headers: {
		'User-Agent': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible;) Safari/537.36.'
	},
	transform: function (request) {
        return request;
    }
};

request(defaults).then(function(request, response) {
		console.log(response);
		//_crawler._init(_entryURL, _entryOptions);
	}).catch(function(error) {
		console.log(error);
		//_crawler._init(_entryURL, _entryOptions);
});