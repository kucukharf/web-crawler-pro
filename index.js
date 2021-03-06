'use strict';

var _crawler					 = require('./app'),
	config					 	 = require('./config/index'),
	_						 	 = require('lodash'),
	lib						 	 = require('./resources/lib'),
	axios					 	 = require('axios'),
	cheerio					 	 = require('cheerio'),
	request					 	 = require('request-promise'),
	_entryURL				 	 = process.env.npm_config_url || false;
var _entryURL					 = process.env.npm_config_url || false;
var _entryOPT_recursive			 = process.env.npm_config_recursive ? process.env.npm_config_recursive : false;
var _entryOPT_maxRecursiveDepth	 = process.env.npm_config_maxRecursiveDepth ? process.env.npm_config_maxRecursiveDepth : 4;
var _entryOPT_maxDepth			 = process.env.npm_config_maxDepth ? process.env.npm_config_maxDepth : 4;

var _entryOptions = {
	recursive: _entryOPT_recursive,
	maxRecursiveDepth: _entryOPT_maxRecursiveDepth,
	maxDepth: _entryOPT_maxDepth
}

var urls;

var defaults = {
	url: _entryURL,
	headers: {
		'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36'
	}
};

function callback(error, response, body) {
	// if necessary
}



request(defaults, callback).then(function(response) {
		let $ = cheerio.load(response, {
			decodeEntities: false
		});
		let kurs = [];
		$('.primary-link.products-li-link').each(function(i, elm) {
			kurs.push($(elm).attr('href'));
		});
		return (kurs);
	}).then(function(kurs) {
		lib.utils.generatePathList(kurs);
		_crawler._init(_entryURL, _entryOptions)
	})
	.catch(function(error) {
		console.log("error");
		_crawler._init(_entryURL, _entryOptions);
	});