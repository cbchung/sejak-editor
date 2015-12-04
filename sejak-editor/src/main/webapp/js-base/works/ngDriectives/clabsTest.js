/*
 * clabsTest.js
 */
angular.module('sejak', [])
.directive('sjSite', function(){
	return {
		restrict : 'A',	// html element에 적용
		scope: {},
		template: "<html><body>{{title}}</body></html>",
//		templateUrl: function(elem, attr){
//		      return 'customer-'+attr.type+'.html';
//		},
		controller: function($scope, $attrs){
			console.log("started with cb-site");
			$scope.title = "It's a test pages";
		},
		link: function($scope, $element, $attrs, ctrl) {
			console.log("in link-111:");
		}
	}
});
