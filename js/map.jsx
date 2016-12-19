import React, { Component } from 'react';
import PlacesIndex from './places/places_index.jsx';

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      position: {lat: 37.782703500000004, lng: -122.4194},
      places: [],
      getDetails: null,
      placeDetails: null
    };
  }

  componentDidMount() {

    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: this.state.position
    });

    const input = document.getElementById('pac-input');
    const searchBox = new google.maps.places.SearchBox(input);
    const infoWindow = new google.maps.InfoWindow();
    const service = new google.maps.places.PlacesService(map);
    const getDetails = (request) => {
      service.getDetails(request, detailsCallback);
    };

    const detailsCallback = (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        this.setState({placeDetails: results});
      }
    };

    service.nearbySearch({
      location: this.state.position,
      radius: 500,
      type: ['store']
    }, serviceCallback);



    const serviceCallback = (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    }

    const createMarker = (place) => {
      const placeLocation = place.geometry.location;
      const marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(place.name);
        infoWindow.open(map, this);
      });
    };

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    let markers = [];

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      const placeDetails = [];

      if(places.length === 0) return;

      markers.forEach(marker => {
        marker.setMap(null);
      });
      markers = [];

      const bounds = new google.maps.LatLngBounds();
      places.forEach(place => {
        if(!place.geometry) return;

        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });

      this.setState({ places: places, getDetails: getDetails });
      map.fitBounds(bounds);
    });


    // if(navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     const pos = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude
    //     };
    //     map.setCenter(pos);
    //     this.setState({position: pos});
    //   });
    // }
  }

  render() {
    return(
      <div>
        <div className='map-container'>
          <input id="pac-input" className="search-box" type="text" placeholder="Search for Places and Locations"/>
          <div id='map' style={{width: "100vw", height: "100vh"}}></div>
        </div>
        <PlacesIndex getDetails={this.state.getDetails} placeDetails={this.state.placeDetails} places={this.state.places} />
      </div>
    );
  }
}

export default Map;
