'use strict';

/**
 * @ngdoc function
 * @name desecClientApp.controller:SignUpCtrl
 * @description
 * # SignUpCtrl
 * Controller that manages the domain add form
 */
angular.module('desecClientApp')
	.controller('DomainAddCtrl', function ($scope, $http) {
		/**
		 * The current state of the domain add form.
		 * 0: starting state
		 * 1: requesting server
		 * 2: domain set up for use
		 * 3: error setting up this domain
		 * @type {number}
		 */
		$scope.state = 0;
		
		$scope.domainadd = function(domain, port, cert) {
			$scope.state = 1;
			$http.post('/api/v1/domains/', {
				name: domain,
				port: port,
				cert_info: cert,
			})
			.success(function(data, status, headers, config) {
					$scope.domain = data;
					$scope.state = 2;
				})
			.error(function(data, status, headers, config) {
					$scope.state = 3;
				});
		};
	});
