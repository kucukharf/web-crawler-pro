var config = require('./config');
var _ = require('lodash');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var rimraf = require('rimraf');
var existsSync = fs.existsSync || path.existsSync;
var _prompt = require('prompt');
var _cl = process.env.npm_config_cl || false;


if(_cl){ 

deleteFolder();

} else {
_prompt.get({
	properties: {
		confirm: {
			pattern: /^(yes|no|y|n)$/gi,
			description: 'Do you really want to delete the archive and delete all files?',
			message: 'Type yes/no',
			required: true,
			default: 'no'
		}
	}
}, function(err, result) {
	var c = result.confirm.toLowerCase();
	if (c != 'y' && c != 'yes') {
		console.log('Aborted...');
		return;
	}
	deleteFolder();
	console.log('Archives are deleted and the directory is empty now');
});
}


function deleteFolder(){
	//var _willDeleteDirectories = _.values(config);
	var dir = './' + config.files.directory;

	if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
	}
	var _willDeleteDirectories = [config.files.source, config.files.dist];
		_.forEach(_willDeleteDirectories, function(value) {
			rimraf(path.resolve(value, ''), function() {
				if (!existsSync(value)) {
					fs.mkdirSync(value);
				}
			});
		});
}