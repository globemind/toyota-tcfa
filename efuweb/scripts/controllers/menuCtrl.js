
angular.module('mainapp').factory('UserService', UserService);

function MenuCtrl ($scope, $window, $cookies, $location, $rootScope, UserService) {


	$scope.menuitems = [
		{label: 'Home', icon: 'fa fa-th-large', link: 'app.home'},
		{label: 'Expedientes', icon: 'fa fa-th-large', link: 'app.expedientes'},
		{label: 'Solicitud de Reserva', icon: 'fa fa-th-large', link: 'app.reservas'},
		{label: 'Consultar Cuenta Corriente', icon: 'fa fa-th-large', link: 'app.ctacte'},
	];

	UserService.getMenu()
		.then(function(response){
			if(response.status == 200){	
				$scope.menuitems = response.data.panel_menu.padre.hijos;
			}
		})
		.catch(function (error) { 
			if(response.status == 400){ $scope.$emit('error404'); }
			else{
	            swal({
	              title: "ERROR",
	              text: error.data,
	              icon: "error",
	              // buttons: true,
	              dangerMode: true,
	            });
			}
		});
	
}

angular.module('mainapp').controller('menuCtrl', MenuCtrl);

