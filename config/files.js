var path = require('path');

module.exports = {
	directory	: 'archive',
	source		: path.resolve(__dirname, '../archive/source/'),
	dist		: path.resolve(__dirname, '../archive/dist/'),
	resources	: path.resolve(__dirname, '../resources/'),
	overrides	: path.resolve(__dirname, '../resources/overrides/')
};
