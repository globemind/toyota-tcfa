angular.module('mainapp').factory('ProgramActionService', ProgramActionService);
angular.module('mainapp').factory('ProgramService', ProgramService);
angular.module('mainapp').factory('ActionService', ActionService);

function ProgramsactionsCtrl ($scope, $window, $cookies, $location, $stateParams, $state, ProgramActionService, ProgramService, ActionService) {

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
  $scope.actionsCollection  = '';
  $scope.acctionsCollection = '';
  $scope.loading = false;
  $scope.cardEdit = '';
  $scope.searchModel = {
    codigo: '',
    descripcion: '',
  };
  $scope.newModel = {
    programSelected: '',
    actionSelected: '',
  };

  ProgramService.getPrograms()
    .then(function(response){
      if(response.status == 200){ $scope.programsCollection = response.data; }
    });

  ActionService.getActions()
    .then(function(response){
      if(response.status == 200){ $scope.actionsCollection = response.data; }
    });

  $scope.btnSearchPrograms = function(){
    if($scope.prespective == 'both'){
      if($scope.resultType == 'all'){
        ProgramActionService.getProgramsActionsTodos('T', 'pra001', $scope.searchModel)
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
        ProgramActionService.getProgramsActionsSLC( pcountType, 'pra001', $scope.searchModel)
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
      if($scope.prespective == 'acciones'){ prespectiva = "acciones"}
      if($scope.resultType == 'all'){
        ProgramActionService.getProgramsActionsTodosPrespectiva('T', 'pra001', $scope.searchModel, prespectiva)
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
        ProgramActionService.getProgramsActionsSLCPrespectiva( pcountType, 'pra001', $scope.searchModel, prespectiva)
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
          ProgramActionService.deleteProgramAction($scope.cardCollection[idx].perspectiva)
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
          ProgramActionService.deleteProgramActionSLC($scope.cardCollection[idx].perspectiva, 'eliminar')
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
          ProgramActionService.deleteProgramActionSLC($scope.cardCollection[idx].perspectiva, 'autorizar')
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
          ProgramActionService.deleteProgramActionSLC($scope.cardCollection[idx].perspectiva, 'desautorizar')
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
          ProgramActionService.deleteProgramActionSLC($scope.cardCollection[idx], 'autorizar')
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
          ProgramActionService.deleteProgramActionSLC($scope.cardCollection[idx], 'desautorizar')
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
          ProgramActionService.deleteProgramActionSLC($scope.cardCollection[idx], 'desautorizar')
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
      ProgramActionService.getProgramActionxId($scope.cardCollection[idx].perspectiva.id)
        .then(function(response){
          if(response.status >= 200 && response.status < 300 ){
            $scope.cardEdit = response.data;
            $scope.cardEdit.programSelected = {id: $scope.cardEdit.idAccPrograma};
            $scope.cardEdit.actionSelected = {id: $scope.cardEdit.idAccAccion};
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
        ProgramActionService.getProgramActionSLCxId($scope.cardCollection[idx].perspectiva.id)
          .then(function(response){
            if(response.status >= 200 && response.status < 300 ){
              $scope.cardEdit = response.data;
              $scope.cardEdit.programSelected = {id: $scope.cardEdit.idAccPrograma};
              $scope.cardEdit.actionSelected = {id: $scope.cardEdit.idAccAccion};
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
              $scope.relacionados = response.data.accProgramasAcciones;
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
      }else if($scope.prespective == 'acciones'){
        ActionService.getActionxId($scope.cardCollection[idx].perspectiva.id)
          .then(function(response){
            if(response.status >= 200 && response.status < 300 ){
              $scope.cardEdit = response.data;
              $scope.relacionados = response.data.accProgramasAcciones;
              $scope.actionSelected = action;
              $('#editPrespectiveActionModal').modal('show');
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
              $scope.relacionados = response.data.accProgramasAcciones;
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
      }else if($scope.prespective == 'acciones'){
        ActionService.getActionxId($scope.cardCollection[idx].perspectiva.id)
          .then(function(response){
            if(response.status >= 200 && response.status < 300 ){
              $scope.cardEdit = response.data;
              $scope.relacionados = response.data.accProgramasAcciones;
              $scope.actionSelected = action;
              $('#editPrespectiveActionModal').modal('show');
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
      ProgramActionService.putProgramAction($scope.cardEdit)
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
      ProgramActionService.putProgramActionSLC($scope.cardEdit)
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
    $state.go('app.configuration.programsactions', {
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
        idAccAccion: $scope.newModel.actionSelected.id,
      }
      ProgramActionService.setProgramActionSLC(model)
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
    if($scope.newModel.actionSelected == '' || angular.isUndefined($scope.newModel.actionSelected) || $scope.newModel.actionSelected == null) { rta = false;}

    return rta;
  }

}

angular.module('mainapp').controller('programsactionsCtrl', ProgramsactionsCtrl);

