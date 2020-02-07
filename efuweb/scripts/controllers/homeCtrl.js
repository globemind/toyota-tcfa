
angular.module('mainapp').factory('HomeService', HomeService);

function HomeCtrl ($scope, $window, $cookies, $location, $stateParams, $state, HomeService) {
	
  if(angular.isUndefined($cookies.getObject('name')) || 
    angular.isUndefined($cookies.getObject('uid')) || 
    angular.isUndefined($cookies.getObject('token') ) 
    ){
    $scope.$emit('logout');
  }

  var vCard = {
  	title: ''
  }

 	$scope.cardCollection = [];
  $scope.listType = $stateParams.param;

  HomeService.getPrograms($scope.listType)
    .then(function(response){
      if(response.status == 200){
        $scope.cardCollection = response.data;
      }
    })
  .catch(function (error) { 
    if(error.status == 404){ $scope.$emit('error404'); }
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

  $scope.btnCountActions = function (pprogram, pparam){
    $state.go('app.programs', {
        program: pprogram,
        param: pparam
    });
  }

  $scope.btnAddCardModal = function(){ $('#addCardModal').modal('show'); }

  $scope.btnAddCard = function(){ 
  	$scope.cardCollection.push(angular.copy(vCard));
  	$('#addCardModal').modal('hide'); 
  }

  $scope.btnRemoveCard = function(idx){ 
  	$scope.cardCollection.splice(idx, 1); 
  	
  }

}

angular.module('mainapp').controller('homeCtrl', HomeCtrl);

