/**
 * stylers
 */
(function(){
	var module = {
		name : "stylers",
		handler : {
			styles : [
			   {
				   name : 'full-height',
				   load : function(el){
					   this.setHeight(el, function(height){
						   console.log('OK callback called-' + height);
					   });
					   /*
					    * add window.resize event listener
					    */
					   var moduleObject = this;
					   $(window).resize(function(){
						   moduleObject.setHeight(el,function(height){
							   console.log('OK callback called-' + height);
						   });
					   });
				   },
				   setHeight : function(n, cb){
					   console.log(n.nodeName);
					   if(n.nodeName.toLowerCase() == 'body') cb($(window).height());
					   else {
						   this.setHeight(n.parentNode, function(height){
							   var siblingHeight = 0;
							   var s = $(n).offset().top;
							   var e = s + $(n).outerHeight();
							   $(n).siblings().each(function(){
								   var ss = $(this).offset().top;
								   if( ss < s || ss >= e) siblingHeight += $(this).outerHeight();
//								   console.log('>>'+$(this).attr('id') +":" +  ss + " - " + s + "/" + e + " " + siblingHeight);
							   });
							   var res = height - siblingHeight;
							   $(n).outerHeight(res);
							   cb($(n).height());
						   });
					   }
				   }
			   },
			   {
				   name : 'layout-horizontal',
				   load : function(el){
					   $(el).children().each(function(){
						   $(this).css('display', 'inline-block');
						   $(this).css('vertical-align', 'top');
					   });
					   $(window).trigger('resize');
				   }
			   }
				
			],
			init : function(){
				for(var t in this.styles){
					var object = this.styles[t];
					
					$(".sj-"+object.name).each(function(){
						object.load(this);
					});
				}
				Sejak.module.initCB(module.name);
			},
			test : function(){
				console.log("module sejak test:" + module.name);
			}
		}
	};
	
	Sejak.module.add(module);
	console.log("module stylers added");
	
	jQuery(document).ready(function($){
		module.handler.init();
	});
})();