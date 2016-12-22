

function RouteConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        

        

        .state('editor', {
            url: '/editor',
            templateUrl: 'app/routes/templates/editor.html',
            controller: 'EditorController',
        
        })


        .state('welcome', {
            url: '/welcome',
            templateUrl: 'app/routes/templates/welcome.html',
            controller: 'EditorController',
        });

        $locationProvider.hashPrefix('');
      

    /*
    	Uploader
    */


    $urlRouterProvider.otherwise('/welcome');
    // $locationProvider.html5Mode(true);
}
