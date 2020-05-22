
angular.module('mainapp').factory('UserService', UserService);

function MenuCtrl ($scope, $window, $cookies, $location, $rootScope, $state, UserService) {

	UserService.getMenu()
		.then(function(response){
			if(response.status == 200){	
				$scope.menuitems = response.data.modulos;
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

	$scope.btnMenuAction = function (pprogram, pparam, id){

		UserService.setProgramasRecientes(id);
		if(pprogram == 'grp001'){
			$state.go('app.configuration.groups', { param: pparam });
		}else if(pprogram == 'prf001'){
			$state.go('app.configuration.profiles', { param: pparam });
		}else if(pprogram == 'mdl001'){
			$state.go('app.configuration.modules', { param: pparam });
		}else if(pprogram == 'pgr001'){
			$state.go('app.configuration.programs', { param: pparam });
		}else if(pprogram == 'usr001'){
			$state.go('app.configuration.users', { param: pparam });
		}else if(pprogram == 'gxp001'){
			$state.go('app.configuration.grupoperfil', { param: pparam, prespective: 'both' });
		}
		
	}
	
}

angular.module('mainapp').controller('menuCtrl', MenuCtrl);

