mapboxgl.accessToken = 'pk.eyJ1IjoibWFsYWptYXRlbyIsImEiOiJja29lZHg5eGIwNXJ0MnBqejg2YzJuczF4In0.r9OfJj5rNFg_dT9VCkPjiw';

let zoom

if(window.innerWidth > 700) {
    zoom = 6.7
} else {
    zoom = 6.3
}

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/navigation-day-v1',
    center: [20, 41.2],
    zoom: zoom
});

map.addControl(new mapboxgl.NavigationControl());