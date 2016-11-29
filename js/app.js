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
.service('authentication', [
  '$http',
  '$window',
  authentication
])
.controller('dreams', [
  '$state',
  'Trip',
  'User',
  dreams
])
.controller('plans', [
  '$state',
  'Trip',
  'User',
  plans
])
.controller('tripShow', [
  '$state',
  'Trip',
  '$stateParams',
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
  .state('inspiration', {
    url: '/inspiration',
    templateUrl: 'js/ng-views/inspiration.html'
  })
  .state('persperation', {
    url: '/persperation',
    templateUrl: 'js/ng-views/persperation.html'
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

function dreams ($state, Trip, User) {
  $.ajax({
    url: 'http://localhost:4000/custom/trips/' + localStorage.currentUserId,
    type: 'get',
    dataType: 'json'
  }).done((response) => {
    this.trips = response
    console.log(this.trips);
  })

  this.create = function(){
    $.ajax({
      url: 'http://localhost:4000/custom/trips/' + localStorage.currentUserId,
      type: 'post',
      dataType: 'json',
      data: this.newTrip
    }).done((trip) => {
      console.log(trip);
    })
  }
}

function plans ($state, Trip, User) {
  $.ajax({
    url: 'http://localhost:4000/custom/trips/' + localStorage.currentUserId,
    type: 'get',
    dataType: 'json'
  }).done((response) => {
    console.log(response);
    //damn you asynchronicity!!  Double click required to populate onscreen
  })

  this.create = function(){
    console.log(localStorage.currentUserId);
    currentUser = User.get({id: localStorage.currentUserId})
    console.log(currentUser);
    trip = new Trip(this.newTrip)
    trip.travelers = []
    trip.travelers.push(currentUser)
    //why when i push does it now refuse to save????
    console.log(trip);
    trip.$save().then(newTrip => {
      //asynchronicity??
      console.log(newTrip);
    })
  }
}

function tripShow ($state, Trip, $stateParams) {
  this.trip = Trip.get({id: $stateParams.id})
  this.update = function(){
    this.trip.$update({id: $stateParams.id})
  }
  this.delete = function(){
    this.trip.$delete({id: $stateParams.id}).then(function(){
      $state.go('tripIndex')
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

function recommendations ($state, Recommendation, Photo, Story) {
  this.getRecs = function(){
    console.log(this.country);
    $.ajax({
      url: 'http://localhost:4000/recommendations/' + this.country,
      type: 'get',
      dataType: 'json'
    }).done((response) => {
      this.recommendations = response
      //damn you asynchronicity!!  Double click required to populate onscreen
    })
    $.ajax({
      url: 'http://localhost:4000/stories/' + this.country,
      type: 'get',
      dataType: 'json'
    }).done((response) => {
      this.stories = response
      //damn you asynchronicity!!  Double click required to populate onscreen
    })
    $.ajax({
      url: 'http://localhost:4000/photos/' + this.country,
      type: 'get',
      dataType: 'json'
    }).done((response) => {
      this.photos = response
      //damn you asynchronicity!!  Double click required to populate onscreen
    })
  }
}

function authentication ($http, $window) {
  var saveToken = function(token) {
    $window.localStorage['mean-token'] = token
  }

  var getToken = function () {
    return $window.localStorage['mean-token']
  }

  logout = function() {
    $window.localStorage.removeItem('mean-token')
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
    console.log(authentication.register);
    authentication
    .register(vm.credentials)
    .error(function(err){
      alert("error" + err)
    })
    .then(function(){
      $location.path('profile')
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
      $location.path('profile')
    })
  }
}

function home (User, authentication, $window) {
  this.current = authentication.currentUser()
  console.log(this.current);
  $.ajax({
    url: 'http://localhost:4000/users/' + this.current.email,
    type: 'get',
    dataType: 'json'
  }).done((response) => {
    // this.currentUser = response
    console.log(response);
    $window.localStorage['currentUserId'] = response._id
    //damn you asynchronicity!!  Double click required to populate onscreen
  })
}
