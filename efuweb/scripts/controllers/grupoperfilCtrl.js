angular.module('mainapp').factory('GroupPerfilService', GroupPerfilService);
angular.module('mainapp').factory('ProfileService', ProfileService);
angular.module('mainapp').factory('GroupService', GroupService);

function GrupoperfilCtrl ($scope, $window, $cookies, $location, $stateParams, $state, GroupPerfilService, ProfileService, GroupService) {
	
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
  $scope.profilesCollection  = '';
  $scope.groupsCollection  = '';
  $scope.acctionsCollection = '';
  $scope.loading = false;
  $scope.cardEdit = '';
  $scope.searchModel = {
    codigo: '',
    descripcion: '',
  };

  ProfileService.getPerfiles()
    .then(function(response){
      if(response.status == 200){ $scope.profilesCollection = response.data; }
    });

  GroupService.getGrupos()
    .then(function(response){
      if(response.status == 200){ $scope.groupsCollection = response.data; }
    });

  $scope.btnSearchGroups = function(){
    if($scope.prespective == 'both'){
      if($scope.resultType == 'all'){
        GroupPerfilService.getGruposTodos('T', 'gxp001', $scope.searchModel)
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
        GroupPerfilService.getGruposSLC( pcountType, 'gxp001', $scope.searchModel)
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
      var prespectiva = "perfiles";
      if($scope.prespective == 'grupos'){ prespectiva = "grupos"}
      if($scope.resultType == 'all'){
        GroupPerfilService.getGruposTodosPrespectiva('T', 'gxp001', $scope.searchModel, prespectiva)
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
        GroupPerfilService.getGruposSLCPrespectiva( pcountType, 'gxp001', $scope.searchModel, prespectiva)
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
          GroupPerfilService.deleteGrupo($scope.cardCollection[idx])
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
          GroupPerfilService.deleteGrupoSLC($scope.cardCollection[idx], 'eliminar')
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
          GroupPerfilService.deleteGrupoSLC($scope.cardCollection[idx], 'autorizar')
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
          GroupPerfilService.deleteGrupoSLC($scope.cardCollection[idx], 'desautorizar')
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
          GroupPerfilService.deleteGrupoSLC($scope.cardCollection[idx], 'autorizar')
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
          GroupPerfilService.deleteGrupoSLC($scope.cardCollection[idx], 'desautorizar')
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
          GroupPerfilService.deleteGrupoSLC($scope.cardCollection[idx], 'desautorizar')
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
    $scope.btnSearchGroups()
    $('#searchModal').modal('hide');
    $scope.searchModel = {
      codigo: '',
      descripcion: '',
    };
  }

  $scope.btnEditModal = function (idx, action){ 
    if($scope.resultType == 'all'){
      GroupPerfilService.getGrupoxPerfilxId($scope.cardCollection[idx].id)
        .then(function(response){
          if(response.status >= 200 && response.status < 300 ){
            $scope.cardEdit = response.data;
            $scope.cardEdit.profileSelected = {id: $scope.cardEdit.idAccPerfil};
            $scope.cardEdit.groupSelected = {id: $scope.cardEdit.idAccGrupo};
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
        GroupPerfilService.getGruposXPerfilSLCxId($scope.cardCollection[idx].id)
          .then(function(response){
            if(response.status >= 200 && response.status < 300 ){
              $scope.cardEdit = response.data;
              $scope.cardEdit.profileSelected = {id: $scope.cardEdit.idAccPerfil};
              $scope.cardEdit.groupSelected = {id: $scope.cardEdit.idAccGrupo};
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
      GroupPerfilService.getGrupoxPerfilxIdPrespectiva($scope.cardCollection[idx].perspectiva.id, $scope.prespective)
        .then(function(response){
          if(response.status >= 200 && response.status < 300 ){
            $scope.cardEdit = response.data;
            $scope.actionSelected = action;
            $('#editPrespectiveModal').modal('show'); 
          }else{
            swal({
              title: "Atencion",
              text: response.statusText,
              icon: "warning",
              buttons: true,
              // dangerMode: true,
            })
          }
        })/*
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
        });*/
      }else{
        GroupPerfilService.getGruposXPerfilSLCxIdPrespectiva($scope.cardCollection[idx].perspectiva.id, $scope.prespective)
          .then(function(response){
            if(response.status >= 200 && response.status < 300 ){
              $scope.cardEdit = response.data;
              $scope.cardEdit.profileSelected = {id: $scope.cardEdit.idAccPerfil};
              $scope.actionSelected = action;
              $('#editPrespectiveModal').modal('show'); 
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

  $scope.btnConfirmEdit = function (action){ 
    if(action == 2){
      GroupPerfilService.putGrupo($scope.cardEdit)
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
      GroupPerfilService.putGrupoSLC($scope.cardEdit)
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
    $state.go('app.configuration.grupoperfil', {
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
      GroupPerfilService.setGrupoSLC($scope.newModel)
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

  $scope.btnSearchGroups();

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

    if($scope.newModel.codigo == '' || angular.isUndefined($scope.newModel.codigo) || $scope.newModel.codigo == null) { rta = false;}
    if($scope.newModel.descripcion == '' || angular.isUndefined($scope.newModel.descripcion) || $scope.newModel.descripcion == null) { rta = false;}

    return rta;
  }

}

angular.module('mainapp').controller('grupoperfilCtrl', GrupoperfilCtrl);

