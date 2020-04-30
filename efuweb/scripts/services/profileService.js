function ProfileService ($http, $location, $cookies) {

	var response = {};

	var config = {
		headers:  {'Authorization': $cookies.getObject('token')}
	};

	response.getPerfiles = function () {
		return  $http.get(apiUrl+'api/Perfiles/', config);
	};

	//TODOS
	response.getPerfilesTodos = function (porigen, pprograma, psearch) {
		return  $http.get(apiUrl+'api/Perfiles?origen='+porigen+'&programa='+pprograma+'&codigo='+psearch.codigo+'&descripcion='+psearch.descripcion, config);
	};

	response.deletePerfile = function (model) {
		return  $http.delete(apiUrl+'api/Perfiles/'+model.id, config);
	};
	
	response.putPerfile = function (model) {
		return  $http.put(apiUrl+'api/Perfiles/'+model.id, model, config);
	};

	//SLC
	response.getPerfilesSLC = function (porigen, pprograma, psearch) {
		return  $http.get(apiUrl+'api/PerfilesSLC?origen='+porigen+'&programa='+pprograma+'&codigo='+psearch.codigo+'&descripcion='+psearch.descripcion, config);
	};

	response.deletePerfileSLC = function (model, verb) {
		return  $http.delete(apiUrl+'api/PerfilesSLC/'+verb+'/'+model.id, config);
	};

	response.putPerfileSLC = function (model) {
		return  $http.put(apiUrl+'api/PerfilesSLC/'+model.id, model, config);
	};

	response.setPerfileSLC = function (model) {
		return  $http.post(apiUrl+'api/PerfilesSLC/', model, config);
	};


	return response;
}  