'use strict';

var _ = require('lodash');
var domains = require('../../config/domains');
var extracted = require('../../config/extracted');
var paths = require('../../config/paths');
var domainParser = require('parse-domain');
var __URL = require('url');

module.exports = {
	checkUrlState: function(_url) {
		return (this.checkDomainState(_url) && this.checkPathState(_url) ? true : false)
	},
	checkRequestState: function(_url) {
		return (this.checkDomainState(_url) ? true : false)
	},
	checkPathState: function(_url) {
		var urlPaths = __URL.parse(_url);
		var pathInfo = _.remove(urlPaths.path.split('/'), function(val) {
			return val !== ""
		});
		var pathIndex = -1;
		var pathPattern = (pathInfo.length > 2) ? _.slice(pathInfo, 0, 2) : pathInfo;
		pathIndex = _.findIndex(paths.blacklist, {
			path: pathPattern,
			active: true
		});
		var pathStatus = (pathIndex > -1) ? false : true;
		return pathStatus;
	},
	checkDomainState: function(_url) {
		var urlInfo = domainParser(_url);
		var domainStatus = (_.findIndex(domains.whitelist, urlInfo) || _.findIndex(domains.whitelist, urlInfo)) > -1 ? true : false;
		return domainStatus;
	},
	generatePathList: function(list) {
		var _self = this;
		var list = _.remove(list, function(n) {
			return _self.checkDomainState(n)
		});
		_.each(list, function(item){
			var decode = decodeURIComponent(item);
			extracted.whitelist.push(_self.generatePathItem(decode))
		})
	},
	generatePathItem: function(item){
		var urlPath = __URL.parse('http:'+item);
		var pathItem = _.remove(urlPath.path.split('/'), function(val) {
			return val !== ""
		});
		return {
			active : true,
			path:pathItem
		}
	}
};