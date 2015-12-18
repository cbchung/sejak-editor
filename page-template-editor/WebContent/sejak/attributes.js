/**
 * attributes
 */
(function(){
	var module = {
		name : "attributes",
		handles : [
			   {
				   name : 'model',
				   tagfor : [ 'container', 'cont' ],	// []이면, 모든 tag를 대상으로 함.
				   load : function(el){
					   console.log('handle-model:' + $(el).attr('model'));
					   var modelValue = $(el).attr('model').split(":");
					   console.log('model-name:' + modelValue[0]);
					   console.log('model-path:' +modelValue[1]);
				   }
			   }	
		],
		init : function(){
				for(var t in this.handles){
					var handle = this.handles[t];
					
					var selector = "[" + handle.name + "]";
					if(handle.tagfor.length != 0){
						selector = "." + handle.tagfor.join("["+handle.name+"], .") + "["+handle.name+"]";
					}
					
					$(".container[model]").each(function(index){
						handle.load(this);
					});
				}
				Sejak.module.initCB(module.name);
		},
		test : function(){
				console.log("module sejak test:" + module.name);
		}
	};
	
	Sejak.module.add(module);
	console.log("module attributes added");
	
	jQuery(document).ready(function($){
		module.init();
	});
})();