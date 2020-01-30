function GroupService ($http, $location, $cookies) {

	var groupsResponse = {};

	var config = {
		headers:  {'Authorization': $cookies.getObject('token')}
	};

	groupsResponse.getGrupos = function () {
		return  $http.get(apiUrl+'api/Grupos/', config);
	};

	groupsResponse.getGrupoById = function (id) {
		return  $http.get(apiUrl+'api/Grupos/'+id, config);
	};

	groupsResponse.putGrupo = function (model) {
		return  $http.put(apiUrl+'api/Grupos/'+model.id, config);
	};

	return groupsResponse;
}