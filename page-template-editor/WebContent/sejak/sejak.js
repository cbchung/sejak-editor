/**
 * sejak.js
 */

Sejak = {
	resources : {
		basePath : ''
	},
	pathname : "/",
	initModules : function(modules){
		var path = window.location.pathname;
		var pathname = path.substring(0,  path.lastIndexOf('/')+1);
		this.pathname = pathname;
		
		this.tk.loadJS(pathname + 'sejak/core.js');
		this.tk.loadJS(pathname + 'sejak/premitives.js');
		this.tk.loadJS(pathname + 'sejak/stylers.js');
		
		if(modules !== undefined){
			console.log('customer module is defined');
		}
	},
	initSys: function(){
		window.onhashchange = this.hashchange;
	},
	init : function(configApp){
		if(configApp.resources !== undefined) for(var k in configApp.resources) this.resources[k] = configApp.resources[k];
		if(this.resources.basePath.slice(-1) != '/') this.resources.basePath += '/';
		
		this.initSys();
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
	},
	hashchange : function(){
		console.log('in hashchange:' + window.location.hash);
	},
	setHash : function(path){
		var hash = window.location.hash;
		window.location.hash = '#' + path;
	}
}

jQuery(document).ready(function(){
	try{
		Sejak.init(SejakApp);
	}catch(e){
		SejakApp = {};
		Sejak.init(SejakApp);
	}
});