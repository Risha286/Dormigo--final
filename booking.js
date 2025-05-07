let map;
let marker;

// Initialize Google Maps
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: 12.9716, lng: 77.5946 }, // Center the map on Bangalore
    });
    
    // Try to get the user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            map.setCenter(userLocation);
            marker = new google.maps.Marker({
                position: userLocation,
                map: map,
                title: 'You are here',
            });
        }, () => {
            handleLocationError(true, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, map.getCenter());
    }
}

// Handle location errors
function handleLocationError(browserHasGeolocation, pos) {
    const infoWindow = new google.maps.InfoWindow({
        map: map,
    });
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
}

// Toggle More Filters
function toggleMoreFilters() {
    const moreFilters = document.getElementById("more-filters");
    moreFilters.style.display = moreFilters.style.display === "none" ? "block" : "none";
}

// Show selected location on map
function showOnMap(location) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': location }, (results, status) => {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            if (marker) {
                marker.setMap(null); // Remove previous marker
            }
            marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

// Filter Listings
function filterListings() {
    const type = document.getElementById("property-type").value;
    const gender = document.getElementById("gender-filter").value;
    const minPrice = document.getElementById("min-price").value;
    const maxPrice = document.getElementById("max-price").value;
    const rating = document.getElementById("rating-filter").value;

    const listings = document.querySelectorAll(".listing");
    listings.forEach(listing => {
        const listingType = listing.getAttribute("data-type");
        const listingGender = listing.getAttribute("data-gender");
        const listingPrice = parseInt(listing.getAttribute("data-price"));
        const listingRating = parseInt(listing.getAttribute("data-rating"));

        if ((type === "" || listingType === type) &&
            (gender === "" || listingGender === gender) &&
            (minPrice === "" || listingPrice >= minPrice) &&
            (maxPrice === "" || listingPrice <= maxPrice) &&
            (rating === "" || listingRating >= rating)) {
            listing.style.display = "block";
        } else {
            listing.style.display = "none";
        }
    });
}