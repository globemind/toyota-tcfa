function ProgramActionGroupService ($http, $location, $cookies) {

	var response = {};

	var config = {
		headers:  {'Authorization': $cookies.getObject('token')}
	};

	response.getProgramsActionsGroups = function () {
		return  $http.get(apiUrl+'api/ProgramasAccionesXGrupo/', config);
	};

	//TODOS
	response.getProgramsActionsGroupsTodos = function (porigen, pprograma, psearch) {
		return  $http.get(apiUrl+'api/ProgramasAccionesXGrupo/Origen/'+porigen+'/Programa/'+pprograma+'?codigo='+psearch.codigo+'&descripcion='+psearch.descripcion, config);
	};

	response.getProgramsActionsGroupsTodosPrespectiva = function (porigen, pprograma, psearch, pprespectiva) {
		return  $http.get(apiUrl+'api/ProgramasAccionesXGrupo/Origen/'+porigen+'/Programa/'+pprograma+'/perspectiva/'+pprespectiva+'?codigo='+psearch.codigo+'&descripcion='+psearch.descripcion, config);
	};

	response.deleteProgramActionGroup = function (model) {
		return  $http.delete(apiUrl+'api/ProgramasAccionesXGrupo/'+model.id, config);
	};
	
	response.putProgramActionGroup = function (model) {
		return  $http.put(apiUrl+'api/ProgramasAccionesXGrupo/'+model.id, model, config);
	};
	
	response.getProgramActionGroupxId = function (pid) {
		return  $http.get(apiUrl+'api/ProgramasAccionesXGrupo/'+pid, config);
	};
	
	response.getProgramActionGroupxIdPrespectiva = function (pid, pprespectiva) {
		return  $http.get(apiUrl+'api/ProgramasAccionesXGrupo/'+pid+'/perspectiva/'+pprespectiva, config);
	};

	//SLC
	response.getProgramsActionsGroupsSLC = function (porigen, pprograma, psearch) {
		return  $http.get(apiUrl+'api/ProgramasAccionesXGrupoSLC/Origen/'+porigen+'/Programa/'+pprograma+'?codigo='+psearch.codigo+'&descripcion='+psearch.descripcion, config);
	};

	response.getProgramsActionsGroupsSLCPrespectiva = function (porigen, pprograma, psearch, pprespectiva) {
		return  $http.get(apiUrl+'api/ProgramasAccionesXGrupoSLC/Origen/'+porigen+'/Programa/'+pprograma+'/perspectiva/'+pprespectiva+'?codigo='+psearch.codigo+'&descripcion='+psearch.descripcion, config);
	};

	response.deleteProgramActionGroupSLC = function (model, verb) {
		return  $http.delete(apiUrl+'api/ProgramasAccionesXGrupoSLC/'+verb+'/'+model.id, config);
	};

	response.putProgramActionGroupSLC = function (model) {
		return  $http.put(apiUrl+'api/ProgramasAccionesXGrupoSLC/'+model.id, model, config);
	};

	response.setProgramActionGroupSLC = function (model) {
		return  $http.post(apiUrl+'api/ProgramasAccionesXGrupoSLC/', model, config);
	};

	response.getProgramActionGroupSLCxId = function (pid) {
		return  $http.get(apiUrl+'api/ProgramasAccionesXGrupoSLC/'+pid, config);
	};
	
	response.getProgramActionGroupSLCxIdPrespectiva = function (pid, pprespectiva) {
		return  $http.get(apiUrl+'api/ProgramasAccionesXGrupoSLC/'+pid+'/perspectiva/'+pprespectiva, config);
	};


	return response;
}