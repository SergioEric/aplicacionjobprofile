// function onBodyLoad(){
	// document.addEventListener('deviceready"',isReady, false );

  // function isReady(){
  var ref = new Firebase("https://jobprofile.firebaseio.com/");
    var App = angular.module('myApp', ['ionic']);
// window.onload = function(){



    App.run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleLightContent();
        }
      });
    });

   App.config(function($stateProvider, $urlRouterProvider) {

      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $stateProvider

      // setup an abstract state for the tabs directive
        .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
      })

      // Each tab has its own nav history stack:

      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl'
          }
        }
      })

      .state('tab.chats', {
          url: '/chats',
          views: {
            'tab-chats': {
              templateUrl: 'templates/tab-chats.html',
              controller: 'ChatsCtrl'
            }
          }
        })
        .state('tab.chat-detail', {
          url: '/chats/:profileId',
          views: {
            'tab-chats': {
              templateUrl: 'templates/chat-detail.html',
              controller: 'ChatDetailCtrl'
            }
          }
        })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      })
      .state('tab.vision',{
        url: '/vision',
        views:{
          'tab-vision': {
            templateUrl: 'templates/vision.html',
            controller : 'VisionCtrl'
          }
        }
      })

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/tab/dash');

    }); //end Config

    /* Controllers */
    App.controller('ChatsCtrl', function($scope, $http) {
        // $scope.chats = Chats.all();
      $http.get('js/profiles.json').success(function(data){
        return $scope.profiles = data;
      }).error(function(status){
        alert(status)
      });
        $scope.remove = function(chat) {
          $scope.profiles.remove(chat);
        }
    });

    App.controller('ChatDetailCtrl', function($scope, $stateParams,$http) {
    $http.get('js/profiles.json').success(function(data){
        // $scope.chat = data
        for(var i = 0; i < data.length; i++){
          if (data[i].id === parseInt($stateParams.profileId)) {
            return $scope.chat = data[i];
          }
        };
        }).error(function(status){
            alert(status)
        });
        // $scope.chat = Chats.get($stateParams.chatId);


        $scope.doit = function(){
          ref.child('message').set({
            email: $scope.emailUser
            number : $scope.phoneUser,
            comment : $scope.CommentsUser
          });
          alert('Información Enviada con Exito')
        }
    });

    App.controller('AccountCtrl', function($scope) {
      $scope.settings = {
        enableFriends: true
      };
    });

    App.controller('VisionCtrl',  function($scope) {
        $scope.info = ['La vision es tal']
    });

      App.controller('DashCtrl',  function($scope, $http) {
        $http.get('js/profiles.json').success(function(data){
            $scope.profiles = data.length;
        }).error(function(status){
            alert(status)
        });
    });
  // }


// Create a connection to your Firebase database


// // Save data
// ref.set({ name: "Alex Wolfe" });

// // Listen for realtime changes
// ref.on("value", function(data) {
//   var name = data.val().name;
//   alert("My name is " + name);
// });