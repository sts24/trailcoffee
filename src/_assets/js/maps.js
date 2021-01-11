const coords = document.querySelector('#map').dataset.coords.split(',');
const formattedCoords = [ coords[1], coords[0] ];


mapboxgl.accessToken = 'pk.eyJ1Ijoic3RzMjQiLCJhIjoiOVB0MlNrbyJ9.aIGsCG9-ISYzL-jNTaz5cg';
var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/outdoors-v11',
	center: formattedCoords,
	zoom: 11
});

var marker = new mapboxgl.Marker()
.setLngLat(formattedCoords)
.addTo(map);

var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

map.scrollZoom.disable();