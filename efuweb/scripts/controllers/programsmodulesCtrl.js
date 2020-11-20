angular.module('mainapp').factory('ProgramModuleService', ProgramModuleService);
angular.module('mainapp').factory('ProgramService', ProgramService);
angular.module('mainapp').factory('ModuloService', ModuloService);

function ProgramsmodulesCtrl ($scope, $window, $cookies, $location, $stateParams, $state, ProgramModuleService, ProgramService, ModuloService) {

  if(angular.isUndefined($cookies.getObject('name')) ||
    angular.isUndefined($cookies.getObject('uid')) ||
    angular.isUndefined($cookies.getObject('token') )
    ){
    $scope.$emit('logout');
  }

  var vCard = {
  	title: ''
  }
  var selectedIdx = '';
  $scope.resultType = $stateParams.param;
  $scope.prespective = $stateParams.prespective;
 	$scope.cardCollection = [];
  $scope.programsCollection  = '';
  $scope.modulesCollection  = '';
  $scope.acctionsCollection = '';
  $scope.loading = false;
  $scope.cardEdit = '';
  $scope.searchModel = {
    codigo: '',
    descripcion: '',
  };
  $scope.newModel = {
    programSelected: '',
    moduleSelected: '',
  };

  ProgramService.getPrograms()
    .then(function(response){
      if(response.status == 200){ $scope.programsCollection = response.data; }
    });

  ModuloService.getModulos()
    .then(function(response){
      if(response.status == 200){ $scope.modulesCollection = response.data; }
    });

  $scope.btnSearchPrograms = function(){
    if($scope.prespective == 'both'){
      if($scope.resultType == 'all'){
        ProgramModuleService.getProgramsModulesTodos('T', 'pxm001', $scope.searchModel)
          .then(function(response){
            if(response.status == 200){
              $scope.cardCollection = response.data.datos;
              $scope.acctionsCollection = setActions (response.data.acciones);
            }
          })
        .catch(function (error) {
          if(error.status == 400){ $scope.$emit('error404'); }
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
      }else{
        var pcountType = "A";
        if($stateParams.param == 'pend'){ pcountType = "P"; }
        ProgramModuleService.getProgramsModulesSLC( pcountType, 'pxm001', $scope.searchModel)
          .then(function(response){
            if(response.status == 200){
              $scope.cardCollection = response.data.datos;
              $scope.acctionsCollection = setActions (response.data.acciones);
            }
          })
        .catch(function (error) {
          if(error.status == 400){ $scope.$emit('error404'); }
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
    }else{
      var prespectiva = "programas";
      if($scope.prespective == 'modulos'){ prespectiva = "modulos"}
      if($scope.resultType == 'all'){
        ProgramModuleService.getProgramsModulesTodosPrespectiva('T', 'pxm001', $scope.searchModel, prespectiva)
          .then(function(response){
            if(response.status == 200){
              $scope.cardCollection = response.data.datos;
              $scope.acctionsCollection = setActions (response.data.acciones);
            }
          })
        .catch(function (error) {
          if(error.status == 400){ $scope.$emit('error404'); }
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
      }else{
        var pcountType = "A";
        if($stateParams.param == 'pend'){ pcountType = "P"; }
        ProgramModuleService.getProgramsModulesSLCPrespectiva( pcountType, 'pxm001', $scope.searchModel, prespectiva)
          .then(function(response){
            if(response.status == 200){
              $scope.cardCollection = response.data.datos;
              $scope.acctionsCollection = setActions (response.data.acciones);
            }
          })
        .catch(function (error) {
          if(error.status == 400){ $scope.$emit('error404'); }
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

    }
  }

// _____________________

  $scope.btnRemoveCard = function(idx, action){
  	swal({
      title: "Ud. esta seguro?",
      text: "Una vez eliminada no se podra recuperar la informacion!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) { // DELETE
        if(action == 3){
          ProgramModuleService.deleteProgramModule($scope.cardCollection[idx].perspectiva)
            .then(function(response){
              if(response.status != 200){
                swal({
                  title: "Atencion",
                  text: response.statusText,
                  icon: "warning",
                  buttons: true,
                  // dangerMode: true,
                })
              }else{$window.location.reload();}
            })
            .catch(function (error) {
              if(error.status == 400){ $scope.$emit('error404'); }
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
        }else if(action == 5){
          ProgramModuleService.deleteProgramModuleSLC($scope.cardCollection[idx].perspectiva, 'eliminar')
            .then(function(response){
              if(response.status != 200){
                swal({
                  title: "Atencion",
                  text: response.statusText,
                  icon: "warning",
                  buttons: true,
                  // dangerMode: true,
                })
              }else{$window.location.reload();}
            })
            .catch(function (error) {
              if(error.status == 400){ $scope.$emit('error404'); }
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
        }else if(action == 6){
          ProgramModuleService.deleteProgramModuleSLC($scope.cardCollection[idx].perspectiva, 'autorizar')
            .then(function(response){
              if(response.status != 200){
                swal({
                  title: "Atencion",
                  text: response.statusText,
                  icon: "warning",
                  buttons: true,
                  // dangerMode: true,
                })
              }else{$window.location.reload();}
            })
            .catch(function (error) {
              if(error.status == 400){ $scope.$emit('error404'); }
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
        }else if(action == 7){
          ProgramModuleService.deleteProgramModuleSLC($scope.cardCollection[idx].perspectiva, 'desautorizar')
            .then(function(response){
              if(response.status != 200){
                swal({
                  title: "Atencion",
                  text: response.statusText,
                  icon: "warning",
                  buttons: true,
                  // dangerMode: true,
                })
              }else{$window.location.reload();}
            })
            .catch(function (error) {
              if(error.status == 400){ $scope.$emit('error404'); }
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
      } /*else {
        swal("Your imaginary file is safe!");
      }*/
    });
  }

  $scope.btnAuthCard = function(idx, action){
    swal({
      title: "¿Esta seguro de autorizar esta modificación?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) { // DELETE
        if(action == 6){
          ProgramModuleService.deleteProgramModuleSLC($scope.cardCollection[idx], 'autorizar')
            .then(function(response){
              if(response.status != 200){
                swal({
                  title: "Atencion",
                  text: response.statusText,
                  icon: "warning",
                  buttons: true,
                  // dangerMode: true,
                })
              }else{$window.location.reload();}
            })
            .catch(function (error) {
              if(error.status == 400){ $scope.$emit('error404'); }
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
        }else if(action == 7){
          ProgramModuleService.deleteProgramModuleSLC($scope.cardCollection[idx], 'desautorizar')
            .then(function(response){
              if(response.status != 200){
                swal({
                  title: "Atencion",
                  text: response.statusText,
                  icon: "warning",
                  buttons: true,
                  // dangerMode: true,
                })
              }else{$window.location.reload();}
            })
            .catch(function (error) {
              if(error.status == 400){ $scope.$emit('error404'); }
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
      } /*else {
        swal("Your imaginary file is safe!");
      }*/
    });
  }

  $scope.btnDesAuthCard = function(idx, action){
    swal({
      title: "¿Esta seguro de desautorizar esta modificación?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) { // DELETE
        if(action == 7){
          ProgramModuleService.deleteProgramModuleSLC($scope.cardCollection[idx], 'desautorizar')
            .then(function(response){
              if(response.status != 200){
                swal({
                  title: "Atencion",
                  text: response.statusText,
                  icon: "warning",
                  buttons: true,
                  // dangerMode: true,
                })
              }else{$window.location.reload();}
            })
            .catch(function (error) {
              if(error.status == 400){ $scope.$emit('error404'); }
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
      } /*else {
        swal("Your imaginary file is safe!");
      }*/
    });
  }

  $scope.btnSearchModal = function (){ $('#searchModal').modal('show'); }

  $scope.btnConfirmSearch = function (){
    $scope.btnSearchPrograms()
    $('#searchModal').modal('hide');
    $scope.searchModel = {
      codigo: '',
      descripcion: '',
    };
  }

  $scope.btnEditModal = function (idx, action){
    if($scope.resultType == 'all'){
      ProgramModuleService.getProgramModulexId($scope.cardCollection[idx].perspectiva.id)
        .then(function(response){
          if(response.status >= 200 && response.status < 300 ){
            $scope.cardEdit = response.data;
            $scope.cardEdit.programSelected = {id: $scope.cardEdit.idAccPrograma};
            $scope.cardEdit.moduleSelected = {id: $scope.cardEdit.idAccModulo};
            $scope.actionSelected = action;
            $('#editModal').modal('show');
          }else{
            swal({
              title: "Atencion",
              text: response.statusText,
              icon: "warning",
              buttons: true,
              // dangerMode: true,
            })
          }
        })
        .catch(function (error) {
          if(error.status == 400){ $scope.$emit('error404'); }
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
    }else{
        ProgramModuleService.getProgramModuleSLCxId($scope.cardCollection[idx].perspectiva.id)
          .then(function(response){
            if(response.status >= 200 && response.status < 300 ){
              $scope.cardEdit = response.data;
              $scope.cardEdit.programSelected = {id: $scope.cardEdit.idAccPrograma};
              $scope.cardEdit.moduleSelected = {id: $scope.cardEdit.idAccModulo};
              $scope.actionSelected = action;
              $('#editModal').modal('show');
            }else{
              swal({
                title: "Atencion",
                text: response.statusText,
                icon: "warning",
                buttons: true,
                // dangerMode: true,
              })
            }
          })
          .catch(function (error) {
            if(error.status == 400){ $scope.$emit('error404'); }
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
  }

  $scope.btnEditPrespectiveModal = function (idx, action){
    if($scope.resultType == 'all'){
      if($scope.prespective == 'programas'){
         ProgramService.getProgram($scope.cardCollection[idx].perspectiva.id)
          .then(function(response){
            if(response.status >= 200 && response.status < 300 ){
              $scope.cardEdit = response.data;
              $scope.relacionados = response.data.accProgramasXModulos;
              $scope.actionSelected = action;
              $('#editPrespectiveProgramaModal').modal('show');
            }else{
              swal({
                title: "Atencion",
                text: response.statusText,
                icon: "warning",
                buttons: true,
                // dangerMode: true,
              })
            }
          })
          .catch(function (error) {
            if(error.status == 400){ $scope.$emit('error404'); }
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
      }else if($scope.prespective == 'modulos'){
        ModuloService.getModulo($scope.cardCollection[idx].perspectiva.id)
          .then(function(response){
            if(response.status >= 200 && response.status < 300 ){
              $scope.cardEdit = response.data;
              $scope.relacionados = response.data.accProgramasXModulos;
              $scope.actionSelected = action;
              $('#editPrespectiveModuleModal').modal('show');
            }else{
              swal({
                title: "Atencion",
                text: response.statusText,
                icon: "warning",
                buttons: true,
                // dangerMode: true,
              })
            }
          })
          .catch(function (error) {
            if(error.status == 400){ $scope.$emit('error404'); }
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
    }else{
      if($scope.prespective == 'programas'){
        ProgramService.getProgram($scope.cardCollection[idx].perspectiva.id)
          .then(function(response){
            if(response.status >= 200 && response.status < 300 ){
              $scope.cardEdit = response.data;
              $scope.relacionados = response.data.accProgramasXModulos;
              $scope.actionSelected = action;
              $('#editPrespectiveProgramaModal').modal('show');
            }else{
              swal({
                title: "Atencion",
                text: response.statusText,
                icon: "warning",
                buttons: true,
                // dangerMode: true,
              })
            }
          })
          .catch(function (error) {
            if(error.status == 400){ $scope.$emit('error404'); }
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
      }else if($scope.prespective == 'modulos'){
        ModuloService.getModulo($scope.cardCollection[idx].perspectiva.id)
          .then(function(response){
            if(response.status >= 200 && response.status < 300 ){
              $scope.cardEdit = response.data;
              $scope.relacionados = response.data.accProgramasXModulos;
              $scope.actionSelected = action;
              $('#editPrespectiveModuleModal').modal('show');
            }else{
              swal({
                title: "Atencion",
                text: response.statusText,
                icon: "warning",
                buttons: true,
                // dangerMode: true,
              })
            }
          })
          .catch(function (error) {
            if(error.status == 400){ $scope.$emit('error404'); }
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
    }
  }

  $scope.btnConfirmEdit = function (action){
    if(action == 2){
      ProgramModuleService.putProgramModule($scope.cardEdit)
        .then(function(response){
          if(response.status >= 200 && response.status < 300 ){
            $window.location.reload();
            $('#editModal').modal('hide');
          }else{
            swal({
              title: "Atencion",
              text: response.statusText,
              icon: "warning",
              buttons: true,
              // dangerMode: true,
            })
          }
        })
        .catch(function (error) {
          if(error.status == 400){ $scope.$emit('error404'); }
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
    }else if(action == 4){
      ProgramModuleService.putProgramModuleSLC($scope.cardEdit)
        .then(function(response){
          if(response.status >= 200 && response.status < 300 ){
            $window.location.reload();
            $('#editModal').modal('hide');
          }else{
            swal({
              title: "Atencion",
              text: response.statusText,
              icon: "warning",
              buttons: true,
              // dangerMode: true,
            })
          }
        })
        .catch(function (error) {
          if(error.status == 400){ $scope.$emit('error404'); }
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
  }

  $scope.btnFilterActions = function (pparam){
    $state.go('app.configuration.programsmodules', {
        param: pparam,
        prespective: $scope.prespective
    });
  }

  $scope.btnPrespective = function (pprespective){
    $scope.prespective = pprespective;
    $scope.btnFilterActions('all');
  }

  $scope.btnAddCardModal = function (){
    $scope.newModel = {
      descripcion: '',
      codigo: '',
    }
    $scope.loading = false;
    $('#newModal').modal('show');

  }

  $scope.btnConfirmNew = function (){
    if(validateNewForm()){
      $scope.loading = true;
      var model = {
        idAccPrograma: $scope.newModel.programSelected.id,
        idAccModulo: $scope.newModel.moduleSelected.id,
      }
      ProgramModuleService.setProgramModuleSLC(model)
        .then(function(response){
          if(response.status >= 200 && response.status < 300 ){
            $scope.loading = false;
            $window.location.reload();
            $('#newModal').modal('hide');
          }else{
            swal({
              title: "Atencion",
              text: response.statusText,
              icon: "warning",
              buttons: true,
            })
          }
        })
        .catch(function (error) {
          if(error.status == 400){ $scope.$emit('error404'); }
          else{
              swal({
                title: "ERROR",
                text: error.data,
                icon: "error",
                dangerMode: true,
              });
          }
        });
    }else{
      swal({
        title: "ERROR",
        text: 'Debe completar todos los campos!',
        icon: "error",
        dangerMode: true,
      });
    }
  }

  $scope.btnSearchPrograms();

  function setActions (collection){
    var actionArr = {
      alta : false,
      modificacion : false,
      baja : false,
      consulta : false,
      aprobacion : false,
      desaprobacion : false,
      autorizacion : false,
      desautorizacion : false,
      selected: ''
    };

    angular.forEach(collection, function(value, key){
      if(value.id == 1){ actionArr.alta = true; }
      if(value.id == 2){ actionArr.modificacion = true; }
      if(value.id == 3){ actionArr.baja = true; }
      if(value.id == 4){ actionArr.modificacion_pend = true; }
      if(value.id == 5){ actionArr.baja_pend = true; }
      if(value.id == 6){ actionArr.autorizacion = true; }
      if(value.id == 7){ actionArr.desautorizacion = true; }
      if(value.id == 8){ actionArr.consulta = true; }
    })

    return actionArr;
  }

  function validateNewForm (){
    var rta = true;

    if($scope.newModel.programSelected == '' || angular.isUndefined($scope.newModel.programSelected) || $scope.newModel.programSelected == null) { rta = false;}
    if($scope.newModel.moduleSelected == '' || angular.isUndefined($scope.newModel.moduleSelected) || $scope.newModel.moduleSelected == null) { rta = false;}

    return rta;
  }

}

angular.module('mainapp').controller('programsmodulesCtrl', ProgramsmodulesCtrl);

