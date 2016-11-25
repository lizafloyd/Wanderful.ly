console.log(trip);
this.trips.forEach(function(e){
  if(e._id == trip._id){
    e.$delete({id: trip._id})
  }
})
// this.$delete({id: trip._id}, function(response){
//   console.log(response);
// })
