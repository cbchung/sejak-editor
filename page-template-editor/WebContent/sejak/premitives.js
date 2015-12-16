/**
 * premitives.js
 */
(function(){
	var module = {
		name : "premitives",
		elements : [],
		handler : {
			loadComplete : function(el, options){
				console.log("----------------------------------------------");
				element.e.html(html);
			},
			load : function(el, options){
			},
			tags : [
			   {
				   name : 'container',
				   getNative: function(){
					   return  $('<div/>');
				   }
			   }  
				
			],
			init : function(){
				// 모든 정의된 tag에 대해서 수행
				for(var t in this.tags){
					var tagObject = this.tags[t];
					
					// 해당태그는 depth가 깊은 것부터 치환되야 노드정보를 잃지 않는다.
					// 1. retrieve & sort
					var ar = [];
					$(tagObject.name).each(function(){
					    ar.push({length: $(this).parents().length, elmt: $(this)});
					});
					ar.sort(function(a,b) {
					    if (a.length - b.length > 0)  return -1;					  
					    if (a.length - b.length < 0)  return 1;					    
					    return 0;
					});
					// 2. native HTML로 치환
					for (var i=0; i<ar.length; i++) {
						var ne = tagObject.getNative();
						var o = ar[i].elmt;
						$(o).each(function() {
							$.each(this.attributes, function() {
								$(ne).attr(this.name, this.value);
							});
							$(ne).addClass(tagObject.name);
						});
						console.log($(o).attr('id'));
						$(ne).html($(o).html());
						$(o).replaceWith(ne);
						module.elements.push({ e: ne });						
					}
				}
				
				Sejak.module.initCB(module.name);
			},
			test : function(){
				console.log("module sejak test:" + module.name);
			}
		}
	};
	
	Sejak.module.add(module);
	console.log("module premitives added");
	
	jQuery(document).ready(function($){
		module.handler.init();
	});
})();