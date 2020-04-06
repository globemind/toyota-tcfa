function GroupService ($http, $location, $cookies) {

	var groupsResponse = {};

	var config = {
		headers:  {'Authorization': $cookies.getObject('token')}
	};

	groupsResponse.getGrupos = function () {
		return  $http.get(apiUrl+'api/Grupos/', config);
	};

	//TODOS
	groupsResponse.getGruposTodos = function (porigen, pprograma) {
		return  $http.get(apiUrl+'api/Grupos?origen='+porigen+'&programa='+pprograma, config);
	};

	groupsResponse.deleteGrupo = function (model) {
		return  $http.delete(apiUrl+'api/Grupos/'+model.id, config);
	};
	
	groupsResponse.putGrupo = function (model) {
		return  $http.put(apiUrl+'api/Grupos/'+model.id, model, config);
	};

	//SLC
	groupsResponse.getGruposSLC = function (porigen, pprograma) {
		return  $http.get(apiUrl+'api/GruposSLC?origen='+porigen+'&programa='+pprograma, config);
	};

	groupsResponse.deleteGrupoSLC = function (model, verb) {
		return  $http.delete(apiUrl+'api/GruposSLC/'+verb+'/'+model.id, config);
	};

	groupsResponse.putGrupoSLC = function (model) {
		return  $http.put(apiUrl+'api/GruposSLC/'+model.id, model, config);
	};

	groupsResponse.setGrupoSLC = function (model) {
		return  $http.post(apiUrl+'api/GruposSLC/', model, config);
	};


	return groupsResponse;
}