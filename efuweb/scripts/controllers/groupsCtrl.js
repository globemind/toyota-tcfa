angular.module('mainapp').factory('GroupService', GroupService);

function GroupsCtrl ($scope, $window, $cookies, $location, GroupService) {
	
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
 	$scope.cardCollection = [];
  $scope.cardEdit = '';


  GroupService.getGrupos()
      .then(function(response){
        if(response.status == 200){
          $scope.cardCollection = response.data;
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


  $scope.btnRemoveCard = function(idx){ 
  	swal({
      title: "Ud. esta seguro?",
      text: "Una vez eliminada no se podra recuperar la informacion!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  }

  $scope.btnSearchModal = function (){ $('#searchModal').modal('show'); }
  $scope.btnConfirmSearch = function (){ $('#searchModal').modal('hide'); }

  $scope.btnEditModal = function (idx){ 
    // selectedIdx = idx;
    $scope.cardEdit = angular.copy($scope.cardCollection[idx]);
    $('#editModal').modal('show'); 
  }

  $scope.btnConfirmEdit = function (){ 
    GroupService.putGrupo($scope.cardEdit)
      .then(function(response){
        if(response.status == 200){
          $('#editModal').modal('hide'); 
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

angular.module('mainapp').controller('groupsCtrl', GroupsCtrl);

