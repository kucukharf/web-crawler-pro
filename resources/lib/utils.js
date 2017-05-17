var _  = require('lodash');
var _               = require('lodash');
var domains         = require('../../config/domains');
var paths           = require('../../config/paths');
var domainParser    = require('parse-domain');
var __URL           = require('url');

	module.exports = {
		checkUrlState : function(_url){
			//console.log(domains);
			//console.log(paths);
			//console.log('url:',_url);
			var urlInfo = domainParser(_url);
			//console.log('urlinfo:',urlInfo);
			var urlPaths =  __URL.parse(_url);
			//console.log('up:',urlPaths);
			var pathInfo = _.remove(urlPaths.path.split('/'), function(val){ return val !=="" });
			//console.log('pi:',pathInfo);
			//console.log('info length : ', pathInfo.length);
			//console.log('whitelist length : ', paths.whitelist.length);
			var pathIndex = -1;
			var pathPattern = (pathInfo.length > 2 ) ? _.slice(pathInfo, 0, 2) : pathInfo;
				pathIndex = _.findIndex(paths.whitelist, { path: pathPattern, active: true })

			//_.pull(pathInfo, array[1], array[2]);
			//console.log('finded Index for exclude:', pathIndex);
			var pathStatus =  pathIndex > -1 ? true : false;
			//console.log('ps:',pathStatus);
			domainStatus = (_.findIndex(domains.whitelist, urlInfo) || _.findIndex(domains.whitelist, urlInfo))  > -1 ? true : false;
			//console.log('ds:',domainStatus);
			status = (domainStatus && pathStatus) ? true : false;
			//console.log('status:',status);
			//console.log(_url, status);
			return status;
		}
	}