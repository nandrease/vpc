import React from "react";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={props.zoom}
        defaultCenter={{lat: props.lat, lng: props.long}}
    >
        {props.isMarkerShown && <Marker position={{lat: props.lat, lng: props.long}}/>}
    </GoogleMap>
));

MyMapComponent.defaultProps = {
    zoom : 8
};

export default MyMapComponent;
