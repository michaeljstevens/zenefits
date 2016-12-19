import React, { Component } from 'react';
import Slider from 'react-slick';

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

  buildDetails() {
    const place = this.props.placeDetails;
    const photos = place.photos ? place.photos.map(photo => {
      return(<img key={photo.getUrl({ maxWidth: 360, maxHeight: 200 })} src={photo.getUrl({ maxWidth: 360, maxHeight: 200 })} />);
    }) : <img className='place-item-image' src='./assets/img/no_image.png' />;
    const sliderOptions = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true
    };
    console.log(place);
    return(<div>
      <div className="place-details-header">
        <img className="back-arrow" src='./assets/img/back.png' onClick={this.props.goBack} />
        <div className="place-detail-title">{place.name}</div>
      </div>
      <div className="photo-slider">
        <Slider {...sliderOptions}>
          {photos}
        </Slider>
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
