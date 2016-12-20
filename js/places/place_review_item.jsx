import React, { Component } from 'react';

class PlaceReviewItem extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.review.text.length);
    this.state = {
      shortText: `${this.props.review.text.trim().substring(0, 150)}...`,
      longText: this.props.review.text,
      expandable: this.props.review.text.length >= 150 ? true : false,
      expanded: false
    };
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  toggleExpand() {
    this.setState({expanded: !this.state.expanded});
  }

  render() {
    const url = this.props.review.profile_photo_url ?
    `https://${this.props.review.profile_photo_url.slice(2)}` : './assets/img/no_image.png';

    const expand = <div className='review-expand' onClick={this.toggleExpand}>{this.state.expanded ? "Less" : "More"}</div>;

    return(
      <div className='review-item'>
        <a href={this.props.review.author_url} target="_blank"><div className='review-info'>
          <img className='review-photo' src={url} />
          {this.props.buildStars(parseInt(this.props.review.rating), 'small')}
          <div className='review-author'>{this.props.review.author_name}</div>
          <div className='review-time'>{this.props.review.relative_time_description}</div>
        </div></a>
        <div className='review-text'>{this.state.expandable && !this.state.expanded ?
          this.state.shortText : this.state.longText}
          {this.state.expandable ? expand : null}
        </div>
      </div>
    );
  }
}

export default PlaceReviewItem;
