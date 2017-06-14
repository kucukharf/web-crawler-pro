'use strict';

var lib             = require('../resources/lib');
var chalk           = require('chalk');

module.exports = {
  prettifyUrls: true,
  filenameGenerator: 'byType',
  sources:[
    {selector: '.hero-img', attr: 'data-src-desktop', type:'imgSet'},
    {selector: '.st-image', attr: 'data-src-desktop', type:'imgSet'},
    {selector: '.iq-img', attr: 'data-src-desktop', type:'imgSet'},
    {selector: 'img.product-logo-overlay', attr:'src'},
    {selector: 'link[rel="stylesheet"]', attr: 'href'},
    {selector: 'a.product-link-to-pdp', attr: 'href'},
    {selector: 'script', attr: 'src'},
    {selector: 'button.tab', attr:'data-tab-url'}
  ],
  subdirectories: [
    {directory: 'public/assets/images', extensions: ['.jpg', '.png', '.svg','.gif','.pjpeg','.png-alpha','.jpeg', '.webp']},
    {directory: 'public/assets/js', extensions: ['.js']},
    {directory: 'public', extensions: ['.html']},
    {directory: 'public/assets/css', extensions: ['.css']},
    {directory: 'public/assets/others', extensions: ['.pdf']},
    {directory: 'public/assets/others', extensions: ['.json']},
    {directory: 'public/assets/others', extensions: ['.cur']},
    {directory: 'public/assets/fonts', extensions: ['.woff','.ttf','.eot', '.woff2', '.otf', '.svg']}
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
    var urlState = lib.utils.checkUrlState(_url);
    urlState ? console.log(chalk.green.bold(_url) + ' . ',chalk.green.bold(urlState)) : console.log(_url + ' . ',chalk.red(urlState));
    return urlState;
  }
};

