import React, { Component } from 'react';

class PlacesIndexItem extends Component {
  constructor(props) {
    super(props);
    this.bounceMarker = this.bounceMarker.bind(this);
    this.stopBounce = this.stopBounce.bind(this);
  }

  bounceMarker() {
    this.props.place.marker.setAnimation(google.maps.Animation.BOUNCE);
  }

  stopBounce() {
    this.props.place.marker.setAnimation(null);
  }

  render() {
    const place = this.props.place.place;
    const img = place.photos ? place.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 }) : './assets/img/no_image.png';
    return(
      <div onMouseOver={this.bounceMarker} onMouseOut={this.stopBounce}
        onClick={this.props.onClick} className='place-container'>
        <img className='place-item-image' src={img} />
        <div className='place-index-details-container'>
          <h1 className='place-name'>{place.name}</h1>
          <h2 className='place-details'>{place.formatted_address}</h2>
        </div>
      </div>
    );
  }
}

export default PlacesIndexItem;
