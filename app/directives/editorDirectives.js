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

            element[0].addEventListener("keydown", function(event){ 
                
                $scope.$apply(function(){
                    $scope.storeKeys(element,event);
                });
                

            });
            
            document.addEventListener("keydown", function(event){ 
                
                
                if(event.keyCode == 9){
                  
                    event.preventDefault();

                }

                
            });


        }
    }
});



app.directive('codeline', function() {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            
            
            //hljs.highlightBlock(element[0]);
            
           /* hljs.configure({useBR: true});
            
         */

        }
    }
});


