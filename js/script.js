//model - list of locations in the Port Jefferson, NY Area

var model = [
  {
    "name": "My House",
    "lat": 40.925594,
    "lng": -73.033634,
    "search": "Port Jefferson Station",
    "about": "Home Sweet Home!"
  },
  {
    "name": "My Boyfriend's House",
    "lat": 40.940590, 
    "lng": -73.040945,
    "search": "Port Jefferson",
    "about": "Home of the Great Jon Boswell! OK - so I only WISH he was my boyfriend."
  },
  {
    "name": "Cedar Beach",
    "lat": 40.964677, 
    "lng": -73.027536,
    "search": "Cedar Beach (Brookhaven, New York)",
    "about": "A Taste of the North Shore"
  },
  {
    "name": "Rocco's Pizza",
    "lat": 40.931772, 
    "lng": -73.033817,
    "search": "Mount Sinai, New York",
    "about": "Yum Yum Yum in my Tum Tum Tum"
  },
  {
    "name": "Port Jefferson & Bridgeport Ferry",
    "lat": 40.948180,
    "lng": -73.070658,
    "search": "Port Jefferson-Bridgeport Ferry",
    "about": "From Long Island to Connecticut"
  },
  {
    "name": "Stony Brook University Hospital",
    "lat": 40.910588,
    "lng": -73.114766,
    "search": "Stony Brook University Hospital",
    "about": "SUNY Stony Brook - a Premier Medical School and Hospital"
  },
  {
    "name": "Clinton Avenue Elementary",
    "lat": 40.905702,
    "lng": -73.040853,
    "search": "Comsewogue",
    "about": "Brianna's School"
  },
  {
    "name": "Heritage Park",
    "lat": 40.933792,
    "lng": -73.009474,
    "search": "Mount Sinai, New York",
    "about": "For a beautiful walk or to play on the playground"
  }
];


//ViewModel: representation of UI Data & Behaviors

function AppViewModel() {

  var self = this;

  //creates an array of model objects  
  self.placeList = ko.observableArray(model);

  //create map, starting point Port Jefferson NY
  self.map = new google.maps.Map(document.getElementById('map-canvas'),
      {
        center: {lat: 40.94, lng: -73.06},
        zoom: 13
      }
      );

  //iterates through each location to create markers


  var markers = ko.observableArray();


  self.initMarkers = function(data) {

    for ( var i = 0; i < data.length; i++ ) {
      createMarker(i);
    }

    function createMarker(i) {

      var latLng = new google.maps.LatLng( data[i].lat, data[i].lng );
      var about = data[i].about;

      //set content for infowindow
      var contentString = '<div class = "title"><h3>' + data[i].name + '</h3></div>' + '<div class = "about">' + data[i].about  + '</div><div id="content" style="width:400px;height:250px;"></div><div class="wikipedia-container" style="width: 400px; height: 250px;"><h3 id="wikipedia-header">Wikipedia Links</h3><ul id="wikipedia-links"></ul></div></div>';

      //create markers
      var marker = new google.maps.Marker({
          position: latLng,
          map: self.map,
          title: data[i].name,
          content: contentString
      });

      markers.push(marker);

      //create list view for markers
      $(document).ready( function () {
        $('#list').append('<li>' + marker.title + '</li>');
        $('#list li:last-of-type').click(function() {
        infowindow.open(self.map, marker);

        var listItem = $('#list li');
        var selector = '.places-list li';

        function markSelection() {
          $(selector).on('click', function() {
            $(selector).removeClass('active');
              $(this).addClass('active');
              $('.active').css("fontWeight", "bold");
              $('.active').siblings('li').css("fontWeight", "normal");
          });
        };

        markSelection();
        });
      });

      //create infowindows
      var infowindow = new google.maps.InfoWindow({
        position: latLng,
        content: contentString
      });

      
      //function when clicking markers
      google.maps.event.addListener(marker, 'click', function() {

        function toggleBounce() {
          if (marker.getAnimation() != null) {
          marker.setAnimation(null);
          }
          else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
            function timeout() {
              marker.setAnimation(null);
            }
            setTimeout(timeout, 2000);
          }
        };

        toggleBounce();
        
        infowindow.setContent(this.content);
        infowindow.open(self.map,marker);

        $(document).ready(function() {
          var $wikiElem = $('#wikipedia-links');

          var wikiURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + data[i].search + '&format=json';
          var wikiRequestTimeout = setTimeout(function() {
            $wikiElem.text("Failed to Get Wikipedia Resources");
            }, 8000);

          $.ajax({
            url: wikiURL,
            dataType: "jsonp",
            cache: true,
            //jsonp: "callback",
            success: function ( response ) {
              var articleList = response[1];

              for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '" target="_blank">' + articleStr + '</a></li>')
              };

              clearTimeout(wikiRequestTimeout);
            }
          });
        });
        
        //add google streetview to the infowindow
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

  //run function to create markers & associated behaviors
  self.initMarkers(this.placeList());
  
}


ko.applyBindings(new AppViewModel());