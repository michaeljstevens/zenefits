import React, { Component } from 'react';
import PlaceReviews from './place_reviews.jsx';
import Slider from 'react-image-slider';

class PlaceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeDetails: null,
      currentPhoto: 0,
      details: false,
      reviews: false,
      search: false
    };
    this.renderReviews = this.renderReviews.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({details: true, placeDetails: props.placeDetails});
  }

  componentDidMount() {
    const request =  { placeId: this.props.place.place_id };
    this.props.getDetails(request);
  }

  buildStars(numStars, size) {
    let stars = [];
    for(let i = 0; i < 5; i++) {
      if (i <= numStars) {
        stars.push(<img className={`${size}-star`} key={i} src='./assets/img/star.png' />);
      } else {
        stars.push(<img className={`${size}-star`} key={i} src='./assets/img/no_star.png' />);
      }
    }
    return <div className='stars'>{stars}</div>;
  }

  renderReviews() {
    this.setState({details: !this.state.details, reviews: !this.state.reviews, search: false});
  }

  buildDetails() {
    const place = this.props.placeDetails;
    let open;
    if (place.opening_hours) {
      open = <li>{place.opening_hours.open_now ? "Open" : "Closed"}</li>;
    }
    const photos = place.photos ? place.photos.map(photo => {
      return(photo.getUrl({ maxWidth: 360, maxHeight: 200 }));
    }) : ['./assets/img/no_image.png'];

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
        {this.buildStars(parseInt(place.rating), 'big')}
        {place.reviews ? <button onClick={this.renderReviews}>Reviews</button> : "No Reviews"}
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
        {this.state.details ? this.buildDetails() : null}
        {this.state.reviews ? <PlaceReviews
          renderReviews={this.renderReviews}
          placeDetails={this.state.placeDetails}
          buildStars={this.buildStars} /> : null}
      </div>
    );
  }
}

export default PlaceDetails;
