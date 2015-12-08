/*
 * clabsTest.js
 */
angular.module('sejak', [ ])
.provider('template', function(){
	this.coreName = 'core';
	this.baseName = 'base';
	this.setCode = function(name){ this.coreName = name; }
	this.setBase = function(name){ this.baseName = name; }
	this.$get = function($http){
		var core = this.coreName;
		var base = this.baseName;
		return {
			get : function(suc, fail){
				$http.get(core + "/template/", {
					params : {}
				})
				.then(suc, fail);
			},
			getUrl : function(type, name){
				return base + "/" + type + "/" + name + "/index.html";
			}
		}
	}
})
.directive('sjSite', function(template, $window){
	return {
		restrict : 'A',	// html element에 적용
		scope: {},
		templateUrl: function(elem, attr){
			return template.getUrl('site', attr['sjSite']);
		},
		controller: function($scope, $attrs){
			console.log("started with cb-site");
			$scope.title = $attrs['sjSite'];
			$scope.screen = {
				width : $window.innerWidth || $document.documentElement.clientWidth || $document.body.clientWidth,
				height : $window.innerHeight || $document.documentElement.clientHeight || $document.body.clientHeight
			};
			console.log('width/height: '+ $scope.screen.width + "," + $scope.screen.height);
			var menuBarSize  = {
					width : document.getElementById('menubar').clientWidth,
					height : document.getElementById('menubar').clientHeight
			};
			var bottomBarSize  = {
					width : document.getElementById('bottombar').clientWidth,
					height : document.getElementById('bottombar').clientHeight
			}
			console.log('menubar width/height: '+ menuBarSize.width + "," + menuBarSize.height);
			console.log('bottombar width/height: '+ bottomBarSize.width + "," + bottomBarSize.height);
//			angular.element('#layout').css('height', height + "px");
			var bodyHeight = $scope.screen.height - (menuBarSize.height + bottomBarSize.height);
			var bodyWidth = $scope.screen.width - (menuBarSize.width + bottomBarSize.width);
//			$scope.leftpaneStyle = "height: " + ($scope.screen.height - bodyHeight) + "px";
//			$scope.rightpaneStyle = "height: " +($scope.screen.height - bodyHeight)  + "px";
//			$scope.mainpaneStyle = "height: " + ($scope.screen.height - bodyHeight)  + "px";
//			$scope.mainpaneStyle = "width: " + ($scope.screen.width - bodyWidth)  + "px";
			document.getElementById("leftPane").style.height = ($scope.screen.height - bodyHeight) + "px";
			document.getElementById("rightPane").style.height = ($scope.screen.height - bodyHeight) + "px";
			document.getElementById("mainPane").style.height = ($scope.screen.height - bodyHeight) + "px";
			document.getElementById("mainPane").style.width = ($scope.screen.height - bodyWidth) + "px";
		},
		link: function($scope, $element, $attrs, ctrl) {
//			var menuBarSize  = {
//					width : document.getElementById('menubar').clientWidth,
//					height : document.getElementById('menubar').clientHeight
//			};
//			var bottomBarSize  = {
//					width : document.getElementById('bottombar').clientWidth,
//					height : document.getElementById('bottombar').clientHeight
//			}
//			console.log('menubar width/height: '+ menuBarSize.width + "," + menuBarSize.height);
//			console.log('bottombar width/height: '+ bottomBarSize.width + "," + bottomBarSize.height);
			console.log("in link-77777:");
//			var winHeight = $window.innerHeight;
			$element.css('height', $scope.screen.height + "px");
			$element.css('background-color', "#EEAACC");
		}
	}
});
