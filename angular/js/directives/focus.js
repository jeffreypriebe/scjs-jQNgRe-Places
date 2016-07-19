angular.module('places')
	.directive('focusOn', function() {
		return function(scope, el, attr) {
			scope.$on('focusOn', function(e, name) {
				if (name === attr.focusOn) el[0].focus();
			});
		};
	})
	
	.factory('focus', function($rootScope, $timeout) {
		return function(name) {
			$timeout(function() {
				$rootScope.$broadcast('focusOn', name);
			});
		};
	});