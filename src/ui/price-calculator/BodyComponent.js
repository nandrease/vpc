import React from 'react';
import MyMapComponent from '../../components/GoogleMap'
import InfoPanel from '../../components/InfoPanel';
import {formatPrice} from "./util";

class BodyComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sidebarProps: {
                "position": 'right',
                "isActive": false,
                "panelWidth": '343px',
                "drive_away_price":
                    {
                        "model_configuration_id": 1619,
                        "postcode": "2000",
                        "business_usage": false,
                        "premium_paint": false,

                        /*Add these lines*/
                        "paint_cost": 977,
                        "image_url": "http://s3-ap-southeast-2.amazonaws.com/assets-public/alfaromeo-com-au_assets/header/cars/giulia-25e59c8c25b768e84eef467cc279a39c.png",
                        "model_highlights_url": "http://s3-ap-southeast-2.amazonaws.com/",
                        /*End of add these lines*/

                        "drive_away_price": 30961,
                        "price_type": "normal",
                        "dealer_delivery": 2995,
                        "vehicle_price": 25790,
                        "government_charges":
                            {
                                "stamp_duty": 864,
                                "luxury_car_tax": 0,
                                "registration": 403,
                                "compulsory_insurance": 908.81
                            }
                    }
            }
        }
    }


    render() {
        return (
            <div className="row-inner bodyComponent">
                <div className="container">
                    <div className="row image-price-row">
                        <div className="col-md-7 col-md-push-5 vehicleImage">
                            <img alt={this.props.info['drive_away_price']['model_configuration_name']}
                                 src={this.props.info['drive_away_price']['image_url']}/>
                            <p className="imageDisclaimer">Overseas model shown, some features displayed may not be
                                available in Australia. Colours shown are a guide only. Please consult your preferred
                                [Jeep] Dealership for all features & colours available in Australia. [this is not in the json]</p>
                        </div>
                        <div className="col-md-5 col-md-pull-7 vechiclePriceBlock">
                            <h2 className="modelName">[MAKE] {this.props.info['model_name']}</h2>
                            <p className="modelDetails">Details</p>
                            <div className="modelPrice">{formatPrice(this.props.info['drive_away_price']['drive_away_price'])} <i className="color-info"/></div>
                            <a href={this.props.info['cta'][0].url} type="button" className="btn btn-primary">Book a test drive</a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-lg-6">
                            <div className="panel dealer">
                                <div className="panel-heading border-line">
                                    <h3 className="panel-title">Your nearest dealer</h3>
                                </div>
                                <div className="panel-body">
                                    <div className="split-md">
                                        <h3 className="dealer-title">{this.props.info.name}</h3>
                                        <div className="well well-sm">
                                            <h4>Address</h4>
                                            <p>
                                                {this.props.info.locations[0].address1 + " " +
                                                this.props.info.locations[0].city + "  " +
                                                this.props.info.locations[0].state + "  " +
                                                this.props.info.locations[0].postal_code}
                                            </p>
                                        </div>
                                        <div className="well well-sm">
                                            <h4>Phone</h4>
                                            <p>{this.props.info.locations[0].phone}</p>
                                        </div>
                                        <div className="well well-sm">
                                            <h4>Opening hours</h4>
                                            <table width="60%">
                                                <tbody>
                                                <tr>
                                                    <td>Monday</td>
                                                    <td>{this.props.info.locations[0]['monday_hours']}</td>
                                                </tr>
                                                <tr>
                                                    <td>Tuesday</td>
                                                    <td>{this.props.info.locations[0]['tuesday_hours']}</td>
                                                </tr>
                                                <tr>
                                                    <td>Wednesday</td>
                                                    <td>{this.props.info.locations[0]['wednesday_hours']}</td>
                                                </tr>
                                                <tr>
                                                    <td>Thursday</td>
                                                    <td>{this.props.info.locations[0]['thursday_hours']}</td>
                                                </tr>
                                                <tr>
                                                    <td>Friday</td>
                                                    <td>{this.props.info.locations[0]['friday_hours']}</td>
                                                </tr>
                                                <tr>
                                                    <td>Saturday</td>
                                                    <td>{this.props.info.locations[0]['saturday_hours']}</td>
                                                </tr>
                                                <tr>
                                                    <td>Sunday</td>
                                                    <td>{this.props.info.locations[0]['sunday_hours']}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="well well-sm">
                                            <a href={this.props.info.locations[0]['web_site']} type="button" className="btn btn-secondary">View dealer website</a>
                                        </div>
                                    </div>
                                    <div className="split-md">
                                        <div className="well well-sm">
                                            <MyMapComponent
                                                lat={parseFloat(this.props.info.locations[0]['latitude'])} long={parseFloat(this.props.info.locations[0]['longitude'])}
                                                zoom={15}
                                                isMarkerShown
                                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVps2BAt1cA0Uyf9uSSzJxiwTIdI7nPiw&v=3.exp&libraries=geometry,drawing,places"
                                                loadingElement={<div style={{height: `100%`}}/>}
                                                containerElement={<div style={{height: `320px`}}/>}
                                                mapElement={<div style={{height: `320px`}}/>}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6">
                            <div className="panel highlights">
                                <div className="panel-heading border-line">
                                    <h3 className="panel-title">Model highlights</h3>
                                </div>
                                <div className="panel-body">
                                    <h3 className="highlights-title">{this.props.info['drive_away_price']['model_configuration_name']}</h3>
                                    <div className="well well-sm">
                                        <ul className="highlights-list">
                                            {
                                                this.props.info['drive_away_price']['model_highlights'].map((e,i)=> <li key={i}>{e}</li>)
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row-inner bottomBar">
                    <div className="container">
                        <div className="text-center">
                            {this.props.info['cta'].map((e,i) => <a href={e.url} key={i} type="button" className="btn btn-primary">{e.name}</a>)}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="container pageDisclaimer">
                        <small>The vehicle pictured does not include the features you have specified. It is featured as
                            an illustration of the model only.
                            All information is current as at 01 February, 2016. Some information presented or used in
                            the Drive-Away Price Calculator is sourced from third parties, and although every effort has
                            been made to ensure that the information is accurate, absolute accuracy cannot be
                            guaranteed. [this is not in the json]
                        </small>
                    </div>
                </div>
                <InfoPanel sidebar={this.state.sidebarProps} title="Price Breakdown" />

            </div>
        );
    }
}

export default BodyComponent;
