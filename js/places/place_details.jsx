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
    const photos = place.photos ? place.photos.map(photo => {
      return(<img className="slide-image" key={photo.getUrl({ maxWidth: 360, maxHeight: 200 })} src={photo.getUrl({ maxWidth: 360, maxHeight: 200 })} />);
    }) : <img className='place-item-image' src='./assets/img/no_image.png' />;
    const sliderOptions = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    console.log(place);

    return(<div className="place-detail-container">
      <div className="place-details-header">
        <img className="back-arrow" src='./assets/img/back.png' onClick={this.props.goBack} />
        <div className="place-detail-title">{place.name}</div>
      </div>
      <div className="photo-slider">
        <Slider {...sliderOptions}>
          {photos}
        </Slider>
      </div>
      <div className="reviews">
        {this.buildStars(parseInt(place.rating))}
      </div>
      <div className="place-details-info">
        <ul>
          <li>Currently {place.opening_hours.open_now ? "Open" : "Closed"}</li>
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
