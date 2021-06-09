mapboxgl.accessToken = 'pk.eyJ1Ijoic3RzMjQiLCJhIjoiOVB0MlNrbyJ9.aIGsCG9-ISYzL-jNTaz5cg';

var map = new mapboxgl.Map({
	container: 'map-all-places',
	style: 'mapbox://styles/mapbox/streets-v11',
	zoom: 3,
	center: [-103.7715563, 44.9672434] // center of united states
});







// get the first and last data points and make map markers

async function mapData() {
	await fetch('/coordinate-data.json').then(res => res.json()).then(data => {

		data.forEach(place => {
			new mapboxgl.Marker()
				.setLngLat(place.coords)
				.addTo(map);
		})



	});
}

mapData();


// add reference scale
var scale = new mapboxgl.ScaleControl({
	maxWidth: 200,
	unit: 'imperial'
});
map.addControl(scale);

// add navigation controls
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

