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
      <div className = 'map' id='map'></div>
    );
  }
}

export default Map;
