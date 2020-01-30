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
		return  $http.put(apiUrl+'api/Grupos/'+model.id, model, config);
	};

	groupsResponse.deleteGrupo = function (model) {
		return  $http.delete(apiUrl+'api/Grupos/'+model.id, config);
	};

	groupsResponse.getGruposSLC = function () {
		return  $http.get(apiUrl+'api/GruposSLC/', config);
	};

	groupsResponse.getGrupoSLCById = function (id) {
		return  $http.get(apiUrl+'api/GruposSLC/'+id, config);
	};

	groupsResponse.putGrupoSLC = function (model) {
		return  $http.put(apiUrl+'api/GruposSLC/'+model.id, model, config);
	};

	groupsResponse.deleteGrupoSLC = function (model) {
		return  $http.delete(apiUrl+'api/GruposSLC/eliminar/'+model.id, config);
	};

	return groupsResponse;
}