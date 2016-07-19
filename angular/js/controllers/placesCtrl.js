/*global util*/

angular.module('places')
	.controller('PlacesCtrl', function PlacesCtrl ($scope, $filter, store, focus) {
		'use strict';
		
		store.get();
		
		$scope.editingPlace = null;
		
		var places = $scope.places = store.places;
		
		$scope.setFile = function(el) {
			$scope.$apply(function($scope) {
				$scope.files = el;
			});
		};
		
		$scope.add = () => {
			util.toBase64($scope.files, (filename, data) => {
				var newPlace = {
					id: util.uuid(),
					title: $scope.newTitle,
					image: { filename, data }
				};
				
				store.insert(newPlace)
					.then(() => {
						angular.element($scope.files).val('');
						$scope.newTitle = '';
					});
			});
		};
		
		$scope.del = (place) => store.delete(place);
		
		$scope.edit = (place, $event) => {
			$scope.editingPlace = place;
			focus(place.id);
		};
		
		$scope.edited = (place, $event) => {
			if ($event.key === 'Escape') {
				$scope.editingPlace = null;
			} else if ($event.key === 'Enter') {
				//save
				store.put(place);
				$scope.editingPlace = null;
			}
		};
	});