var types = require('./resource-types');
var defaultExtensions = {};

// should contain same data as ./resource-type-by-ext
defaultExtensions[types.html] = [ '.html', '.htm' ];
defaultExtensions[types.css] = [ '.css' ];
defaultExtensions[types.js] = [ '.js' ];
defaultExtensions[types.imageJPEG] = [ '.jpeg' ];
defaultExtensions[types.imageJPEG] = [ '.jpeg' ];
defaultExtensions[types.imageJPG] = [ '.jpg' ];
defaultExtensions[types.imagePNG] = [ '.png' ];
defaultExtensions[types.imageGIF] = [ '.gif' ];
defaultExtensions[types.imageSVG] = [ '.svg' ];

module.exports = defaultExtensions;

