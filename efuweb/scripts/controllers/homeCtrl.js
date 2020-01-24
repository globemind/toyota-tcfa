
function HomeCtrl ($scope, $window, $cookies, $location) {
	
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

