function ActionService ($http, $location, $cookies) {

	var actionsResponse = {};

	var config = {
		headers:  {'Authorization': $cookies.getObject('token')}
	};

	actionsResponse.getActions = function () {
		return  $http.get(apiUrl+'api/Acciones/', config);
	};

	actionsResponse.getActionxId = function (id) {
		return  $http.get(apiUrl+'api/Acciones/'+id, config);
	};

	return actionsResponse;
}