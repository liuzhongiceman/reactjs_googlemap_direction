import React from "react"
import { withScriptjs, withGoogleMap, GoogleMap} from "react-google-maps"
import { apiKey} from "../constant";

const { compose, withProps, lifecycle } = require("recompose");
const {
    DirectionsRenderer,
} = require("react-google-maps");
const google = window.google;

const start = {
    lat: 37.7577627,
    lng: -122.4726194
}

const end = {
    lat: 37.3706296,
    lng: -121.9693781
}

const middlePoints = [
    {
        lat: 37.5022685,
        lng: -122.1811754
    },
    {
        lat: 37.4219999,
        lng: -122.0862408
    }
]

const MapWithADirectionsRenderer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + apiKey,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidMount() {
            const DirectionsService = new google.maps.DirectionsService();
            DirectionsService.route({
                origin: new google.maps.LatLng(start.lat, start.lng),
                destination: new google.maps.LatLng(end.lat, end.lng),
                waypoints: [
                    { location: new google.maps.LatLng(middlePoints[0].lat, middlePoints[0].lng), stopover: true },
                    { location: new google.maps.LatLng(middlePoints[1].lat, middlePoints[1].lng), stopover: true }
                ],     
                travelMode: google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    console.log("result",result)
                    this.setState({
                        directions: result,
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });
        }
    })
)(props =>
    <GoogleMap
        defaultZoom={7}
        defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
    >
        {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
);


class MyFancyComponent extends React.PureComponent {
    render() {
        return (
            <MapWithADirectionsRenderer />
        )
    }
}

export default MyFancyComponent;