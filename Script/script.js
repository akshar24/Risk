
var banks = JSON.parse(data);

		var mymap = L.map('mapid').setView([38.63213759515948,-90.19126018891603], 4);

		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
				'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			id: 'mapbox.streets'
		}).addTo(mymap);

		var mapMarkers = [];
		var markersLayer = new L.LayerGroup();

		 markersLayer.addTo(mymap);
 	 	 var acquires = [];
		 for(var i = 0; i < banks.length; i++){
			 acquires.push(banks[i].Acquiring);
		 }
		 acquires.sort();

		for(var i = 0; i < banks.length; i++) {
			var option = document.createElement("option");
			option.text = acquires[i];
			option.value = acquires[i];
			var select = document.getElementById("inputBank");
			select.appendChild(option);
		}

		// collect which dropdown a user selected
		var select = document.getElementById("inputBank");
		var newMapMarkers = [];

		function changeMarkers(){
			console.log(banks.length)
			markersLayer.clearLayers();

			var newLatLong = [];

			console.log("Before: " + newMapMarkers.length);

			var tempLength = newMapMarkers.length;

			var indexes = [];
			for(var i = 0; i < banks.length; i++) {
				if(select.value == banks[i].Acquiring) {
					indexes.push(i);

					newLatLong.push([banks[i].Latitude,banks[i].Longitude]);
				}
			}

			for(var i = 0; i < newLatLong.length; i++) {
				var index = indexes[i];
				var LMarker = L.marker(newLatLong[i]).addTo(mymap)
				.on('click', onClick)
				.bindPopup(banks[index].Name + "<br>" + banks[index].City + ", " + banks[index].State);
        		newMapMarkers.push(LMarker);
        		markersLayer.addLayer(LMarker);
					if(i > 0){
						var pointA = newLatLong[0];
						var pointB = newLatLong[i];
						var plist = [pointA, pointB];
						var line = new L.Polyline(plist, {
							color: 'red',
							weight:3,
							opacity: 0.5,
							smoothFactor: 1
						});
						line.addTo(mymap);
						newMapMarkers.push(line);
						markersLayer.addLayer(line);
						console.log(newLatLong)
					}
			}
		}
