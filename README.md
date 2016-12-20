## Zenefits Coding Challenge

I used the Google Places API in connection with the Bing News API and React to create an interactive location search front end.

[Live][url]
[url]: https://michaeljstevens.github.io/zenefits/


### Features

- Uses geolocation to center map on user's current location
- Integrates with both the Google Places API and Bing News API
- Features location-based review and news pages
- Interactive markers that bounce and filtered results based on the viewport

### Architecture and Technologies

- JavaScript
- React
- jQuery(Ajax)
- CSS3/HTML5

### Instructions

- ```npm install```
- ```webpack```
- Open index.html in browser (or serve via node with ```http-server```)

### How it Works

- Step 1: Map and search box are rendered on screen and makes geolocation request.
```js
if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    map.setCenter(pos);
    this.setState({position: pos});
  });
}
```
- Step 2: When a search is made, map component passes response of call to Google Places API to PlaceIndex component and creates markers.
```js
  searchBox.addListener('places_changed', () => {

    this.state.allPlaces.forEach(place => {
      place.marker.setMap(null);
    });

    const places = searchBox.getPlaces();
    let allPlaces = [];
    const placeDetails = [];
    if(places.length === 0) return;
```
```js
  this.setState({ allPlaces: allPlaces,
    places: allPlaces,
    getDetails: getDetails,
    shouldUpdate: true });
```
- Step 3: PlaceIndex component renders list of PlaceIndexItems
```js
  <div className='places-container'>
    { this.state.index ? this.props.places.map(place => {
      this.key++;
      return <PlacesIndexItem onClick={this.showDetails(place.place)} key={this.key} place={place} />;
    }) : <PlaceDetails goBack={this.showDetails(this.state.place)}
    placeDetails={this.props.placeDetails}
    getDetails={this.props.getDetails}
    place={this.state.place} /> }
  </div>
```
- Step 4: When a place in the index is clicked, Places API is called again, this time to obtain more detail about a location. On success, details are rendered in place of the place index.
```js
  const getDetails = (request) => {
    service.getDetails(request, detailsCallback);
  };

  const detailsCallback = (results, status) => {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      this.state.allPlaces.forEach(place => {
        if (place.place.geometry.location.lat() !== results.geometry.location.lat() ||
        place.place.geometry.location.lng() !== results.geometry.location.lng()) {
          place.marker.setMap(null);
        }
      });
      this.setState({placeDetails: results});
    }
  };
```
- Step 5: User can click to see reviews, which consist of data from the details Places API response.
```js
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
```
- Step 6: User can click to see news about the location, which uses Ajax to access the Bing News API, and receives and parses the response.

```js
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
```

### Screenshots
<div style='display: flex; width: 560px; flex-wrap: wrap; justify-content: space-between'>
  <img style='height: 150px; width: 275px; margin-bottom: 10px' src='./assets/img/screenshots/home.png' />
  <img style='height: 150px; width: 275px; margin-bottom: 10px' src='./assets/img/screenshots/search.png' />
  <img style='height: 150px; width: 275px; margin-bottom: 10px' src='./assets/img/screenshots/index.png' />
  <img style='height: 150px; width: 275px; margin-bottom: 10px' src='./assets/img/screenshots/reviews.png' />
  <img style='height: 150px; width: 275px'; margin-bottom: 10px src='./assets/img/screenshots/news.png' />
  <img style='height: 150px; width: 275px; margin-bottom: 10px' src='./assets/img/screenshots/nearby.png' />
</div>
