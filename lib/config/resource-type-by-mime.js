var types = require('./resource-types');

module.exports = {
	'text/html': types.html,
	'text/css': types.css,
	'application/x-javascript': types.js,
	'application/javascript':types.js,
	'image/jpeg': types.imageJPEG,
	'image/jpg':types.imageJPG,
	'image/gif':types.imageGIF,
	'image/svg':types.imageSVG,
	'image/png':types.imagePNG
};
