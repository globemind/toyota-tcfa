function UserService ($http, $location, $cookies) {

	var userResponse = {};

	var config = {
		headers:  {'Authorization': $cookies.getObject('token')}
	};

	userResponse.setLogin = function (model) {
		return  $http.post(apiUrl+'users/authenticate', model);
	};

	userResponse.getMenu = function () {
		return  $http.get(apiUrl+'api/PanelMenu/', config);
	};

	return userResponse;
}