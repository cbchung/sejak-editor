/**
 * sejak.js
 */

Sejak = {
	initModules : function(modules){
		var path = window.location.pathname;
		var pathname = path.substring(0,  path.lastIndexOf('/')+1);
		
		this.tk.loadJS(pathname + 'sejak/core.js');
		
		if(modules !== undefined){
			console.log('customer module is defined');
		}
	},
	init : function(configApp){
		this.initModules(configApp.modules);
	},
	module : {
		pool : [],
		add : function(mod){
			this.pool.push(mod);
		},
		initCB : function(name){
			console.log('CB called with ' + name);
			console.log('sejak.module=' + JSON.stringify(this.pool));
			for(var i in this.pool) if(this.pool[i].name == name){
				this.pool[i].handler.test();
			}
		}
	},
	tk : {
		loadCSS : function(href) {
			var cssLink = $("<link rel='stylesheet' type='text/css' href='"+href+"'>");
			$("head").append(cssLink); 
		},
		loadJS : function(src) {
		     var jsLink = $("<script type='text/javascript' src='"+src+"'>");
		     $("head").append(jsLink); 
		}
	}
}

jQuery(document).ready(function($){
	Sejak.init(SejakApp);
});