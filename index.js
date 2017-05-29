var _crawler = require('./app'),
	config = require('./config/index'),
	_ = require('lodash'),
	lib    = require('./resources/lib'),
	axios = require('axios'),
	cheerio = require('cheerio'),
	_entryURL = process.env.npm_config_url || false;
_entryURL = process.env.npm_config_url || false;
_entryOPT_recursive = process.env.npm_config_recursive ? process.env.npm_config_recursive : true;
_entryOPT_maxRecursiveDepth = process.env.npm_config_maxRecursiveDepth ? process.env.npm_config_maxRecursiveDepth : 6;
_entryOPT_maxDepth = process.env.npm_config_maxDepth ? process.env.npm_config_maxDepth : 6;

var _entryOptions = {
	recursive: _entryOPT_recursive,
	maxRecursiveDepth: _entryOPT_maxRecursiveDepth,
	maxDepth: _entryOPT_maxDepth
};

var urls;

axios.get(_entryURL).then(function(response) {
	let $ = cheerio.load(response.data, { decodeEntities: false });
	let kurs = [];
	$('.primary-link.products-li-link').each(function(i, elm) {
		kurs.push($(elm).attr('href'));
	});
	return (kurs);
	}).then(function(kurs) {
		lib.utils.generatePathList(kurs);
		_crawler._init(_entryURL, _entryOptions);
	});
