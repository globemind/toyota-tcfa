function ProgramService ($http, $location, $cookies) {

	var programsResponse = {};

	var config = {
		headers:  {'Authorization': $cookies.getObject('token')}
	};

	programsResponse.getGrupos = function () {
		return  $http.get(apiUrl+'api/Grupos/', config);
	};

	//TODOS
	programsResponse.getGruposTodos = function (porigen, pprograma) {
		return  $http.get(apiUrl+'api/Grupos?origen='+porigen+'&programa='+pprograma, config);
	};

	/*programsResponse.getGrupoById = function (id) {
		return  $http.get(apiUrl+'api/Grupos/'+id, config);
	};

	programsResponse.putGrupo = function (model) {
		return  $http.put(apiUrl+'api/Grupos/'+model.id, model, config);
	};

	programsResponse.deleteGrupo = function (model) {
		return  $http.delete(apiUrl+'api/Grupos/'+model.id, config);
	};

	programsResponse.getGruposSLC = function () {
		return  $http.get(apiUrl+'api/GruposSLC/', config);
	};*/

	//SLC
	programsResponse.getGruposSLC = function (porigen, pprograma) {
		return  $http.get(apiUrl+'api/GruposSLC?origen='+porigen+'&programa='+pprograma, config);
	};
/*
	//AUTORIZR
	programsResponse.getGruposAuth = function () {
		return  $http.get(apiUrl+'api/GruposSLC/autorizar', config);
	};

	programsResponse.getGrupoSLCById = function (id) {
		return  $http.get(apiUrl+'api/GruposSLC/'+id, config);
	};

	programsResponse.putGrupoSLC = function (model) {
		return  $http.put(apiUrl+'api/GruposSLC/'+model.id, model, config);
	};

	programsResponse.deleteGrupoSLC = function (model) {
		return  $http.delete(apiUrl+'api/GruposSLC/eliminar/'+model.id, config);
	};*/

	return programsResponse;
}