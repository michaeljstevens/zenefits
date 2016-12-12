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
