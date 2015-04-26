function initialize() {
        var mapOptions = {
          center: { lat: 40.94, lng: -73.06},
          zoom: 14
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
      }
      google.maps.event.addDomListener(window, 'load', initialize);