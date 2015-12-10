/**
 * core.js
 */
(function(){
	var module = {
		name : "sejak",
		elements : [],
		handler : {
			loadComplete : function(el, options){
				var element = module.elements[el];
				console.log('OK-complete:' + JSON.stringify(element));
				
				var data = element.h;
				var results = data.match(/\${\s*\w+\s*}/g);
				for(var i in results){
					var v = results[i].replace("${", "").replace("}","").trim();
					data=data.replace(results[i], element.scope[v]);
				}
				//
				var html = $.parseHTML( data );
				$(html).find( "[list]" ).each(function( index ) {
					try{
						var resContent = '';
						var obj = eval("element.model." + $(this).attr('list'));
						var content = $(this).html();
						var results = content.match(/\{{\s*\w+\s*}}/g);
						for(var idx in obj){
							var item = content;
							for(var i in results){
								var v = results[i].replace("{{", "").replace("}}","").trim();
								item=item.replace(results[i], obj[idx][v]);
							}
							resContent += item;
						}
						$(this).html( resContent );
					}catch(e){console.log($(this).attr('model') + " is not defined");}
				});
				$(html).find( "[model]" ).each(function( index ) {
					try{
						var obj = eval("element.model." + $(this).attr('model'));
						console.log('model-search:' + index + ":" + $(this).attr('model') + "-" + obj);
						$(this).text( obj );
					}catch(e){console.log($(this).attr('model') + " is not defined");}
				});
				$(html).find( "[event]" ).each(function( index ) {
					var data = $(this).attr('event').split(";");
					for(var idx in data){
						try{
							var parse = data[idx].split(":");
							$(this).bind(parse[0], function(){
//								console.log('event'+parse[0]);
								eval("element.scope." + parse[1].trim());
							});
						}catch(e){console.log($(this).attr('model') + " is not defined");}
					}
				});
				console.log("----------------------------------------------");
				element.e.html(html);
			},
			load : function(el, options){
				var element = module.elements[el];
				element.loaded = { template:false, controller:false, style: false };
				
				if(options.template !== undefined){
					if(options.template.match(/^http/i) || options.template.match(/^\//)) Sejak.tk.loadHTML(options.template, el, this.htmlCB);
					else Sejak.tk.loadHTML(Sejak.pathname + Sejak.pathInfo.viewer + '/' + options.template, el, this.htmlCB);
				}
				else element.loaded.template = true;
				if(options.controller !== undefined){
					console.log('startCo');
					if(options.controller.match(/^http/i) || options.controller.match(/^\//)) Sejak.tk.loadJS(options.controller);
					else Sejak.tk.loadHTML(Sejak.pathname + Sejak.pathInfo.controller + '/' + options.controller, el, this.controllCB);
				}
				else element.loaded.controller = true;
				if(options.style !== undefined){
					if(options.style.match(/^http/i) || options.style.match(/^\//)) Sejak.tk.loadCSS(options.style);
					else Sejak.tk.loadCSS(Sejak.pathname + Sejak.pathInfo.base + '/' + options.style);
				}
				
				/*
				 * receive waiting for this modules
				 * & call loadComplete()
				 */
				var tmTryCount=0;
				var loadComplete = this.loadComplete;
				var tmCheck = function(){
					if(element.loaded.controller && element.loaded.template) loadComplete(el, options);
					else {
						if(tmTryCount++ > 3){
							console.log('FAIL-toReceive timeouted');
							return;
						}
						setTimeout(tmCheck, 500);
					}
				};
				setTimeout(tmCheck, 100);
			},
			htmlCB : function(idx, data){
				module.elements[idx].h=data;
				module.elements[idx].loaded.template = true;
				console.log('htmlCB-OK:'+idx);
			},
			controllCB : function(idx, data){
				try{
					module.elements[idx].scope = { title:'sample' };
					module.elements[idx].model = { };
					module.elements[idx].c=new Function('scope', 'model', data);
					module.elements[idx].c(module.elements[idx].scope, module.elements[idx].model);
				}catch(e){ console.log('controllCB error:' + e); }
				module.elements[idx].loaded.controller = true;
				console.log('controllCB-OK:'+idx);
			},
			checkLoading : function(){
				clearTimeout(myVar);
			},
			init : function(){
				$(module.name).each(function( index ) {
					if(module.elements === undefined) module.elements = [];
					/*
					 * element = { e:DOM.e, ... }
					 */
					var ne = $('<div/>');
					$(this).each(function() {
						$.each(this.attributes, function() {
							if(this.specified && this.name != 'name') $(ne).attr(this.name, this.value);
						});
					});
					$(ne).addClass('sejak ' + $(this).attr('name'));
					$(ne).attr('id', 'sj-'+ $(this).attr('name'));
					
					$(this).replaceWith(ne);
					module.elements.push({ e: ne });
					try{ 
						module.handler.load(index, eval("obj = " + $(this).text()));
					} catch(e){ console.log('error:' + e); }
				});
				
				Sejak.module.initCB(module.name);
			},
			test : function(){
				/*
				var data="<sejak>hello<h2 model='title-4'>It's testing</h2>" +
						"<h1>${simple}어쩌구</h1>" +
						"<p>우리는 민족${1}중흥의 ${ handle }" +
						"</p>${24 }" +
						"</sejak>";
				console.log("module sejak test-data:" + data);
//				var results = data.match(/\${\s*(\w+)\s*}/g);
				var results = data.match(/\${\s*\w+\s*}/g);
				for(var i in results){
					console.log('rc>>>>>'+i + ":" + results[i]);
					var v = results[i].replace("${", "").replace("}","").trim();
					data=data.replace(results[i], v);
					console.log('rc>>>>>'+i + ":" + data);
				}
				*/
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