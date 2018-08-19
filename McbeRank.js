(function(){
	'use strict';
	
	function McbeRank(base_path){
		var that = this;

		this.paths = {
			data: base_path + "data/",
			statistics: base_path + "data/statistics/",
			servers: base_path + "data/servers/"
		};
		this.files = {
			addresses: this.paths.data + "addresses.json",
			online_servers: this.paths.data + "online-servers.json",
			offline_servers: this.paths.data + "offline-servers.json",
			plugins: this.paths.data + "plugins.json",
			total: this.paths.data + "total.json",
			statistics: {
				total: this.paths.statistics + "total.csv",
				server: function(address){ return that.paths.statistics + address.host + "-" + address.port + ".csv"; }
			},
			servers: {
				server: function(address){ return that.paths.servers + address.host + "-" + address.port + ".json"; }
			}
		};
	}

	McbeRank.prototype.timestamp = function(){
		return Math.floor(new Date().valueOf() * 0.001 / 60);
	};

	McbeRank.prototype.fromTimestamp = function(time){
		return new Date(time * 1000 * 60);
	};

	/**
	 * Clear minecraft's text format
	 */
	McbeRank.prototype.tfclear = function(text){
		return text.replace(/§[0-9a-fk-or]/gi, "");
	};

	/**
	 * Read a page's GET URL variables and return them as an associative array.
	 */
	McbeRank.prototype.getUrlVars = function(){
	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++){
	        hash = hashes[i].split('=');
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }
	    return vars;
	}

	McbeRank.prototype.regex = {
		host: /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/g,
		port: /^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/g
	}

	function isNodeJs(){
		return typeof module != "undefined" && "exports" in module;
	}

	function isHtml(){
		return typeof window != "undefined";
	}

	// node.js
	if(isNodeJs()){
		module.exports = new McbeRank(__basedir + "/public/");
	}	

	// html
	if(isHtml()){
		window.McbeRank = new McbeRank("/");
	}
}());