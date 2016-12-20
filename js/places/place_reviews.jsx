import React, {Component} from 'react';

class PlaceReviews extends Component {

  render() {
    const place = this.props.placeDetails;
    const reviews = place.reviews.map(review => {
      const url = review.profile_photo_url ? `https://${review.profile_photo_url.slice(2)}` : './assets/img/no_image.png';
      return(
        <div className='review-item' key={review.time}>
          <div className='review-info'>
            <div className='review-author'>{review.author_name}</div>
            <a href={review.author_url} target="_blank"><img className='review-photo' src={url} /></a>
            {this.props.buildStars(parseInt(review.rating), 'small')}
            <div className='review-time'>{review.relative_time_description}</div>
          </div>
          <div className='review-text'>{review.text}</div>
        </div>
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
