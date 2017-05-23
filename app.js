var _ = require('lodash'),
	Promise = require('bluebird'),
	URL = require('url'),
	fs = Promise.promisifyAll(require('fs')),
	path = require('path'),
	validUrl = require('valid-url'),
	scraper = require('./lib'),
	timestamp = require('time-stamp'),
	format = require('string-template'),
	Archiver = require('archiver'),
	config = require('./config'),
	rimraf = require('rimraf'),
	existsSync = fs.existsSync || path.existsSync;

	WebCrawler = {
		_init: function(url, options) {
			this.resetFolders();
			this.setPreOptions(url);
			return this._checkURLisValid(url) ? this._startCrawler(url,options) : this.responseStatus(config.messages._INVALID_URL);
		},
		_checkURLisValid: function(suspect) {
			return validUrl.isUri(suspect) ? true : false;
		},
		setPreOptions(){
			this.responseStatus(config.messages._SET_PRE_OPTIONS);
		},
		_startCrawler(url, options) {
			this._setDefaultOptions(url, options);
			scraper(this.options).then(this._CrawlerCallback.bind(this));
		},
		_CrawlerCallback: function() {
			this.copyFiles(['readme.md', 'package.json', 'index.js']);
			this.makeArchive();
			this.responseStatus(config.messages._FINISHED);
		},
		_setDefaultOptions: function(url, options) {
			var siteDirname = this.getSiteDirname(url);
			var siteFullPath = this.getSiteFullPath(siteDirname);
			config.scraper = _.extend({}, config.scraper, options);
			var agent = _.findIndex(config.agents.list, function(agent) { return agent.title == 'Chrome 41.0 Linux'; });

			this.options = _.extend({}, config.scraper, {
				urls: [url],
				directory: siteFullPath,
				request: {
					headers: {
						userAgent: config.agents.list[agent].userAgent
					}
				},
				siteDirname: siteDirname,
				siteFullPath: siteFullPath,
				siteURL: url
			});
		},
		responseStatus: function(type) {
			//console.log(type);
		},
		getSiteFullPath: function(siteDirname) {
			return path.resolve(config.files.source, siteDirname);
		},
		getSiteDirname: function(siteUrl) {
			var urlObj = URL.parse(siteUrl);
			var domain = urlObj.host;
			//@timestamp pattern(YYYY MM DD HH mm ss ms) :  >>> example : '2015_04_01-19:52:33:738'
			return domain + '-' + timestamp('YYYY_MM_DD-HH:mm:ss:ms');
		},
		makeArchive: function() {
			var output = fs.createWriteStream(config.files.dist + '/' + this.options.siteDirname + '.zip');
			var archive = Archiver('zip', {
				zlib: {
					level: 9
				}
			});
			output.on('close', function() {
				console.log(archive.pointer() + ' total bytes');
				console.log('archiver has been finalized and the output file descriptor has closed.');
			});
			archive.pipe(output);
			archive.directory(config.files.source + '/' + this.options.siteDirname + '/', false);
			archive.finalize();
		},
		copyFiles: function(files) {
			//console.log(files);
			_.forEach(files, function(value) {
				this.copyFile(config.files.resources + '/' + value, config.files.source + '/' + this.options.siteDirname + '/' + value)
			}.bind(this));
		},
		resetFolders: function(){
			var dir = './' + config.files.directory;
				if (!fs.existsSync(dir)){
    				fs.mkdirSync(dir);
				}
				

			var _willDeleteDistDirectories = [config.files.dist];
				_.forEach(_willDeleteDistDirectories, function(value) {
					rimraf(path.resolve(value, ''), function() {
						if (!existsSync(value)) {
							fs.mkdirSync(value);
						}
					});
			});
		},
		copyFile: function(source, target) {
			//console.log(source, target);
			fs.createReadStream(source).pipe(fs.createWriteStream(target));
		}
	}

module.exports = WebCrawler;