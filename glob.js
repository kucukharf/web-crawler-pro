var glob = require('glob-fs');
var config = require('./config');
var _ = require('lodash');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var chalk = require('chalk');
var rimraf = require('rimraf');
var existsSync = fs.existsSync || path.existsSync;


var path = 'archive/source/www.sony.ca-2017_05_25-13:14:07:841'

var extensions = ['js', 'css', 'html', 'png', 'jpg', 'jpeg', 'pjpeg', 'png-alpha', 'webp', 'woff', 'ttf', 'eot', 'woff2', 'otf', 'svg', 'cur'];

var files = {};
_.each(extensions, function(type) {
	files[type] = glob({
		gitignore: false
	}).readdirSync(path + '/**/*.' + type);
});


//console.log(files);


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

var url = 'sony.com/all-electronics';

var summary = chalk.green(
	'\n' + 'Site snapshot is generated for ' + '\t' + chalk.yellow.bold( ' ' + url + ' ' ) + 
	'\n' +
	'\n \t' + chalk.blue.bold(reportGroups.documents.total) + ' \t \t \t' + chalk.red(' documents') +
	'\n \t' + chalk.blue.bold(reportGroups.images.total) + '\t \t \t' + chalk.red(' images ') +
	'\n \t' + chalk.blue.bold(reportGroups.documents.total + reportGroups.images.total) + ' \t \t \t' + chalk.red(' assets fetched ')) +
	'\n \n';
	
console.log(summary);

//console.log('Site snapshot for sony.com/all-electronics');
//console.log(reportGroups.documents.total + ' documents');
//console.log(reportGroups.images.total + ' images');
//console.log(reportGroups.assets.total + ' assets');
//console.log(reportGroups.documents.total + reportGroups.assets.total + reportGroups.images.total + ' assets are fetched');


/*
Site snapshot for sony.com/all-electronics
51.312 documents
23.456 images
328 assets fetched



Site snapshot for sony.com/all-electronics
51.312 documents
23.456 images
328 assets fetched */