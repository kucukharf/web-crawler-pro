var types = require('./resource-types');

// should contain same data as ./resource-ext-by-type
module.exports = {
	'.html': types.html,
	'.htm': types.html,
	'.css': types.css,
	'.js' : types.js,
	'.jpeg':types.imageJPEG,
	'.jpg':types.imageJPG,
	'.png':types.imagePNG,
	'.gif':types.imageGIF,
	'.svg':types.imageSVG
};
