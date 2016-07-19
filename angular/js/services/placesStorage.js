angular.module('places')
	.factory('placesStorage', function($http, $injector) {
		'use strict';
		
		return $injector.get('localStorage');
	})
	
	.factory('store', function($injector) {
		return $injector.get('localStorage');
	})
	
	.factory('localStorage', function ($q) {
		'use strict';
		
		var store_id = 'places';
		
		var store = {
			places: [],
			
			_get: () => JSON.parse(localStorage.getItem(store_id)),
			_save: (places) => localStorage.setItem(store_id, JSON.stringify(places)),
			
			delete: (p) => {
				var deferred = $q.defer();
				
				store.places.splice(store.places.indexOf(p), 1);
				
				store._save(store.places);
				
				deferred.resolve(store.places);
				
				return deferred.promise;
			},
			
			get: () => {
				var deferred = $q.defer();

				angular.copy(store._get(), store.places);
				deferred.resolve(store.places);

				return deferred.promise;
			},

			insert: (place) => {
				var deferred = $q.defer();

				store.places.push(place);

				store._save(store.places);
				deferred.resolve(store.places);

				return deferred.promise;
			},

			put: (place) => {
				var deferred = $q.defer();

				//store.places[index] = place;
				store.places = store.places.map(p => {
					if (p.id !== place.id) return p;
					else return place;
				});

				store._save(store.places);
				deferred.resolve(store.places);

				return deferred.promise;
			}
		};
		
		return store;
	});