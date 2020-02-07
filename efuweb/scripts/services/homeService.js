function HomeService ($http, $location, $cookies) {

	var homeResponse = {};

	var config = {
		headers:  {'Authorization': $cookies.getObject('token')}
	};

	homeResponse.getPrograms = function (type) {
		return  $http.get(apiUrl+'api/PanelCartasProgramas/'+type, config);
	};

	return homeResponse;
}