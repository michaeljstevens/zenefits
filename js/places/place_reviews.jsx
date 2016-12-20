import React, {Component} from 'react';
import PlaceReviewItem from './place_review_item.jsx';

class PlaceReviews extends Component {

  render() {
    const place = this.props.placeDetails;
    const reviews = place.reviews.map(review => {
      return(
        <PlaceReviewItem key={review.time} review={review} buildStars={this.props.buildStars} />
      );
    });
    return(
      <div className='review-index'>
        {reviews}
      </div>
    );
  }
}

export default PlaceReviews;
