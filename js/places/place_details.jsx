import React, { Component } from 'react';
import Slider from 'react-image-slider';

class PlaceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPhoto: 0
    };
  }

  componentDidMount() {
    const request =  { placeId: this.props.place.place_id };
    this.props.getDetails(request);
  }

  buildStars(numStars) {
    let stars = [];
    for(let i = 0; i < 5; i++) {
      if (i <= numStars) {
        stars.push(<img className='star' src='./assets/img/star.png' />);
      } else {
        stars.push(<img className='star' src='./assets/img/no_star.png' />);
      }
    }
    return stars;
  }

  buildDetails() {
    const place = this.props.placeDetails;
    let open;
    if (place.opening_hours) {
      open = <li>Currently {place.opening_hours.open_now ? "Open" : "Closed"}</li>;
    }
    const photos = place.photos ? place.photos.map(photo => {
      return(photo.getUrl({ maxWidth: 360, maxHeight: 200 }));
    }) : ['./assets/img/no_image.png'];

    const reviews = place.reviews ? place.reviews.map(review => {
      const url = review.profile_photo_url ? `https://${review.profile_photo_url.slice(2)}` : './assets/img/no_image.png';
      return(
        <div>
          <div>{review.author_name}</div>
          <a href={review.author_url} target="_blank"><img className='review-photo' src={url} /></a>
        </div>
      );
    }) : [<div>No Reviews</div>];

    console.log(place);

    return(<div className="place-detail-container">
      <div className="place-details-header">
        <img className="back-arrow" src='./assets/img/back.png' onClick={this.props.goBack} />
        <div className="place-detail-title">{place.name}</div>
      </div>
      <div className="photo-slider">
        <Slider images={photos} isInfinite delay={5000}>
          {photos.map(photo => {
            return(<img className="slide-image" key={photo} src={photo} />);
          })}
        </Slider>
      </div>
      <div className="reviews">
        {this.buildStars(parseInt(place.rating))}
        <div className="review-index">
          {reviews}
        </div>
      </div>
      <div className="place-details-info">
        <ul>
          {open}
          <li>{place.formatted_address}</li>
          <li><a href={place.website} target="_blank">{place.website}</a></li>
          <li>{place.formatted_phone_number}</li>
        </ul>
      </div>
    </div>);
  }

  render() {
    return(
      <div>
        {this.props.placeDetails ? this.buildDetails() : null}
      </div>
    );
  }
}

export default PlaceDetails;
