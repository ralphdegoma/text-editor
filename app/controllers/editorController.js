

function EditorController($scope,$state,$http,EditorServices) {

	//$scope.textList = EditorServices.textList;
	$scope.textList = [];
	$scope.textListCopy = [];
	$scope.enter = "{{enter}}";
	$scope.cursorTimeOut = "";
	$scope.cursorState = [];
	$scope.current_cursor = "";


	$scope.storeKeys = function(element,event){

	

		if(event.keyCode == 13){
            
            // /event.preventDefault();
            $scope.textList.push("");
        }

        

        var lists = document.getElementsByClassName('rows')[0].children;
		
		
		for(var i = 0; i < lists.length; i++){
			
			$scope.textList[i] = lists[i];
			
		}
		

		

	}




}

