import React, { Component } from 'react';
import PlaceReviews from './place_reviews.jsx';
import PlaceSearch from './place_search.jsx';
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
    this.renderSearch = this.renderSearch.bind(this);
    this.navigate = this.navigate.bind(this);
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
      if (i < numStars) {
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

  renderSearch() {
    this.setState({details: !this.state.details, reviews: false, search: !this.state.search});
  }

  navigate(loc) {

    const reviews = this.state.details && loc === 'reviews' ? true : false;
    const search = this.state.details && loc === 'search' ? true : false;

    this.setState({
      details: !this.state.details,
      reviews: reviews,
      search: search
    });
  }

  buildDetails() {
    const place = this.props.placeDetails;
    let open;
    if (place.opening_hours) {
      open = (
        <div>
          {place.opening_hours.open_now ? "Open" : "Closed"} Now
          <ul style={{marginBottom: '10px'}}>
            {place.opening_hours.weekday_text.map(day => {
              return <li style={{fontSize: '13px', color: 'grey', padding: '2px'}} key={day}>{day}</li>;
            })}
          </ul>
        </div>
      );
    }
    const photos = place.photos ? place.photos.map(photo => {
      return(photo.getUrl({ maxWidth: 360, maxHeight: 200 }));
    }) : ['./assets/img/no_image.png'];

    console.log(place);

    let rating = 0;

    if (!place.rating && place.reviews) {
      let sum = 0;
      place.reviews.forEach(review => {
        sum += review.rating;
      });
      rating = parseInt(sum / place.reviews.length);
    } else if (place.rating) {
      rating = parseInt(place.rating);
    }


    return(<div>
      <div className="photo-slider">
        <Slider images={photos} isInfinite delay={5000}>
          {photos.map(photo => {
            return(<img className="slide-image" key={photo} src={photo} />);
          })}
        </Slider>
      </div>
      <div className="reviews">
        {this.buildStars(rating, 'big')}
        {place.reviews ? <button className='detail-buttons'
          onClick={this.renderReviews}>{place.reviews.length} Reviews</button> :
          <div className='detail-buttons'>No Reviews</div>}
      </div>
      <button style={{fontSize: '25px', textAlign: 'right'}} className='detail-buttons'
        onClick={this.renderSearch}>{place.name} News</button>
      <div className="place-details-info">
        <ul>
          {open}
          <li>
            <img style={{height: '30px'}} src='./assets/img/compass.jpg' />
            <div>{place.formatted_address}</div>
          </li>
          <li>
            <img style={{height: '25px'}} src='./assets/img/web.png' />
            <div><a href={place.website} target="_blank">{place.website}</a></div>
          </li>
          <li>
            <img style={{height: '25px'}} src='./assets/img/phone.png' />
            <div>{place.formatted_phone_number}</div>
          </li>
        </ul>
      </div>
    </div>);
  }

  render() {
    return(
      <div>
        <div className="place-details-header">
          <img className="back-arrow" src='./assets/img/back.png' onClick={this.state.details ? this.props.goBack : this.navigate} />
          <div className="place-detail-title">{this.props.place.name}</div>
        </div>
        <div className="place-details-container">
          {this.state.details ? this.buildDetails() : null}
          {this.state.reviews ? <PlaceReviews
            placeDetails={this.state.placeDetails}
            buildStars={this.buildStars} /> : null}
          {this.state.search ? <PlaceSearch
            place={this.props.place} /> : null}
        </div>
      </div>
    );
  }
}

export default PlaceDetails;
