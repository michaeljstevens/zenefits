import React, {Component} from 'react';

class PlaceReviews extends Component {
  render() {
    const place = this.props.placeDetails;
    return(
      <div>
        <div className="place-details-header">
          <img className="back-arrow" src='./assets/img/back.png' onClick={this.props.renderReviews} />
          <div className="place-detail-title">{place.name}</div>
        </div>
      </div>
    );
  }
}

export default PlaceReviews;
