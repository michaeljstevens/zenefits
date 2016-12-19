import React, { Component } from 'react';

class PlaceDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const request =  { placeId: this.props.place.place_id };
    this.props.getDetails(request);
  }

  render() {
    return(
      <div>
        <img className="back-arrow" src='./assets/img/back.png' onClick={this.props.goBack} />
      </div>
    );
  }
}

export default PlaceDetails;
