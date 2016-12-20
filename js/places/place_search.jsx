import React, { Component } from 'react';
import $ from 'jquery';

class PlaceSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: null
    };
  }

  componentDidMount() {
    const place=this.props.place;

    const url = `https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=${place.name}
    &count=20&offset=0&mkt=en-us&safeSearch=Moderate`;

    const success = (response) => {
      console.log(response.value);
      this.setState({ searchResults: response.value });
    };

    const error = (err) => {
      console.log(err);
    };


    $.ajax({
      method: 'GET',
      url: url,
      headers: {
        'Ocp-Apim-Subscription-Key': 'e5cfe335eedf4c17b33b200c16f1b43c'
      },
      success,
      error
    });
  }


  render() {
    const place=this.props.place;
    return(
      <div>
        <div className="news-index">
          {this.state.searchResults ? this.state.searchResults.map(result => {
            return(
              <a key={result.url} style={{textDecoration: 'none', color: 'black'}} href={result.url} target="_blank"><div className='news-item'>
                <div>
                  <img className='news-thumbnail' src={result.image ? result.image.thumbnail.contentUrl : './assets/img/no_image.png'} />
                </div>
                <div className='news-text'>
                  {result.name}
                  <div style={{marginTop: '10px', textAlign: 'right'}} className='review-time'>{result.datePublished.substring(0,10)}</div>
                </div>
              </div></a>
            );
          }) : null}
        </div>
      </div>
    );
  }
}


export default PlaceSearch;
