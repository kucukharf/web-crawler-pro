var open 		= require("open"),
	assert 		= require('assert'),
	path 		= require('path'),
	fs 			= require('fs'),
	request 	= require('request'),
	httpServer 	= require('http-server'),
	_host 		= process.env.npm_config_host || 'localhost',
	_port 		= process.env.npm_config_port ||  3000;
	_cors		= process.env.npm_config_cors ||  true;
	
	// @ Define current path as root path for http-server

	var root = path.join(__dirname);

	// @ Create a simple Http-server for browsing archive properly

	var server = httpServer.createServer({
		root: root,
		cors: _cors
	});
	
	// @ Listen incoming request with related port
	
		server.listen(_port);

	// @ Open default Browser 
	
		open("http://"+ _host + ":"+ _port);