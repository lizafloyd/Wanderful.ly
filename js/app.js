angular
.module('wanderfully', [
  'ui.router',
  'ngResource'
])
.config([
  '$stateProvider',
  Router
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
.controller('tripIndex', [
  '$state',
  'Trip',
  tripIndex
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

function Router ($stateProvider) {
  $stateProvider
  .state('tripIndex', {
    url: '/trips',
    templateUrl: 'js/ng-views/dreams.html',
    controller: 'tripIndex',
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

function Trip ($resource) {
  return $resource('http://localhost:4000/trips/:id', {}, {
    update: {method: 'put'}
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

function tripIndex ($state, Trip) {
  this.trips = Trip.query()

  this.create = function(){
    Trip = new Trip(this.newTrip)
    Trip.$save().then(newTrip => {
      //asynchronicity??
      console.log(newTrip);
      $state.reload()
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
  }}

function photoShow ($state, Photo, $stateParams) {
  this.photo = Photo.get({id: $stateParams.id})
  this.update = function(){
    this.photo.$update({id: $stateParams.id})
  }
  this.delete = function(){
    this.photo.$delete({id: $stateParams.id}).then(function(){
      $state.go('memories')
    })
  }}

function recommendations ($state, Recommendation, Photo, Story) {
  this.recommendations = Recommendation.query()
  this.stories = Story.query()
  this.photos = Photo.query()
}
