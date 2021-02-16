const coords = document.querySelector('#map').dataset.coords.split(',');
const geoJSONfile = document.querySelector('#map').dataset.geojson;
const formattedCoords = [ coords[1], coords[0] ];




mapboxgl.accessToken = 'pk.eyJ1Ijoic3RzMjQiLCJhIjoiOVB0MlNrbyJ9.aIGsCG9-ISYzL-jNTaz5cg';

var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: formattedCoords,
	zoom: 12
});

if(geoJSONfile !== ''){
	map.on('load', function () {

		map.addSource("route", {
			"type": "geojson",
			"data": "/geo-json/" + geoJSONfile
		});

		map.addLayer({
			'id': 'hikeRoute',
			'type': 'line',
			'source': 'route',
			'layout': {
				'line-join': 'round',
				'line-cap': 'round'
			},
			'paint': {
				'line-color': '#68C1EE',
				'line-width': 4
			}
		});


	});


	// get the first and last data points and make map markers

	async function mapData(){ 
		await fetch('/geo-json/'+ geoJSONfile).then(res => res.json()).then(data => { 
			
			const coordData = data.features[0].geometry.coordinates;
			const startCoords = [coordData[0][0], coordData[0][1]];
			const finishCoords = [coordData[coordData.length - 1][0], coordData[coordData.length - 1][1]]

			
			var finishMarker = new mapboxgl.Marker({
				color: "#dd430d"
				}).setLngLat(finishCoords)
				.addTo(map);

			var startMarker = new mapboxgl.Marker({
				color: "#89e12b"
				}).setLngLat(startCoords)
				.addTo(map);

			
		});
	}

	mapData();

} else {

	// if no route is loading, just drop pin at center point

	var centerMarker = new mapboxgl.Marker({
		color: "#89e12b"
		}).setLngLat(formattedCoords)
		.addTo(map);

}


// add reference scale
var scale = new mapboxgl.ScaleControl({
	maxWidth: 200,
	unit: 'imperial'
});
map.addControl(scale);

// add navigation controls
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

