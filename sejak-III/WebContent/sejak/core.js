/**
 * core.js
 */
(function(){
	var module = {
		name : "sejak",
		elements : [],
		handler : {
			load : function(el){
				this.m.elements.push(el);
			},
			init : function(){
				console.log("module init:" + module.name);
				$(module.name).each(function( index ) {
					console.log( index + ": " + $( this ).text() + ", attr[name]=" + $(this).attr('name') );
					if(module.elements === undefined) module.elements = [];
					module.elements.push($( this ));
					console.log("module=" + JSON.stringify(module) + ", index=" + index);
				});
				
				Sejak.module.initCB(module.name);
			},
			test : function(){
				console.log("module sejak test:" + module.name);
			}
		}
	};
	
	Sejak.module.add(module);
	console.log("module sejak added");
	
	jQuery(document).ready(function($){
		module.handler.init();
	});
})();