var BASE_URL = 'http://localhost/V2.9.0/';//wired connection IP
var FRONT_END_DEVELOPMENT = false;


var app = angular.module('app.EditorDirectives', [])

app.directive('editor', function() {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            
            element[0].addEventListener("click", function(){ 
          
                console.log("mouseup")

                for(var i = 0; i < element[0].children.length; i ++){
                    element[0].children[i].setAttribute("contenteditable", "true");
                }

            });

            element[0].addEventListener("keypress", function(event){ 
                $scope.storeKeys(element,event);
            });
            
        

        }
    }
});



app.directive('linecode', function() {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            
            element[0].addEventListener("keypress", function(event){ 
                console.log("sdd")
                $scope.storeKeys(element,event);
                
            });

        }
    }
});