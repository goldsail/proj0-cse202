import React from 'react';
import {Map, Polyline, Marker, GoogleApiWrapper} from 'google-maps-react';
import { v4 as uuidv4 } from 'uuid';

export class MapContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            locations: [
                {
                  name: 'UCSD',
                  coordinate: { lat: 32.88006, lng: -117.23401},
                },
                {
                  name: 'SeaWorld',
                  coordinate: { lat: 32.7641, lng: -117.22626},
                },
                {
                  name: 'San Diego Airport',
                  coordinate: { lat: 32.7338, lng: -117.1933},
                },
                {
                  name: 'San Diego Zoo',
                  coordinate: { lat: 32.73531, lng: -117.14904},
                },
                {
                  name: 'Mission Trails Regional Park',
                  coordinate: { lat: 32.81795, lng: 117.05601},
                },
                {
                  name: 'Balboa Park',
                  coordinate: { lat: 32.73414, lng: -117.14455},
                },
                {
                  name: 'Coronado Beach',
                  coordinate: { lat: 32.68477, lng: -117.18781},
                },
                {
                  name: 'Torrey Pines State Beach',
                  coordinate: { lat: 32.93718, lng: -117.26165},
                },
                {
                  name: 'Old Town',
                  coordinate: { lat: 32.75574, lng: -117.19763},
                },
                {
                  name: 'Seaport Village',
                  coordinate: { lat: 32.71203, lng: -117.16863},
                },
                {
                  name: 'Cabrillo National Monument',
                  coordinate: { lat: 32.67354, lng: -117.24251},
                },
                {
                  name: 'Sunset Cliffs',
                  coordinate: { lat: 32.72518, lng: -117.25305},
                },
                {
                  name: 'El Cajon Mountain Trail',
                  coordinate: { lat: 32.91394, lng: -116.85276},
                },
                {
                  name: 'Laguna Mountains',
                  coordinate: { lat: 32.84002, lng: -116.43945},
                },
                {
                  name: 'Santa Ysabel Open Space Preserve West',
                  coordinate: { lat: 33.10262, lng: -116.69601},
                },
                {
                  name: 'Otay Open Space Preserve',
                  coordinate: { lat: 32.61146, lng: -116.88321},
                },
                {
                  name: 'Sunshine Mountain Vineyard',
                  coordinate: { lat: 33.18689, lng: -117.16513},
                },
                {
                  name: 'Barnett Ranch Preserve',
                  coordinate: { lat: 33.00108, lng: -116.86382},
                },
                {
                  name: 'Elfin Forest Recreational Reserve',
                  coordinate: { lat: 33.08657, lng: -117.14508},
                },
                {
                  name: 'Alpine Trail Road',
                  coordinate: { lat: 32.81643, lng: -116.80581},
                },
                {
                  name: 'Palomar Mountain State Park',
                  coordinate: { lat: 33.33908, lng: -116.90673},
                },
                {
                  name: 'San Vicente Reservoir',
                  coordinate: { lat: 32.92576, lng: -116.92195},
                },
                {
                  name: 'Oceanside Harbor Beach',
                  coordinate: { lat: 33.20518, lng: -117.39454},
                },
                {
                  name: 'Rancho Bernardo Rec Center',
                  coordinate: { lat: 33.04829, lng: -117.07687},
                },
                {
                  name: 'Honey Springs Ranchtruck Trail',
                  coordinate: { lat: 32.69025, lng: -116.81479},
                },
                {
                  name: 'San Diego Bay National Wildlife Refuge',
                  coordinate: { lat: 32.63884, lng: -117.11063},
                },
                {
                  name: 'Pine Hills',
                  coordinate: { lat: 33.04837, lng: -116.63085},
                },
            ],
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

  onClick = () => {
    this.getDirections(['UCSD', 'Old Town', 'Sunset Cliffs', 'UCSD']);
  }

  render() {
    return <div>
      <button onClick={this.onClick}>Calculate</button>
      <Map
        style={{
          width: '100%',
          height: '100%'
        }}
        google={this.props.google}
        zoom={10}
        initialCenter={{
          lat: 32.88006,
          lng: -117.23401
        }}>
        {this.state.locations.map(location => <Marker key={location.name} name={location.name} position={location.coordinate} />)}
        {this.state.directions && <Polyline
          path={this.state.directions.routes[0].overview_path}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
        />}
      </Map>
    </div>;
  }

  getDirections = (routes) => {
    const waypoints = routes.map(route => {
      let place = this.state.locations.find(p => p.name === route);

      return {
        location: place.coordinate,
        stopover: true
      };
    })
    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;

    const directionsService = new this.props.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING',
        waypoints: waypoints
      },
      (result, status) => {
        if (status === this.props.google.maps.DirectionsStatus.OK) {
          console.log(result);
          this.setState({
            directions: result
          });
        } else {
          this.setState({ directions: null });
        }
      }
    );
  }

}


export default GoogleApiWrapper({
  apiKey: ('AIzaSyA7d4cFSeA6OtEFYNhrRR7n5nfgCem7yxQ')
})(MapContainer)
