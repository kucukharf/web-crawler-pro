
var config = require('./config');
var _ = require('lodash');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var chalk = require('chalk');
var rimraf = require('rimraf');
var existsSync = fs.existsSync || path.existsSync;
var glob = require('glob');

var directory = 'archive/source/www.sony.ca-2017_05_25-16:48:48:795'


// fs.readdir(directory, function(err, files) {
//     if (err) return console.error(err);
//     var cssFiles = files.filter( function(file){
//     		return path.extname(file).toLowerCase() === '.css'
//     });

//     console.log(cssFiles);
//  });



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

var url = 'sony.com/all-electronics';

var summary = chalk.green(
	'\n' + 'Site snapshot is generated for ' + '\t' + chalk.yellow.bold( ' ' + url + ' ' ) + 
	'\n' +
	'\n \t' + chalk.blue.bold(reportGroups.documents.total) + ' \t \t \t' + chalk.red(' documents') +
	'\n \t' + chalk.blue.bold(reportGroups.images.total) + '\t \t \t' + chalk.red(' images ') +
	'\n \t' + chalk.blue.bold(reportGroups.documents.total + reportGroups.images.total) + ' \t \t \t' + chalk.red(' assets fetched ')) +
	'\n \n';
	
console.log(summary);
