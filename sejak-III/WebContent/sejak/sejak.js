/**
 * sejak.js
 */

Sejak = {
	pathInfo : {
		base : '',
		controller : '',
		viewer: ''
	},
	pathname : "/",
	initModules : function(modules){
		var path = window.location.pathname;
		var pathname = path.substring(0,  path.lastIndexOf('/')+1);
		this.pathname = pathname;
		
		this.tk.loadJS(pathname + 'sejak/core.js');
		
		if(modules !== undefined){
			console.log('customer module is defined');
		}
	},
	init : function(configApp){
		if(configApp.path !== undefined) for(var k in configApp.path) this.pathInfo[k] = configApp.path[k];
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
			try{
				var cssLink = $("<link rel='stylesheet' type='text/css' href='"+href+"'>");
				$("head").append(cssLink); 
			}catch(e){ console.log('loadCSS:' + e); }
		},
		loadJS : function(src) {
			try{
			     var jsLink = $("<script type='text/javascript' src='"+src+"'>");
			     $("head").append(jsLink); 
			}catch(e){ console.log('loadJS:' + e); }
		},
		loadHTML : function(url, e, s, f){
			$.get( url, { "_": $.now() }, function( data ){ s(e, data); }, 'text').fail(function(){ if(fail !== undefined) f(); });
		}
	}
}

jQuery(document).ready(function($){
	Sejak.init(SejakApp);
});