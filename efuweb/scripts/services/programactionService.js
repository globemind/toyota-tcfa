function ProgramActionService ($http, $location, $cookies) {

	var response = {};

	var config = {
		headers:  {'Authorization': $cookies.getObject('token')}
	};

	response.getProgramsActions = function () {
		return  $http.get(apiUrl+'api/ProgramasAcciones/', config);
	};

	//TODOS
	response.getProgramsActionsTodos = function (porigen, pprograma, psearch) {
		return  $http.get(apiUrl+'api/ProgramasAcciones/Origen/'+porigen+'/Programa/'+pprograma+'?codigo='+psearch.codigo+'&descripcion='+psearch.descripcion, config);
	};

	response.getProgramsActionsTodosPrespectiva = function (porigen, pprograma, psearch, pprespectiva) {
		return  $http.get(apiUrl+'api/ProgramasAcciones/Origen/'+porigen+'/Programa/'+pprograma+'/perspectiva/'+pprespectiva+'?codigo='+psearch.codigo+'&descripcion='+psearch.descripcion, config);
	};

	response.deleteProgramAction = function (model) {
		return  $http.delete(apiUrl+'api/ProgramasAcciones/'+model.id, config);
	};
	
	response.putProgramAction = function (model) {
		return  $http.put(apiUrl+'api/ProgramasAcciones/'+model.id, model, config);
	};
	
	response.getProgramActionxId = function (pid) {
		return  $http.get(apiUrl+'api/ProgramasAcciones/'+pid, config);
	};
	
	response.getProgramActionxIdPrespectiva = function (pid, pprespectiva) {
		return  $http.get(apiUrl+'api/ProgramasAcciones/'+pid, config);
	};

	//SLC
	response.getProgramsActionsSLC = function (porigen, pprograma, psearch) {
		return  $http.get(apiUrl+'api/ProgramasAccionesSLC/Origen/'+porigen+'/Programa/'+pprograma+'?codigo='+psearch.codigo+'&descripcion='+psearch.descripcion, config);
	};

	response.getProgramsActionsSLCPrespectiva = function (porigen, pprograma, psearch, pprespectiva) {
		return  $http.get(apiUrl+'api/ProgramasAccionesSLC/Origen/'+porigen+'/Programa/'+pprograma+'/perspectiva/'+pprespectiva+'?codigo='+psearch.codigo+'&descripcion='+psearch.descripcion, config);
	};

	response.deleteProgramActionSLC = function (model, verb) {
		console.log("model", model);
		console.log("verb", verb);
		return  $http.delete(apiUrl+'api/ProgramasAccionesSLC/'+verb+'/'+model.perspectiva.id, config);
	};

	response.putProgramActionSLC = function (model) {
		return  $http.put(apiUrl+'api/ProgramasAccionesSLC/'+model.id, model, config);
	};

	response.setProgramActionSLC = function (model) {
		return  $http.post(apiUrl+'api/ProgramasAccionesSLC/', model, config);
	};

	response.getProgramActionSLCxId = function (pid) {
		return  $http.get(apiUrl+'api/ProgramasAccionesSLC/'+pid, config);
	};
	
	response.getProgramActionSLCxIdPrespectiva = function (pid, pprespectiva) {
		return  $http.get(apiUrl+'api/ProgramasAccionesSLC/'+pid+'/perspectiva/'+pprespectiva, config);
	};


	return response;
}