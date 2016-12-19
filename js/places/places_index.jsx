import React, { Component } from 'react';
import PlacesIndexItem from './places_index_item.jsx';
import PlaceDetails from './place_details.jsx';

class PlacesIndex extends Component {

  constructor(props) {
    super(props);
    this.key = 0;
    // this.showDetails = this.showDetails.bind(this);
    this.state = {
      index: true,
      place: null
    };
  }

  showDetails(place) {
    return () => {
      this.setState({index: !this.state.index, place: place});
    };
  }

  render() {
    return(
      <div className='places-container'>
        { this.state.index ? this.props.places.map(place => {
          this.key++;
          return <PlacesIndexItem onClick={this.showDetails(place)} key={this.key} place={place} />;
        }) : <PlaceDetails goBack={this.showDetails(this.state.place)}
        placeDetails={this.props.placeDetails}
        getDetails={this.props.getDetails}
        place={this.state.place} /> }
      </div>
    );
  }
}

export default PlacesIndex;
