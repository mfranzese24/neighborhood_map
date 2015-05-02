//make Google Map appear on Page Load

var map;
function initialize() {

        var mapOptions = {
          center: { lat: 40.94, lng: -73.06},
          zoom: 13,
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        setMarkers(map, places);
};

var places = [
  	['My House', 40.925594, -73.033634],
  	['My Boyfriends House', 40.940590, -73.040945],
  	['Cedar Beach', 40.964386, -73.034274],
  	['Roccos Pizza',  40.931291, -73.031276],
  	['Port Jefferson & Bridgeport Ferry', 40.947791, -73.070830],
  	['Stony Brook University', 40.912364, -73.123378],
  	['Clinton Avenue Elementary', 40.905240, -73.040907],
  	['Heritage Park', 40.935747, -73.011568]
];

function setMarkers(map, locations) {
	for (var i = 0; i < places.length; i++) {
		var place = places[i];
		var myLatLng = new google.maps.LatLng(place[1], place[2]);
		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			title: place[0]
		});
	}
};

google.maps.event.addDomListener(window, 'load', initialize);


