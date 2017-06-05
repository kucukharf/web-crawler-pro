var _ = require('lodash'),
	Promise = require('bluebird'),
	URL = require('url'),
	fs = Promise.promisifyAll(require('fs')),
	path = require('path'),
	validUrl = require('valid-url'),
	scraper = require('./lib'),
	timestamp = require('time-stamp'),
	lib    = require('./resources/lib'),
	format = require('string-template'),
	Archiver = require('archiver'),
	config = require('./config'),
	rimraf = require('rimraf'),
	glob = require('glob'),
	chalk = require('chalk'),
	jsonfile = require('jsonfile'),
	existsSync = fs.existsSync || path.existsSync;




	if (!existsSync(path.resolve(config.files.directory + /source/ + 'www.sony.ca-fr-all-electronics-2017_06_05-10:51:27:757', ''))) { 
			console.log("not exist");
		} else {
			console.log("exist");
		}

