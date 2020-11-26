angular.module('mainapp').factory('UserService', UserService);

function MenuCtrl($scope, $window, $cookies, $location, $rootScope, $state, UserService) {

    UserService.getMenu()
        .then(function (response) {
            if (response.status == 200) {
                $scope.menuitems = response.data.modulos;
            }
        })
        .catch(function (error) {
            if (response.status == 400) { $scope.$emit('error404'); } else {
                swal({
                    title: "ERROR",
                    text: error.data,
                    icon: "error",
                    // buttons: true,
                    dangerMode: true,
                });
            }
        });

    $scope.btnMenuAction = function (pprogram, pparam, id) {
        UserService.setProgramasRecientes(id);
        if (pprogram == 'grp001') {
            $state.go('app.configuration.groups', { param: pparam });
        } else if (pprogram == 'prf001') {
            $state.go('app.configuration.profiles', { param: pparam });
        } else if (pprogram == 'mdl001') {
            $state.go('app.configuration.modules', { param: pparam });
        } else if (pprogram == 'pgr001') {
            $state.go('app.configuration.programs', { param: pparam });
        } else if (pprogram == 'usr001') {
            $state.go('app.configuration.users', { param: pparam });
        } else if (pprogram == 'gxp001') {
            $state.go('app.configuration.grupoperfil', { param: pparam, prespective: 'both' });
        } else if (pprogram == 'pra001') {
            $state.go('app.configuration.programsactions', { param: pparam, prespective: 'both' });
        } else if (pprogram == 'pag001') {
            $state.go('app.configuration.programsactionsgroups', { param: pparam, prespective: 'both' });
        } else if (pprogram == 'pxm001') {
            $state.go('app.configuration.programsmodules', { param: pparam, prespective: 'both' });
        } else if (pprogram == 'sga001') {
            $state.go('app.insurance.allianzPortfolio', { param: pparam });
        } else if (pprogram == 'sga002') {
            $state.go('app.insurance.allianzCommission', { param: pparam });
        } else if (pprogram == 'sga003') {
            $state.go('app.insurance.triumphNews', { param: pparam });
        }
    }

}

angular.module('mainapp').controller('menuCtrl', MenuCtrl);