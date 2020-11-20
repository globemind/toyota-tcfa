function ProgramModuleService ($http, $location, $cookies) {

	var response = {};

	var config = {
		headers:  {'Authorization': $cookies.getObject('token')}
	};

	response.getProgramsModules = function () {
		return  $http.get(apiUrl+'api/ProgramasXModulos/', config);
	};

	//TODOS
	response.getProgramsModulesTodos = function (porigen, pprograma, psearch) {
		return  $http.get(apiUrl+'api/ProgramasXModulos/Origen/'+porigen+'/Programa/'+pprograma+'?codigo='+psearch.codigo+'&descripcion='+psearch.descripcion, config);
	};

	response.getProgramsModulesTodosPrespectiva = function (porigen, pprograma, psearch, pprespectiva) {
		return  $http.get(apiUrl+'api/ProgramasXModulos/Origen/'+porigen+'/Programa/'+pprograma+'/perspectiva/'+pprespectiva+'?codigo='+psearch.codigo+'&descripcion='+psearch.descripcion, config);
	};

	response.deleteProgramModule = function (model) {
		return  $http.delete(apiUrl+'api/ProgramasXModulos/'+model.id, config);
	};
	
	response.putProgramModule = function (model) {
		return  $http.put(apiUrl+'api/ProgramasXModulos/'+model.id, model, config);
	};
	
	response.getProgramModulexId = function (pid) {
		return  $http.get(apiUrl+'api/ProgramasXModulos/'+pid, config);
	};
	
	response.getProgramModulexIdPrespectiva = function (pid, pprespectiva) {
		return  $http.get(apiUrl+'api/ProgramasXModulos/'+pid, config);
	};

	//SLC
	response.getProgramsModulesSLC = function (porigen, pprograma, psearch) {
		return  $http.get(apiUrl+'api/ProgramasXModulosSLC/Origen/'+porigen+'/Programa/'+pprograma+'?codigo='+psearch.codigo+'&descripcion='+psearch.descripcion, config);
	};

	response.getProgramsModulesSLCPrespectiva = function (porigen, pprograma, psearch, pprespectiva) {
		return  $http.get(apiUrl+'api/ProgramasXModulosSLC/Origen/'+porigen+'/Programa/'+pprograma+'/perspectiva/'+pprespectiva+'?codigo='+psearch.codigo+'&descripcion='+psearch.descripcion, config);
	};

	response.deleteProgramModuleSLC = function (model, verb) {
		return  $http.delete(apiUrl+'api/ProgramasXModulosSLC/'+verb+'/'+model.perspectiva.id, config);
	};

	response.putProgramModuleSLC = function (model) {
		return  $http.put(apiUrl+'api/ProgramasXModulosSLC/'+model.id, model, config);
	};

	response.setProgramModuleSLC = function (model) {
		return  $http.post(apiUrl+'api/ProgramasXModulosSLC/', model, config);
	};

	response.getProgramModuleSLCxId = function (pid) {
		return  $http.get(apiUrl+'api/ProgramasXModulosSLC/'+pid, config);
	};
	
	response.getProgramModuleSLCxIdPrespectiva = function (pid, pprespectiva) {
		return  $http.get(apiUrl+'api/ProgramasXModulosSLC/'+pid+'/perspectiva/'+pprespectiva, config);
	};


	return response;
}