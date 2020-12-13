import React, {Fragment} from 'react';
import { Map, Polyline, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import backtracking from '../algorithm/Backtracking';
import StarRatingComponent from 'react-star-rating-component';
import ReactDOM from "react-dom";


export class MapContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeMarker: null,
            activePlace: null,
            cost: 240,
            locations: [
                {
                  name: 'UCSD',
                  coordinate: { lat: 32.88006, lng: -117.23401},
                  score: 5,
                  cost: 0,
                },
                {
                  name: 'SeaWorld',
                  coordinate: { lat: 32.7641, lng: -117.22626},
                  score: 3,
                  cost: 90,
                },
                {
                  name: 'San Diego Airport',
                  coordinate: { lat: 32.7338, lng: -117.1933},
                  score: 1,
                  cost: 10,
                },
                {
                  name: 'San Diego Zoo',
                  coordinate: { lat: 32.73531, lng: -117.14904},
                  score: 4,
                  cost: 120,
                },
                {
                  name: 'Balboa Park',
                  coordinate: { lat: 32.73414, lng: -117.14455},
                  score: 3,
                  cost: 30,
                },
                {
                  name: 'Coronado Beach',
                  coordinate: { lat: 32.68477, lng: -117.18781},
                  score: 4,
                  cost: 45,
                },
                {
                  name: 'Torrey Pines State Beach',
                  coordinate: { lat: 32.93718, lng: -117.26165},
                  score: 3,
                  cost: 40,
                },
                {
                  name: 'Old Town',
                  coordinate: { lat: 32.75574, lng: -117.19763},
                  score: 2,
                  cost: 60,
                },
                {
                  name: 'Seaport Village',
                  coordinate: { lat: 32.71203, lng: -117.16863},
                  score: 3,
                  cost: 20,
                },
                {
                  name: 'Cabrillo National Monument',
                  coordinate: { lat: 32.67354, lng: -117.24251},
                  score: 2,
                  cost: 20,
                },
                {
                  name: 'Sunset Cliffs',
                  coordinate: { lat: 32.72518, lng: -117.25305},
                  score: 3,
                  cost: 30,
                },
                {
                  name: 'El Cajon Mountain Trail',
                  coordinate: { lat: 32.91394, lng: -116.85276},
                  score: 3,
                  cost: 150,
                },
                {
                  name: 'Laguna Mountains',
                  coordinate: { lat: 32.84002, lng: -116.43945},
                  score: 4,
                  cost: 120,
                },
                {
                  name: 'Santa Ysabel Open Space Preserve West',
                  coordinate: { lat: 33.10262, lng: -116.69601},
                  score: 3,
                  cost: 90,
                },
                {
                  name: 'Otay Open Space Preserve',
                  coordinate: { lat: 32.61146, lng: -116.88321},
                  score: 5,
                  cost: 90,
                },
                {
                  name: 'Sunshine Mountain Vineyard',
                  coordinate: { lat: 33.18689, lng: -117.16513},
                  score: 4,
                  cost: 90,
                },
                {
                  name: 'Elfin Forest Recreational Reserve',
                  coordinate: { lat: 33.08657, lng: -117.14508},
                  score: 2,
                  cost: 50,
                },
                {
                  name: 'Alpine Trail Road',
                  coordinate: { lat: 32.81643, lng: -116.80581},
                  score: 3,
                  cost: 75,
                },
                {
                  name: 'Palomar Mountain State Park',
                  coordinate: { lat: 33.33908, lng: -116.90673},
                  score: 5,
                  cost: 90,
                },
                {
                  name: 'San Vicente Reservoir',
                  coordinate: { lat: 32.92576, lng: -116.92195},
                  score: 4,
                  cost: 30,
                },
                {
                  name: 'Rancho Bernardo Rec Center',
                  coordinate: { lat: 33.04829, lng: -117.07687},
                  score: 5,
                  cost: 20,
                },
                {
                  name: 'Honey Springs Ranchtruck Trail',
                  coordinate: { lat: 32.69025, lng: -116.81479},
                  score: 2,
                  cost: 80,
                },
                {
                  name: 'San Diego Bay National Wildlife Refuge',
                  coordinate: { lat: 32.63884, lng: -117.11063},
                  score: 3,
                  cost: 20,
                },
                {
                  name: 'Pine Hills',
                  coordinate: { lat: 33.04837, lng: -116.63085},
                  score: 5,
                  cost: 30,
                },
            ],
            distanceMatrix: [[0,19,18,22,20,26,16,16,22,32,24,45,64,66,42,42,40,45,90,34,28,50,29,83],[18,0,12,15,13,19,22,9,15,20,12,44,57,68,36,45,43,38,93,33,31,43,22,86],[19,15,0,11,10,16,23,8,11,23,15,44,57,68,32,45,43,38,93,33,31,39,18,86],[22,18,13,0,2,14,25,12,13,28,20,43,57,67,31,44,42,38,92,32,30,40,17,85],[19,15,10,1,0,11,23,9,10,25,17,41,55,65,28,42,40,36,90,30,28,37,14,83],[26,22,17,14,12,0,30,16,16,32,24,46,60,72,32,49,47,41,97,35,35,42,18,90],[11,23,22,25,23,30,0,20,25,36,28,47,66,64,45,41,37,47,88,36,26,52,32,82],[17,11,8,11,10,17,21,0,14,22,14,39,53,64,32,41,39,34,89,28,26,40,20,81],[21,16,12,11,8,14,24,11,0,27,18,42,55,67,31,44,43,36,92,31,30,38,17,84],[34,23,24,28,26,32,38,22,27,0,12,56,70,81,48,58,56,51,106,45,43,56,35,98],[25,14,15,18,17,23,29,13,18,11,0,47,61,72,39,48,46,42,96,36,34,46,25,89],[46,45,44,43,42,46,46,40,45,56,48,0,54,41,47,61,59,35,84,22,46,55,45,58],[61,57,55,54,53,57,62,51,56,67,59,52,0,42,51,78,76,32,82,43,63,44,56,41],[64,69,68,67,66,70,61,64,70,80,72,40,43,0,72,59,56,62,45,43,47,75,69,19],[41,37,32,29,27,31,42,31,31,47,39,46,53,71,0,61,59,42,108,35,46,26,25,81],[40,46,44,44,42,49,37,41,46,57,49,61,81,60,61,0,23,62,70,45,19,68,49,78],[38,43,42,41,40,46,36,38,44,54,46,58,78,57,58,23,0,59,73,42,16,65,47,74],[44,40,38,38,36,40,45,34,39,50,42,35,33,62,42,61,59,0,105,26,46,35,39,63],[90,95,94,93,92,98,87,90,96,106,98,84,84,45,110,70,73,105,0,87,69,116,99,60],[35,35,33,32,31,35,35,29,34,45,37,22,46,43,37,45,43,27,87,0,30,44,34,61],[27,32,31,30,29,35,23,27,32,43,35,47,67,47,47,21,19,48,69,31,0,54,36,65],[51,46,42,40,38,42,51,40,41,56,48,53,46,75,26,68,66,35,116,42,53,0,41,74],[29,25,20,17,15,19,32,20,19,35,27,45,58,70,27,50,48,39,98,34,36,41,0,87],[81,87,85,84,83,87,78,81,87,97,89,57,41,18,81,76,73,62,58,60,64,73,86,0]],
            routes: [
              {
                name: 'UCSD',
                coordinate: { lat: 32.88006, lng: -117.23401},
              },
              {
                name: 'Old Town',
                coordinate: { lat: 32.75574, lng: -117.19763},
              },
              {
                name: 'Sunset Cliffs',
                coordinate: { lat: 32.72518, lng: -117.25305},
              },
              {
                name: 'UCSD',
                coordinate: { lat: 32.88006, lng: -117.23401},
              }
            ],
            directions: null
        }
    }

  onChangeRating = (nextValue, prevValue, name) => {
    console.debug(nextValue);
    let temp = this.state.locations;
    for (var i in temp) {
      if (temp[i].name === name) {
         temp[i].score = nextValue;
         break;
      }
    };
    this.setState({
      locations: temp
    });
  }

  onClick = () => {
    let self = this;
    this.onButtonClick(self);
  }

  onButtonClick = async function(self) {
    self.getDistanceMatrix(self).then(distanceMatrix => {
      console.log(distanceMatrix);
      self.getRoutes(self).then(routes => {
        self.getDirections(self, routes);
      });
      // let routes = ['UCSD', 'Old Town', 'Sunset Cliffs', 'UCSD'];
    }).catch(error => {
      console.log(error);
    });

  }

  onMarkerClick = (props, marker, e) => {
    console.debug(props);
    console.debug(marker);
    this.setState({
      activeMarker: marker,
      activePlace: props
    });
  }

  onMapClick = (props) => {
    console.debug(null);
    console.debug(null);
    this.setState({
      activeMarker: null,
      activePlace: null
    })
  }

  // https://stackoverflow.com/questions/2217267/click-event-in-google-map-infowindow-not-caught
  onInfoWindowOpen = () => {
    const div = (<div>
      {this.state.activePlace ? <div>
        <h2>{this.state.activePlace.name}</h2>
        <StarRatingComponent
        name={this.state.activePlace.name}
        value={this.state.locations.find(p => p.name === this.state.activePlace.name).score}
        starCount={5}
        onStarClick={this.onChangeRating}
        />
        <p>Sugguest time cost: {this.state.locations.find(p => p.name === this.state.activePlace.name).cost} minutes.</p>
      </div> : <div/>}
      </div>);
      ReactDOM.render(React.Children.only(div), document.getElementById("infoWindowContent"));

  }

  render() {
    return <div>

      <div>
        Total time budget:
        <input type="number" name="cost" style={{'marginLeft': '20px', 'marginRight': '20px'}}
          value={this.state.cost}
          onChange={e => {this.setState({cost: e.target.value})}}/>
        minutes
      </div>
      <button onClick={this.onClick}>Calculate</button>
      <Map
        style={{
          width: '100%',
          height: '100%'
        }}
        google={this.props.google}
        zoom={10}
        onClick={this.onMapClick}
        initialCenter={{
          lat: 32.88006,
          lng: -117.23401
        }}>
        {this.state.locations.map(location => <Marker
          key={location.name}
          name={location.name}
          position={location.coordinate}
          onClick={this.onMarkerClick} />)}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.activeMarker !== null}
          onOpen={this.onInfoWindowOpen}
          onClose={this.onMapClick}>
            <div id="infoWindowContent"/>
        </InfoWindow>
        {this.state.directions && <Polyline
          path={this.state.directions.routes[0].overview_path}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
        />}
      </Map>
    </div>;
  }

  async getDistanceMatrix(self) {
    return self.state.distanceMatrix; // the result is cached here
    /*
    const distanceMatrixService = new self.props.google.maps.DistanceMatrixService();
    const coordinates = self.state.locations.map(p => p.coordinate);
    const n = self.state.locations.length;
    let matrix = new Array(n);
    for (let i = 0; i < n; i++) {
      matrix[i] = new Array(n);
    }
    for (let i = 0; i < n; i += 10) {
      for (let j = 0; j < n; j += 10) {
        let rows = await new Promise((resolve, reject) => {
          distanceMatrixService.getDistanceMatrix(
              {
                origins: coordinates.slice(i, i + 10),
                destinations: coordinates.slice(j, j + 10),
                travelMode: 'DRIVING',
              }, (response, status) => {
                console.log(status);
                if (status === self.props.google.maps.DirectionsStatus.OK) {
                  console.log(response.rows);
                  resolve(response.rows);
                } else {
                  console.log(response);
                  reject(response);
                }
              });
          });
          for (let u = 0; u < 10 && i + u < n; u++) {
            for (let v = 0; v < 10 && j + v < n; v++) {
              let element = rows[u].elements[v];
              matrix[i + u][j + v] = element.status === 'OK' ? Math.floor(element.duration.value / 60) : 0;
            }
          }
          await new Promise(resolve => {setTimeout(resolve, 10000)}); // One query per 10 seconds to avoid quota limit
        }
      }
    return matrix;
    */
  }

  async getRoutes(self) {
    const locations = self.state.locations;
    const budget = self.state.cost;
    const distanceMatrix = await self.getDistanceMatrix(self);
    const result = await backtracking(locations, budget, distanceMatrix);
    return result.map(p => locations[p].name).concat([locations[0].name]);
  }

  async getDirections(self, routes) {
    const waypoints = routes.map(route => {
      let place = self.state.locations.find(p => p.name === route);
      if (place === undefined) {
        console.log(routes);
      }
      return {
        location: place.coordinate,
        stopover: true
      };
    })
    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;

    const directionsService = new self.props.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING',
        waypoints: waypoints
      },
      (result, status) => {
        if (status === self.props.google.maps.DirectionsStatus.OK) {
          console.log(result);
          self.setState({
            directions: result
          });
        } else {
          self.setState({ directions: null });
        }
      }
    );
  }

}


export default GoogleApiWrapper({
  apiKey: ('AIzaSyA7d4cFSeA6OtEFYNhrRR7n5nfgCem7yxQ')
})(MapContainer)
