import React from 'react';
import MyMapComponent from '../../components/GoogleMap';
import InfoPanel from '../../components/InfoPanel';
import { formatPrice } from './util';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change, getFormValues } from 'redux-form';
import InformationIcon from '../../components/InformationIcon';

const OptionalGovernmentPriceInfo = (props) => {
    if (props.info['drive_away_price']['government_charges']) {
        return (
            <div>
                <strong>
                    <span>Government charges:</span>
                </strong>
                <div className="row">
                    <span className="col-xs-6">Registration</span>
                    <span className="col-xs-6 price">
                        <strong>
                            {formatPrice(props.info['drive_away_price']['government_charges']['registration'])}
                        </strong>
                    </span>
                </div>
                <div className="row">
                    <span className="col-xs-6">Compulsory Insurance</span>
                    <span className="col-xs-6 price">
                        <strong>
                            {formatPrice(props.info['drive_away_price']['government_charges']['compulsory_insurance'])}
                        </strong>
                    </span>
                </div>
                <div className="row">
                    <span className="col-xs-6">Stamp duty</span>
                    <span className="col-xs-6 price">
                        <strong>
                            {formatPrice(props.info['drive_away_price']['government_charges']['stamp_duty'])}
                        </strong>
                    </span>
                </div>
                <div className="row">
                    <p>&nbsp;</p>
                </div>
            </div>
        );
    } else {
        return <div />;
    }
};

OptionalGovernmentPriceInfo.propTypes = {
    info: PropTypes.shape({
        drive_away_price: PropTypes.object
    })
};

class BodyComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            sidebarProps: {
                position: 'right',
                isActive: false,
                panelWidth: '343px',
                drive_away_price: {
                    model_configuration_id: 1619,
                    postcode: '2000',
                    business_usage: false,
                    premium_paint: false,

                    /*Add these lines*/
                    paint_cost: 977,
                    image_url:
                        'http://s3-ap-southeast-2.amazonaws.com/assets-public/alfaromeo-com-au_assets/header/cars/giulia-25e59c8c25b768e84eef467cc279a39c.png',
                    model_highlights_url: 'http://s3-ap-southeast-2.amazonaws.com/',
                    /*End of add these lines*/

                    drive_away_price: 30961,
                    price_type: 'normal',
                    dealer_delivery: 2995,
                    vehicle_price: 25790,
                    government_charges: {
                        stamp_duty: 864,
                        luxury_car_tax: 0,
                        registration: 403,
                        compulsory_insurance: 908.81
                    }
                }
            }
        };
    }

    render() {
        return (
            <div className="row-inner bodyComponent">
                <div className="container">
                    <div className="row image-price-row">
                        <div className="col-md-7 col-md-push-5 vehicleImage">
                            <img
                                alt={this.props.info['drive_away_price']['model_configuration_name']}
                                src={this.props.info['drive_away_price']['image_url']}
                            />
                            <p className="imageDisclaimer">
                                Overseas model shown, some features displayed may not be available in Australia. Colours
                                shown are a guide only. Please consult your preferred [Jeep] Dealership for all features
                                & colours available in Australia. [this is not in the json]
                            </p>
                        </div>
                        <div className="col-md-5 col-md-pull-7 vechiclePriceBlock">
                            <h2 className="modelName">{this.props['make']} </h2>
                            <p className="modelDetails">{this.props.info['model_name']}</p>
                            <div className="modelPrice">
                                {formatPrice(this.props.info['drive_away_price']['drive_away_price'])}{' '}
                                <InformationIcon
                                    onClick={() => {
                                        this.props.dispatch(change('pricebreakdown', 'active', true));
                                    }}
                                />
                            </div>
                            <a href={this.props.info['cta'][0].url} type="button" className="btn btn-primary">
                                Book a test drive
                            </a>
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
                                                {this.props.info.locations[0].address1 +
                                                    ' ' +
                                                    this.props.info.locations[0].city +
                                                    '  ' +
                                                    this.props.info.locations[0].state +
                                                    '  ' +
                                                    this.props.info.locations[0].postal_code}
                                            </p>
                                        </div>
                                        <div className="well well-sm">
                                            <h4>Phone</h4>
                                            <a href={'tel:' + this.props.info.locations[0].phone}>
                                                {this.props.info.locations[0].phone}
                                            </a>
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
                                            <a
                                                href={this.props.info.locations[0]['web_site']}
                                                type="button"
                                                className="btn btn-secondary"
                                            >
                                                View dealer website
                                            </a>
                                        </div>
                                    </div>
                                    <div className="split-md">
                                        <div className="well well-sm">
                                            <MyMapComponent
                                                lat={parseFloat(this.props.info.locations[0]['latitude'])}
                                                long={parseFloat(this.props.info.locations[0]['longitude'])}
                                                zoom={15}
                                                isMarkerShown
                                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVps2BAt1cA0Uyf9uSSzJxiwTIdI7nPiw&v=3.exp&libraries=geometry,drawing,places"
                                                loadingElement={<div style={{ height: '100%' }} />}
                                                containerElement={<div style={{ height: '320px' }} />}
                                                mapElement={<div style={{ height: '320px' }} />}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6">
                            <div className="panel highlights">
                                <div
                                    className="panel-heading border-line"
                                    onClick={() => {
                                        this._panel.classList.toggle('expanded');
                                    }}
                                    ref={(node) => {
                                        this._panel = node;
                                    }}
                                >
                                    <h3 className="panel-title ">Model highlights</h3>
                                </div>
                                <div className="panel-body">
                                    <h3 className="highlights-title">
                                        {this.props.info['drive_away_price']['model_configuration_name']}
                                    </h3>
                                    <div className="well well-sm">
                                        <ul className="highlights-list">
                                            {this.props.info['drive_away_price']['model_highlights'].map((e, i) => (
                                                <li key={i}>{e}</li>
                                            ))}
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
                            {this.props.info['cta'].map((e, i) => (
                                <a
                                    href={e.url}
                                    key={i}
                                    type="button"
                                    className={'btn ' + (i > 0 ? 'btn-secondary' : 'btn-primary')}
                                >
                                    {e.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="container pageDisclaimer">
                        <small>
                            The vehicle pictured does not include the features you have specified. It is featured as an
                            illustration of the model only. All information is current as at 01 February, 2016. Some
                            information presented or used in the Drive-Away Price Calculator is sourced from third
                            parties, and although every effort has been made to ensure that the information is accurate,
                            absolute accuracy cannot be guaranteed. [this is not in the json]
                        </small>
                    </div>
                </div>
                <InfoPanel active={this.props.pricebreakdown.active} formKey={'pricebreakdown'} title="Price Breakdown">
                    <section>
                        <div className="col-xs-12">
                            <div className="priceTable border-line">
                                <div className="row">
                                    <span className="col-xs-6">Vehicle Price</span>
                                    <span className="col-xs-6 price">
                                        <strong>
                                            {formatPrice(this.props.info['drive_away_price']['vehicle_price'])}
                                        </strong>
                                    </span>
                                </div>
                                <div className="row">
                                    <span className="col-xs-6">Dealer Delivery</span>
                                    <span className="col-xs-6 price">
                                        <strong>
                                            {formatPrice(this.props.info['drive_away_price']['dealer_delivery'])}
                                        </strong>
                                    </span>
                                </div>

                                <OptionalGovernmentPriceInfo {...this.props} />
                            </div>
                        </div>
                        <div className="col-xs-12">
                            <p className="priceDisclaimer">
                                {
                                    "Some information presented or used in the Drive-Away Price Calculator is sourced from third parties, and although every effort has been made to ensure that the information is accurate, absolute accuracy cannot be guaranteed. 1) Manufacturer's Retail Price (including GST). Vehicle price does not include Luxury Car Tax (LCT). 2) Dealer delivery charge (including GST) for Dealership specified, or, if no Dealership is specified, the average of dealer delivery charges (including GST) for the State or Territory of the post code entered. Individual Dealerships may charge more or less than the average dealer delivery charge. 3) Registration and/or Compulsory Insurance includes all relevant CTP and/or similar charges. For NSW and Queensland, where CTP varies according to insurer and nature of owner, the amount used for the calculation is based on rates charged by NRMA for a 40 year old male with a good driving record."
                                }
                            </p>
                        </div>
                    </section>
                </InfoPanel>
            </div>
        );
    }
}

BodyComponent.propTypes = {
    info: PropTypes.shape({
        model_name: PropTypes.string,
        cta: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string
            })
        ),
        name: PropTypes.string,
        locations: PropTypes.arrayOf,
        drive_away_price: PropTypes.shape({
            drive_away_price: PropTypes.any,
            model_configuration_name: PropTypes.string,
            image_url: PropTypes.string,
            model_highlights: PropTypes.arrayOf,
            vehicle_price: PropTypes.string,
            dealer_delivery: PropTypes.string,
            government_charges: PropTypes.shape({
                registration: PropTypes.string,
                compulsory_insurance: PropTypes.string
            })
        })
    }),
    make: PropTypes.string,
    pricebreakdown: PropTypes.any
};

BodyComponent = connect((state) => {
    return {
        pricebreakdown: getFormValues('pricebreakdown')(state) || { active: false }
    };
})(BodyComponent);

export default BodyComponent;
