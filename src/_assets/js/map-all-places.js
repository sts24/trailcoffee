mapboxgl.accessToken = 'pk.eyJ1Ijoic3RzMjQiLCJhIjoiOVB0MlNrbyJ9.aIGsCG9-ISYzL-jNTaz5cg';

var map = new mapboxgl.Map({
	container: 'map-all-places',
	style: 'mapbox://styles/mapbox/streets-v11',
	zoom: 3,
	center: [-103.7715563, 44.9672434] // center of united states
});



// label popups

var popup = new mapboxgl.Popup({
	closeButton: false,
	closeOnClick: false,
	anchor: 'top'
});


// get the first and last data points and make map markers

async function mapData() {
	await fetch('/coordinate-data.json').then(res => res.json()).then(data => {

		data.features.forEach(place => {

			const placeLink = place.properties.url;
			const placeName = place.properties.name;

			const placeMarker = new mapboxgl.Marker()
				.setLngLat(place.geometry.coordinates)
				.addTo(map);

			// go to place on click
			placeMarker.getElement().addEventListener('click', () => {
				window.location.href = placeLink;
			});

			// show popup label on mouseover
			placeMarker.getElement().addEventListener('mouseover', () => {
				popup.setLngLat(place.geometry.coordinates).setHTML(placeName).addTo(map);
			});

			// remove popup label on mouseleave
			placeMarker.getElement().addEventListener('mouseleave', () => {
				popup.remove();
			});
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

