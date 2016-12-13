import React, { Component } from 'react';

class PlacesIndexItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const place = this.props.place;
    return(
      <div className='place-container'>
        <img className='place-item-image' src={place.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 })} />
        <div className='place-details-container'>
          <h1 className='place-name'>{place.name}</h1>
          <h2 className='place-details'>{place.formatted_address}</h2>
        </div>
      </div>
    );
  }
}

export default PlacesIndexItem;
