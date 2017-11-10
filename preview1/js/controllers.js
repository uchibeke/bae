angular.module('MainController', []).controller('Controller', ['$scope', '$http', '$timeout', '$location', '$anchorScroll', "$routeParams",
function($scope, $http, $timeout, $location, $anchorScroll, $routeParams) {

	// This will need to change if api is hosted in a new server
	const apiBase = "http://localhost:8080/api/org.acme.bae.";

	$scope.data = {};
	d = $scope.data;

	$scope.utils = {};
	u = $scope.utils;

	// d.path = window.location.href;

	// Check if object is a valid JSON
	u.isJson = function(str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	};

	if ($routeParams.id && $routeParams.owner && $routeParams.receiver) {

		$http.get(apiBase + "AnAsset/" + $routeParams.id).then(function(response) {
			d.asset = response.data;
			d.asset.status = d.asset.given ? "Given out" : "Taken back";
			delete d.asset.given;
			d.asset.owner = decodeURIComponent(d.asset.owner).split("#").pop().charAt(0);
			d.asset.createdOn = new Date(d.asset.createdOn).toLocaleString();
			console.log(d);
			window.document.title = d.asset.owner;
			u.doneLoadingApplicationForm = true;
			u.showCheckmark = true;
		});
	} else {
		var error = "ERROR: URL must have the following parameters: /:id/:owner/:receiver/";
		console.log(error);
	}

	u.capitalizeAndSpace = function(str) {
		return typeof str === 'string' ? (str.charAt(0) + str.slice(1)).replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase() : "";
	};

	u.parseJson = function(str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return str;
		}
		return JSON.parse(str);
	};

	u.scrollTo = function(section) {
		$('html, body').animate({
			scrollTop : $("#" + section).offset().top
		}, 500);
	};

	u.checkMobileOS = function() {

		var MobileUserAgent = navigator.userAgent || navigator.vendor || window.opera;

		if (MobileUserAgent.match(/iPad/i) || MobileUserAgent.match(/iPhone/i) || MobileUserAgent.match(/iPod/i)) {

			return 'iOS';

		} else if (MobileUserAgent.match(/Android/i)) {

			return 'Android';

		} else {

			return 'unknown';

		}

	};
	
	
	var message_text = 'Some message goes here';

	var href = '';

	if (u.checkMobileOS() == 'iOS') {

		href = "sms:"+ d.cellPhoneNumber +  "&body=" + encodeURI(message_text);

	}

	if (u.checkMobileOS() == 'Android') {

		href = "sms:"+ d.cellPhoneNumber +  "?body=" + encodeURI(message_text);

	}

	document.getElementById("sms_link").setAttribute('href', href);

}]);

// http://127.0.0.1:8020/bae/preview/index.html#!/asset/4efbe2024ba8d28559511a87acb26075c0dff69efcf9dabda9ba254eaec28c2b/2/Uchi
