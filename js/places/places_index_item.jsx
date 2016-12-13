import React, { Component } from 'react';

class PlacesIndexItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const place = this.props.place;
    return(
      <div className='place-container'>
        <img src={place.photos[0].getUrl({ maxWidth: 500, maxHeight: 500 })} />
        <h1>{place.name}</h1>
        <h2>{place.formatted_address}</h2>
        <h2>{place.rating}</h2>
      </div>
    );
  }
}

export default PlacesIndexItem;
