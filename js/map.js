var map;
function initMap(){
	
	map = L.map('map'); //.setView([12.136613, -68.937321], 13);

      L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
        maxZoom: 18,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery Â© <a href="http://cloudmade.com">CloudMade</a>'
      }).addTo(map);      

      $.getJSON('https://rawgithub.com/bertspaan/monumenten_curacao/master/monuments.json', function(data) {
            	        L.geoJson(data).addTo(map);
            	      });

      function onLocationFound(e) {
		var radius = e.accuracy / 2;
		L.marker(e.latlng).addTo(map)
			.bindPopup("You are within " + radius + " meters from this point").openPopup();
		L.circle(e.latlng, radius).addTo(map);
	}
	function onLocationError(e) {
		alert(e.message);
	}
	map.on('locationfound', onLocationFound);
	map.on('locationerror', onLocationError);
	map.locate({setView: true, maxZoom: 16});
    ;
	
}