//model - list of locations in the Port Jefferson, NY Area

var model = [
  {
    "name": "My House",
    "lat": 40.925594,
    "lng": -73.033634
  },
  {
    "name": "My Boyfriend's House",
    "lat": 40.940590, 
    "lng": -73.040945
  },
  {
    "name": "Cedar Beach",
    "lat": 40.964386, 
    "lng": -73.034274
  },
  {
    "name": "Rocco's Pizza",
    "lat": 40.931291, 
    "lng": -73.031276
  },
  {
    "name": "Port Jefferson & Bridgeport Ferry",
    "lat": 40.947791,
    "lng": -73.070830
  },
  {
    "name": "Stony Brook University",
    "lat": 40.912364,
    "lng": -73.123378
  },
  {
    "name": "Clinton Avenue Elementary",
    "lat": 40.905240,
    "lng": -73.040907
  },
  {
    "name": "Heritage Park",
    "lat": 40.935747,
    "lng": -73.011568
  }
];


//ViewModel: representation of UI Data & Behaviors

function AppViewModel() {

  var self = this;

  
  self.placeList = ko.observableArray(model);

  self.map = new google.maps.Map(document.getElementById('map-canvas'),
      {
        center: {lat: 40.94, lng: -73.06},
        zoom: 13
      }
      );

  var markers = [];
  self.initMarkers = function(data) {

    for ( var i = 0; i < data.length; i++ ) {

      var latLng = new google.maps.LatLng( data[i].lat, data[i].lng );
      var marker = new google.maps.Marker({
          position: latLng,
          map: self.map,
          title: data[i].name
      });     
    }
  }
  self.initMarkers(this.placeList());
}


ko.applyBindings(new AppViewModel());

