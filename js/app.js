angular
.module('wanderfully', [
  'ui.router',
  'ngResource'
])
.config([
  '$stateProvider',
  Router
])
.controller('dreamsController', [
  'TripFactory',
  '$state',
  dreamsControllerFunction
])
.factory('TripFactory', [
  '$resource',
  TripFactoryFunction
])


function Router($stateProvider){
  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'js/ng-views/home.html'
  })
  .state('login', {
    url: '/',
    templateUrl: 'js/ng-views/login.html'
  })
  .state('inspiration', {
    url: '/inspiration',
    templateUrl: 'js/ng-views/inspiration.html'
  })
  .state('persperation', {
    url: '/persperation',
    templateUrl: 'js/ng-views/persperation.html'
  })
  .state('dreams', {
    url: '/dreams',
    templateUrl: 'js/ng-views/dreams.html',
    controller: 'dreamsController',
    controllerAs: 'vm'
  })
  .state('plans', {
    url: '/plans',
    templateUrl: 'js/ng-views/plans.html'
  })
  .state('memories', {
    url: '/memories',
    templateUrl: 'js/ng-views/memories.html'
  })
  .state('recommendations', {
    url: '/recommendations',
    templateUrl: 'js/ng-views/recommendations.html'
  })
}

function TripFactoryFunction($resource){
  return $resource('http://localhost:4000/trips')
}

function dreamsControllerFunction(TripFactory, $state){
  console.log("dreamsController hit");
  this.trips = TripFactory.query()
  this.create = function(){
    Trip = new TripFactory(this.trip)
    Trip.$save().then(event => {
      $state.reload()
    })
  }
  this.delete = function(trip){
    $.ajax({
      url:'http://localhost:4000/trips/' + trip._id + '/delete',
      type: 'post',
      dataType: 'json',
      data: {id: trip._id}
    }).done((response) => {
      $state.reload()
    })
  }
}
