var lib             = require('../resources/lib');

module.exports = {
  recursive : false,
  maxRecursiveDepth : 6,
  prettifyUrls: true,
  filenameGenerator: 'byType',
  maxDepth:6,
  sources:[
    {selector: '.hero-img', attr: 'data-src-desktop-highres', type:'imgSet'},
    {selector: '.st-image', attr: 'data-src-desktop-highres', type:'imgSet'},
    {selector: '.iq-img', attr: 'data-src-desktop-highres', type:'imgSet'},
    {selector: 'img.product-logo-overlay', attr:'src'},
    {selector: 'link[rel="stylesheet"]', attr: 'href'},
    {selector: 'a.product-link-to-pdp', attr: 'href'},
    {selector: 'script', attr: 'src'}
  ],
  subdirectories: [
    {directory: 'assets/images', extensions: ['.jpg', '.png', '.svg','.pjpeg','.png-alpha','.jpeg', '.webp']},
    {directory: 'assets/js', extensions: ['.js']},
    {directory: 'assets/css', extensions: ['.css']},
    {directory: 'assets/others', extensions: ['.cur']},
    {directory: 'assets/fonts', extensions: ['.woff','.ttf','.eot', '.woff2', '.otf', '.svg']}
  ],
  httpResponseHandler: (response) => {
    if (response.statusCode === 404) {
    return Promise.reject(new Error('status is 404'));
  } else {
    if(response.headers.server === 'gwt' || lib.utils.checkRequestState(response.request.href)){
        return Promise.resolve({
        body: response.body,
        metadata: {
          headers: response.headers
        }
      });
      } else {
        return Promise.resolve();
      }
  }
  },
  urlFilter: function(_url){
    urlState = lib.utils.checkUrlState(_url);
    console.log(_url, urlState);
    return urlState;
  }
};
