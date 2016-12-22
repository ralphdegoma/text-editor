//var BASE_URL = 'http://localhost/v2.9/clientIntake/';


var app = angular.module('textEditor', ['ui.router','app.EditorDirectives']);

app.config(RouteConfig);

app.factory('EditorServices', EditorServices);

app.controller('EditorController', ['$scope', '$state', '$http', 'EditorServices', EditorController]);
