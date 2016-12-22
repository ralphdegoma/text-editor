

function EditorController($scope,$state,$http,EditorServices) {

	//$scope.textList = EditorServices.textList;
	$scope.textList = [];
	$scope.textListCopy = [];
	$scope.enter = "{{enter}}";
	$scope.cursorTimeOut = "";
	$scope.cursorState = [];
	$scope.current_cursor = "";


	$scope.storeKeys = function(element,event){

		var lists = element[0].children[0].children;
		$scope.textListCopy = lists;
		$scope.$apply();
	}




}


