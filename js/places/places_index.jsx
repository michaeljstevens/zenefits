import React, { Component } from 'react';
import PlacesIndexItem from './places_index_item.jsx';

class PlacesIndex extends Component {

  constructor(props) {
    super(props);
    this.key = 0;
  }

  render() {
    return(
      <div className='places-container'>
        {this.props.places.map(place => {
          this.key++;
          return <PlacesIndexItem key={this.key} place={place} />;
        })}
      </div>
    );
  }
}

export default PlacesIndex;
