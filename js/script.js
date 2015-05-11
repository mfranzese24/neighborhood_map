//model - list of locations in the Port Jefferson, NY Area

var model = [
  {
    "name": "My House",
    "lat": 40.925594,
    "lng": -73.033634,
    "about": "Home Sweet Home!"
  },
  {
    "name": "My Boyfriend's House",
    "lat": 40.940590, 
    "lng": -73.040945,
    "about": "Home of the Great Jon Boswell! OK - so I only WISH he was my boyfriend."
  },
  {
    "name": "Cedar Beach",
    "lat": 40.964386, 
    "lng": -73.034274,
    "about": "A Taste of the North Shore"
  },
  {
    "name": "Rocco's Pizza",
    "lat": 40.931291, 
    "lng": -73.031276,
    "about": "Yum Yum Yum in my Tum Tum Tum"
  },
  {
    "name": "Port Jefferson & Bridgeport Ferry",
    "lat": 40.947791,
    "lng": -73.070830,
    "about": "From Long Island to Connecticut"
  },
  {
    "name": "Stony Brook University",
    "lat": 40.912364,
    "lng": -73.123378,
    "about": "SUNY Stony Brook - a Premier Medical School and Hospital"
  },
  {
    "name": "Clinton Avenue Elementary",
    "lat": 40.905240,
    "lng": -73.040907,
    "about": "Brianna's School"
  },
  {
    "name": "Heritage Park",
    "lat": 40.935747,
    "lng": -73.011568,
    "about": "For a beautiful walk or to play on the playground"
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

  var markers = []
  self.initMarkers = function(data) {

    for ( var i = 0; i < data.length; i++ ) {
      createMarker(i);
    }

    function createMarker(i) {

      var latLng = new google.maps.LatLng( data[i].lat, data[i].lng );
      var about = data[i].about;
      
      var contentString = '<div id="title">' + data[i].name + '<div id ="about">' + data[i].about + '</div>' + '</div>' + '<div id="content" style="width:400px;height:250px;"></div>';

      var marker = new google.maps.Marker({
          position: latLng,
          map: self.map,
          title: data[i].name,
          content: contentString
      });


      var infowindow = new google.maps.InfoWindow({
        position: latLng,
        content: contentString
      });
      
      google.maps.event.addListener(marker, 'click', function() {
        
        infowindow.setContent(this.content);
        infowindow.open(self.map,marker);

        var pano = null;
        google.maps.event.addListener(infowindow, 'domready', function () {
          if (pano != null) {
            pano.unbind("position");
            pano.setVisible(false);
          }
          pano = new google.maps.StreetViewPanorama(document.getElementById("content"), {
            navigationControl: true,
            navigationControlOptions: {style: google.maps.NavigationControlStyle.ANDROID },
            enableCloseButton: false,
            addressControl: false,
            linksControl: false
          });
          pano.bindTo("position", marker);
          pano.setVisible(true);
        });

        google.maps.event.addListener(infowindow, 'closeclick', function () {
          pano.unbind("position");
          pano.setVisible(false);
          pano = null;
        });
      });




    }


};  

  self.initMarkers(this.placeList());
  
}


ko.applyBindings(new AppViewModel());