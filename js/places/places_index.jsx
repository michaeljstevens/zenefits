import React, { Component } from 'react';
import PlacesIndexItem from './places_index_item.jsx';
import PlaceDetails from './place_details.jsx';

class PlacesIndex extends Component {

  constructor(props) {
    super(props);
    this.key = 0;
    this.state = {
      index: true,
      place: null
    };
  }

  componentWillReceiveProps(props) {
    if (props.places !== this.props.places && this.state.index === false && this.props.shouldUpdate) {
      this.setState({index: true});
    } else if (props.places !== this.props.places && this.state.index) {
      props.places.forEach(place => {
        if (!place.marker.map) place.marker.setMap(this.props.map);
      });
    }
  }

  showDetails(place) {
    return () => {
      if (!this.state.index) {
        this.props.places.forEach(p => {
          p.marker.setMap(this.props.map);
        });
      }
      this.setState({index: !this.state.index, place: place});
    };
  }

  render() {
    return(
      <div className='places-container'>
        { this.state.index ? this.props.places.map(place => {
          this.key++;
          return <PlacesIndexItem onClick={this.showDetails(place.place)} key={this.key} place={place} />;
        }) : <PlaceDetails goBack={this.showDetails(this.state.place)}
        placeDetails={this.props.placeDetails}
        getDetails={this.props.getDetails}
        place={this.state.place} /> }
      </div>
    );
  }
}

export default PlacesIndex;
