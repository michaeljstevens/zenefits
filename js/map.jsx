import React, { Component } from 'react';

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      position: {lat: 37.782703500000004, lng: -122.4194}
    };
  }

  componentDidMount() {

    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: this.state.position
    });

    const input = document.getElementById('pac-input');
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    let markers = [];

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();

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
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });


    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
        this.setState({position: pos});
      });
    }
  }

  render() {
    return(
      <div>
        <input id="pac-input" className="controls" type="text" placeholder="Search Box"/>
        <div className = 'map' id='map'></div>
      </div>
    );
  }
}

export default Map;
