var _crawler 		= require('./app'),
	_entryURL 		= process.env.npm_config_url || false;
	_crawler._init(_entryURL);
