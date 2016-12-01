angular
.module('wanderfully', [
  'ui.router',
  'ngResource'
])
.config([
  '$stateProvider',
  Router
])
.factory('User', [
  '$resource',
  User
])
.factory('Trip', [
  '$resource',
  Trip
])
.factory('Recommendation', [
  '$resource',
  Recommendation
])
.factory('Story', [
  '$resource',
  Story
])
.factory('Photo', [
  '$resource',
  Photo
])
.factory('currentUser',
  function(){
    var currentUserId = localStorage.currentUserId
    return {
      currentUserId
    }
  }
)
.service('authentication', [
  '$http',
  '$window',
  '$state',
  authentication
])
.controller('dreams', [
  '$state',
  'Trip',
  'User',
  '$location',
  '$scope',
  '$http',
  dreams
])
.controller('plans', [
  '$state',
  'Trip',
  'User',
  '$scope',
  'currentUser',
  plans
])
.controller('tripShow', [
  '$state',
  'Trip',
  '$stateParams',
  'User',
  'Recommendation',
  'Photo',
  'Story',
  tripShow
])
.controller('memories', [
  '$state',
  'Recommendation',
  'Photo',
  'Story',
  memories
])
.controller('recommendationShow', [
  '$state',
  'Recommendation',
  '$stateParams',
  recommendationShow
])
.controller('storyShow', [
  '$state',
  'Story',
  '$stateParams',
  storyShow
])
.controller('photoShow', [
  '$state',
  'Photo',
  '$stateParams',
  photoShow
])
.controller('recommendations', [
  '$state',
  'Recommendation',
  'Photo',
  'Story',
  '$scope',
  recommendations
])
.controller('register', [
  '$location',
  'authentication',
  register
])
.controller('login', [
  '$location',
  'authentication',
  login
])
.controller('home', [
  'User',
  'authentication',
  '$window',
  home
])

function Router ($stateProvider) {
  $stateProvider
  .state('dreams', {
    url: '/dreams',
    templateUrl: 'js/ng-views/dreams.html',
    controller: 'dreams',
    controllerAs: 'vm'
  })
  .state('plans', {
    url: '/plans',
    templateUrl: 'js/ng-views/plans.html',
    controller: 'plans',
    controllerAs: 'vm'
  })
  .state('tripShow', {
    url: '/trips/:id',
    templateUrl: 'js/ng-views/tripShow.html',
    controller: 'tripShow',
    controllerAs: 'vm'
  })
  .state('home', {
    url: '/home',
    templateUrl: 'js/ng-views/home.html',
    controller: 'home',
    controllerAs: 'vm'
  })
  .state('login', {
    url: '/',
    templateUrl: 'js/ng-views/login.html',
    controller: 'login',
    controllerAs: 'vm'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'js/ng-views/register.html',
    controller: 'register',
    controllerAs: 'vm'
  })
  .state('memories', {
    url: '/memories',
    templateUrl: 'js/ng-views/memories.html',
    controller: 'memories',
    controllerAs: 'vm'
  })
  .state('recommendationShow', {
    url: '/recommendations/:id',
    templateUrl: 'js/ng-views/recommendationShow.html',
    controller: 'recommendationShow',
    controllerAs: 'vm'
  })
  .state('storyShow', {
    url: '/stories/:id',
    templateUrl: 'js/ng-views/storyShow.html',
    controller: 'storyShow',
    controllerAs: 'vm'
  })
  .state('photoShow', {
    url: '/photos/:id',
    templateUrl: 'js/ng-views/photoShow.html',
    controller: 'photoShow',
    controllerAs: 'vm'
  })
  .state('recommendations', {
    url: '/recommendations',
    templateUrl: 'js/ng-views/recommendations.html',
    controller: 'recommendations',
    controllerAs: 'vm'
  })
}

function User ($resource) {
  return $resource('http://localhost:4000/users/id/:id', {}, {
    update: {method: 'put'}
  })
}

function Trip ($resource) {
  return $resource('http://localhost:4000/trips/:id', {}, {
    update: {method: 'put'},
    create: {method: 'post'}
  })
}

function Recommendation ($resource) {
  return $resource('http://localhost:4000/recommendations/:id', {}, {
    update: {method: 'put'}
  })
}

function Story ($resource) {
  return $resource('http://localhost:4000/stories/:id', {}, {
    update: {method: 'put'}
  })
}

function Photo ($resource) {
  return $resource('http://localhost:4000/photos/:id', {}, {
    update: {method: 'put'}
  })
}

function dreams ($state, Trip, User, $location, $scope, $http) {
  let vm = this
  vm.currentUserId = localStorage.currentUserId
  $.ajax({
    url: 'http://localhost:4000/custom/dreams/' + localStorage.currentUserId,
    type: 'get',
    dataType: 'json'
  }).done((response) => {
    $scope.$apply(function(){
      vm.trips = response
    })
  })
  vm.create = function($event) {
    // console.log($event);
    $.ajax({
      url: 'http://localhost:4000/custom/dreams/' + localStorage.currentUserId,
      type: 'post',
      // dataType: 'json',
      data: vm.newTrip
    })
    .done((trip) => {
      console.log(trip);
      $scope.$apply(() => {
        console.log(Object.keys($scope));
        vm.trips.push(trip)
      })
    })
    .fail(function(err) {
      console.log(err)
      debugger
    })
    .always(function() {
      console.log("complete")
    })
    vm.newTrip.name = ''
    vm.newTrip.notes = ''
  }
}

function plans ($state, Trip, User, $scope, currentUser) {
  let vm = this
  vm.currentUser = currentUser
  console.log(currentUser);
  $.ajax({
    url: 'http://localhost:4000/custom/plans/' + localStorage.currentUserId,
    type: 'get',
    dataType: 'json'
  }).done((response) => {
    $scope.$apply(function(){
      vm.trips = response
    })
  })

  vm.create = function() {
    $.ajax({
      url: 'http://localhost:4000/custom/plans/' + localStorage.currentUserId,
      type: 'post',
      // dataType: 'json',
      data: vm.newTrip
    })
    .done((trip) => {
      console.log(trip);
      $scope.$apply(() => {
        console.log(Object.keys($scope));
        vm.trips.push(trip)
      })
    })
    .fail(function(err) {
      console.log(err)
      debugger
    })
    .always(function() {
      console.log("complete")
    })
    vm.newTrip.name = ''
    vm.newTrip.notes = ''
  }
}

function tripShow ($state, Trip, $stateParams, User, Recommendation, Photo, Story) {
  var vm = this
  vm.trip = Trip.get({id: $stateParams.id}, function(trip){
    vm.recommendations = []
    trip.recommendations.forEach(function(recId){
      Recommendation.get({id:recId}, function(rec){
        vm.recommendations.push(rec)
      })
    })
    vm.photos = []
    trip.photos.forEach(function(recId){
      Photo.get({id:recId}, function(rec){
        vm.photos.push(rec)
      })
    })
    vm.stories = []
    trip.stories.forEach(function(recId){
      Story.get({id:recId}, function(rec){
        vm.stories.push(rec)
      })
    })
    vm.travelers = []
    trip.travelers.forEach((traveler) => {
      User.get({id: traveler}, function(user){
        vm.travelers.push(user)
      })
    })
  })
  vm.update = function(){
    vm.trip.$update({id: $stateParams.id})
  }
  vm.delete = function(){
    vm.trip.$delete({id: $stateParams.id}).then(function(){
      if(vm.trip.planned == true){
        $state.go('plans')
      } else {
        $state.go('dreams')
      }
    })
  }
}

function memories ($state, Recommendation, Photo, Story) {
  this.recommendations = Recommendation.query()
  this.stories = Story.query()
  this.photos = Photo.query()
  this.createRec = function(){
    Rec = new Recommendation(this.newRec)
    Rec.$save().then(newRec => {
      console.log(newRec);
      //reload states not working, however, create is!
      $state.go('memories', {}, {new:true})
    })
  }
  this.createStory = function(){
    Story = new Story(this.newStory)
    Story.$save().then(newStory => {
      console.log(newStory);
      //reload states not working, however, create is!
      $state.go('memories', {}, {new:true})
    })
  }
  this.createPhoto = function(){
    Photo = new Photo(this.newPhoto)
    console.log(this.newPhoto);
    Photo.$save().then(newPhoto => {
      console.log(newPhoto);
      //reload states not working, however, create is!
      $state.go('memories', {}, {new:true})
    })
  }
}

function recommendationShow ($state, Recommendation, $stateParams) {
  this.recommendation = Recommendation.get({id: $stateParams.id})
  this.update = function(){
    this.recommendation.$update({id: $stateParams.id})
  }
  this.delete = function(){
    this.recommendation.$delete({id: $stateParams.id}).then(function(){
      $state.go('memories')
    })
  }
}

function storyShow ($state, Story, $stateParams) {
  this.story = Story.get({id: $stateParams.id})
  this.update = function(){
    this.story.$update({id: $stateParams.id})
  }
  this.delete = function(){
    this.story.$delete({id: $stateParams.id}).then(function(){
      $state.go('memories')
    })
  }
}

function photoShow ($state, Photo, $stateParams) {
  this.photo = Photo.get({id: $stateParams.id})
  this.update = function(){
    this.photo.$update({id: $stateParams.id})
  }
  this.delete = function(){
    this.photo.$delete({id: $stateParams.id}).then(function(){
      $state.go('memories')
    })
  }
}

function recommendations ($state, Recommendation, Photo, Story, $scope) {
  var vm = this
  vm.getRecs = function(){
    console.log(vm.country);
    $.ajax({
      url: 'http://localhost:4000/country/recommendations/' + vm.country,
      type: 'get',
      dataType: 'json'
    }).done((response) => {
      $scope.$apply(function(){
        vm.recommendations = response
      })
    })
    $.ajax({
      url: 'http://localhost:4000/country/stories/' + vm.country,
      type: 'get',
      dataType: 'json'
    }).done((response) => {
      $scope.$apply(function(){
        vm.stories = response
      })
      //damn you asynchronicity!!  Double click required to populate onscreen
    })
    $.ajax({
      url: 'http://localhost:4000/country/photos/' + vm.country,
      type: 'get',
      dataType: 'json'
    }).done((response) => {
      $scope.$apply(function(){
        vm.photos = response
      })
      //damn you asynchronicity!!  Double click required to populate onscreen
    })
    $.ajax({
      url: 'http://localhost:4000/custom/trips/' + localStorage.currentUserId,
      type: 'get',
      dataType: 'json'
    }).done((response) => {
      $scope.$apply(function(){
        vm.trips = response
      })
    })
  }
  vm.addRec = function(rec, trip){
    $.ajax({
      url: 'http://localhost:4000/addRec/' + trip._id + '/' + rec._id,
      type: 'put',
      dataType: 'json'
    }).done((response) => {
      console.log(response);
    })
  }
  vm.addStory = function(story, trip){
    $.ajax({
      url: 'http://localhost:4000/addStory/' + trip._id + '/' + story._id,
      type: 'put',
      dataType: 'json'
    }).done((response) => {
      console.log(response);
    })
  }
  vm.addPhoto = function(photo, trip){
    $.ajax({
      url: 'http://localhost:4000/addPhoto/' + trip._id + '/' + photo._id,
      type: 'put',
      dataType: 'json'
    }).done((response) => {
      console.log(response);
    })
  }
}

function authentication ($http, $window, $state) {
  var saveToken = function(token) {
    $window.localStorage['mean-token'] = token
  }

  var getToken = function () {
    return $window.localStorage['mean-token']
  }

  logout = function() {
    $window.localStorage.removeItem('mean-token')
    $state.go('home')
  }

  var isLoggedIn = function(){
    var token = getToken()
    var payload

    if(token){
      payload = token.split('.')[1]
      payload = $window.atob(payload)
      payload = JSON.parse(payload)

      return payload.exp > Date.now() / 1000
    } else {
      return false
    }
  }

  var currentUser = function(){
    if(isLoggedIn()){
      var token = getToken()
      var payload = token.split('.')[1]
      payload = $window.atob(payload)
      payload = JSON.parse(payload)
      return {
        email: payload.email
      }
    }
  }

  register = function(user) {
    return $http.post('http://localhost:4000/register', user).success((data) => {
      saveToken(data.token)
    })
  }

  login = function(user) {
    return $http.post('http://localhost:4000/login', user).success((data) => {
      saveToken(data.token)
    })
  }

  return {
    saveToken : saveToken,
    getToken : getToken,
    logout : logout,
    isLoggedIn : isLoggedIn,
    currentUser : currentUser,
    register : register,
    login : login
  }
}

function register($location, authentication) {
  var vm = this
  vm.credentials = {
    name: '',
    email: '',
    password: ''
  }
  vm.onSubmit = function(){
    authentication
    .register(vm.credentials)
    .error(function(err){
      alert("error" + err)
    })
    .then(function(){
      $location.path('home')
    })
  }
}

function login($location, authentication) {
  var vm = this
  vm.credentials = {
    email: '',
    password: ''
  }
  vm.onSubmit = function(){
    authentication
    .register(vm.credentials)
    .error(function(err){
      alert(err)
    })
    .then(function(token){
      console.log(token);
      $location.path('home')
    })
  }
}

function home (User, authentication, $window) {
  this.current = authentication.currentUser()
  $.ajax({
    url: 'http://localhost:4000/users/' + this.current.email,
    type: 'get',
    dataType: 'json'
  }).done((response) => {
    $window.localStorage['currentUserId'] = response._id
  })
}
