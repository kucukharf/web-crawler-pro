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
	jsonfile = require('jsonfile'),
	existsSync = fs.existsSync || path.existsSync;

WebCrawler = {
	_init: function(url, options) {
		this.resetFolders();
		this.setPreOptions(url);
		return this._checkURLisValid(url) ? this._startCrawler(url, options) : this.responseStatus(config.messages._INVALID_URL);
	},
	_checkURLisValid: function(suspect) {
		return (validUrl.isUri(suspect) && lib.utils.checkRequestState(suspect)) ? true : false;
	},
	setPreOptions() {
		this.responseStatus(config.messages._SET_PRE_OPTIONS);
	},
	_startCrawler(url, options) {
		this._setDefaultOptions(url, options);
		scraper(this.options).then(this._CrawlerCallback.bind(this));
	},
	_CrawlerCallback: function() {
		this.checkDirectoryIsExist() ? this.createDirectory() : this.responseStatus(config.messages._NO_DIRECTORY);
		
	},
	checkDirectoryIsExist: function(){
		if (!existsSync(path.resolve(config.files.directory + /source/ + this.options.siteDirname, ''))) { 
			return false;
		} else {
			return true;
		}
	},
	createDirectory: function(){
		this.copyFiles(['readme.md', 'package.json', 'index.js']);
		this.makeArchive();
		this.responseStatus(config.messages._FINISHED);
	},
	_setDefaultOptions: function(url, options) {
		var siteDirname = this.getSiteDirname(url);
		var siteFullPath = this.getSiteFullPath(siteDirname);
		config.scraper = _.extend({}, config.scraper, options);
		var agent = _.findIndex(config.agents.list, function(agent) {
			return agent.title == 'Chrome 41.0 Linux';
		});

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
		console.log(type);
	},
	getSiteFullPath: function(siteDirname) {
		return path.resolve(config.files.source, siteDirname);
	},
	getSiteDirname: function(siteUrl) {
		var urlObj = URL.parse(siteUrl);
		pathIdentifier = urlObj.pathname === '/' ?  '' : urlObj.pathname.replace(/\//g, '-')
		var domain = urlObj.host + pathIdentifier;
		//@timestamp pattern(YYYY MM DD HH mm ss ms) :  >>> example : '2015_04_01-19:52:33:738'
		return domain + '-' + timestamp('YYYY_MM_DD-HH:mm:ss:ms');
	},
	makeArchive: function() {
		_self = this;
		var output = fs.createWriteStream(config.files.dist + '/' + this.options.siteDirname + '.zip');
		var notificationFile = fs.createWriteStream(config.files.dist + '/notification.json');
		var notification = 'archive/dist/notification.json';
		jsonfile.spaces = 2;
		jsonfile.writeFile(notification, this.getDistSummary(config.files.directory + /source/ + this.options.siteDirname), function (err) {
		 console.log("dist/notification.json is created for slack");
		})	

		var archive = Archiver('zip', {
			zlib: {
				level: 9
			}
		});
		output.on('close', function() {
			console.log(archive.pointer() + ' total bytes');
			console.log('archiver has been finalized and the output file descriptor has closed.');
			rimraf(path.resolve(config.files.directory + /source/ + _self.options.siteDirname, ''), function(){
				console.log('source directory cleaned');
			});
		});
		archive.pipe(output);
		archive.directory(config.files.source + '/' + this.options.siteDirname + '/', false);
		archive.finalize();
	},
	copyFiles: function(files) {
		_.forEach(files, function(value) {
			this.copyFile(config.files.resources + '/' + value, config.files.source + '/' + this.options.siteDirname + '/' + value)
		}.bind(this));
	},
	getDistSummary: function(directory) {
		var extensions = ['js', 'css', 'html', 'png', 'jpg', 'jpeg', 'pjpeg', 'png-alpha', 'webp', 'woff', 'ttf', 'eot', 'woff2', 'otf', 'svg', 'cur'];
		var files = {};
		_.each(extensions, function(type) {
			files[type] = glob.sync(directory + '/**/*.' + type, null);

		});
		var reportGroups = {
			documents: {
				types: ['html', 'js', 'css', 'woff', 'ttf', 'eot', 'woff2', 'otf', 'cur'],
				total: null
			},
			images: {
				types: ['webp', 'png', 'jpg', 'jpeg', 'svg', 'pjpeg', 'png-alpha'],
				total: null
			},
		}
		var total = {};
		_.each(reportGroups, function(group) {
			var total = 0;
			_.each(group.types, function(val) {
				total += files[val].length;
			})
			group.total = total;
		});
		var url = this.options.urls[0];
		var urlMessage = 'Site snapshot is generated for ' + url;
		var totalDocuments = reportGroups.documents.total + ' documents';
		var totalImages = reportGroups.images.total + ' images';
		var totalAssets = reportGroups.images.total + reportGroups.images.total + ' assets fetched';
		var summary = {
			messages:[urlMessage,totalDocuments,totalImages,totalAssets]
		};
		return summary;
	},
	resetFolders: function() {
		var dir = './' + config.files.directory;
		if (!fs.existsSync(dir)) {
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
		fs.createReadStream(source).pipe(fs.createWriteStream(target));
	}
}

module.exports = WebCrawler;