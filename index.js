var _crawler 					= require('./app'),
	_entryURL 					= process.env.npm_config_url || false;
	_entryOPT_recursive 		= process.env.npm_config_recursive ? process.env.npm_config_recursive : true;
	_entryOPT_maxRecursiveDepth = process.env.npm_config_maxRecursiveDepth ? process.env.npm_config_maxRecursiveDepth : 2;
	_entryOPT_maxDepth 			= process.env.npm_config_maxDepth ? process.env.npm_config_maxDepth : 2;

var _entryOptions = {
		recursive : _entryOPT_recursive,
		maxRecursiveDepth : _entryOPT_maxRecursiveDepth,
		maxDepth:_entryOPT_maxDepth
	};

	_crawler._init(_entryURL, _entryOptions);