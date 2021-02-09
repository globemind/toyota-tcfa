angular.module('mainapp').factory('HomeService', HomeService);

function HomeCtrl($scope, $window, $cookies, $location, $stateParams, $state, HomeService) {

    if (angular.isUndefined($cookies.getObject('name')) ||
        angular.isUndefined($cookies.getObject('uid')) ||
        angular.isUndefined($cookies.getObject('token'))
    ) {
        $scope.$emit('logout');
    }

    $scope.cardCollection = [];
    $scope.listType = $stateParams.param;
    $scope.addProgram = '';

    HomeService.getCartasProgramas()
        .then(function(response) {
            if (response.status == 200) {
                $scope.programsCollection = response.data;
                $scope.addProgram = response.data[0];
            }
        });


    HomeService.getPrograms($scope.listType)
        .then(function(response) {
            if (response.status == 200) { $scope.cardCollection = response.data; }
        })
        .catch(function(error) {
            if (error.status == 404) { $scope.$emit('error404'); } else {
                swal({
                    title: "ERROR",
                    text: error.data,
                    icon: "error",
                    // buttons: true,
                    dangerMode: true,
                });
            }
        });

    $scope.btnCountActions = function(pprogram, pparam, id) {
        HomeService.setProgramasRecientes(id);
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
        } else if (pprogram == 'sga001') {
            $state.go('app.insurance.allianzPortfolio', { param: pparam });
        } else if (pprogram == 'sga002') {
            $state.go('app.insurance.allianzCommission', { param: pparam });
        } else if (pprogram == 'sga003') {
            $state.go('app.insurance.triumphNews', { param: pparam });
        } else if (pprogram == 'sga004') {
            $state.go('app.insurance.cajaCartera', { param: pparam });
        } else if (pprogram == 'gxp001') {
            $state.go('app.configuration.grupoperfil', { param: pparam, prespective: 'both' });
        }

        // $state.go('app.configuration.groups', {
        //       param: pparam
        //   });
    }

    $scope.btnAddCardModal = function() { $('#addCardModal').modal('show'); }

    $scope.btnAddCard = function() {
        if (!angular.isUndefined($scope.addProgram) && $scope.addProgram != '') {
            HomeService.setProgramasFavoritos($scope.addProgram.id)
                .then(function(response) {
                    if (response.status == 201) {
                        $window.location.reload();
                        $('#addCardModal').modal('hide');
                    }
                })
                .catch(function(error) {
                    if (error.status == 404) { $scope.$emit('error404'); } else {
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
    }

    $scope.btnRemoveCard = function(idx) {
        if ($stateParams.param == 'favoritos') {
            swal({
                    title: "Ud. esta seguro?",
                    text: "Una vez eliminada no se podra recuperar la informacion!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) { // DELETE

                        HomeService.deleteProgramasRecientes($scope.cardCollection[idx].codigo)
                            .then(function(response) {
                                if (response.status == 200) { $scope.cardCollection.splice(idx, 1); }
                            })
                            .catch(function(error) {
                                if (error.status == 404) { $scope.$emit('error404'); } else {
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
                });
        }
    }

}

angular.module('mainapp').controller('homeCtrl', HomeCtrl);