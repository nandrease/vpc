import React from "react";
import {Panel} from "react-bootstrap";
import "./info-panel.css";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {change} from "redux-form";

class PanelInstance extends React.Component {

    constructor(props){
        super();
        this.state = {
            active : props.active,
        };
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({active:nextProps.active});
        document.body.classList.toggle("noscroll" , nextProps.active);
    };

    render = () => {
        const sidebar  = {
            position: "right",
            panelWidth: "420px",
        };
        return (
            <section className={"open-panel " + (this.state.active ? "show" : "hide") } onClick={() => { this.props.dispatch(change(this.props.formKey , "active" , false )); }}>
                <Panel className={"info-panel " + sidebar.position} style={{maxWidth: sidebar.panelWidth}}>
                    <Panel.Heading>{this.props["title"]}
                        <span className="close-icon" onClick={() => { this.props.dispatch(change(this.props.formKey , "active" , false )); }} aria-label="Close" aria-hidden="true">&times;</span>
                    </Panel.Heading>
                    <Panel.Body>
                        {this.props.children}
                    </Panel.Body>
                </Panel>
            </section>
        );
    }
}

PanelInstance.propTypes = {
    active : PropTypes.bool,
    title : PropTypes.string,
    formKey : PropTypes.string
};

PanelInstance = connect()(PanelInstance);

/*
const panelInstance = (props) => {
// eslint-disable-next-line react/prop-types
    const { sidebar, title } = props;

    const closeClick = () => {
        sidebar.isActive=!sidebar.isActive;
        //Disable page scrolling when panel is opened
        sidebar.isActive ? document.body.classList.add("noscroll", sidebar.isActive) : document.body.classList.remove("noscroll", sidebar.isActive);
    };

    return (
        <section className={"open-panel " + (sidebar.isActive ? "show" : "hide")}>
            <Panel className={"info-panel " + sidebar.position} style={{maxWidth: sidebar.panelWidth}}>
                <Panel.Heading>{title}
                    <span className="close-icon" onClick={closeClick} aria-label="Close" aria-hidden="true">&times;</span>
                </Panel.Heading>
                <Panel.Body>
                    {/!* Colors block *!/}
                    {sidebar.colors && sidebar.colors.map((item, key)=>(
                        <section key={key}>
                            <div className="col-sm-12">
                                <div className="color-type-title border-line">
                                    <h4>{item.type} {item.paint_cost>0 && "(+$"+item.paint_cost+")"}</h4>
                                </div>
                            </div>
                            {item.palette.map((color, k)=>(
                                <div className="col-sm-6" key={k}>
                                    <div className="color-item" onClick={closeClick} style={{"background":color.color}}></div>
                                    <p className="color-name text-center">{color.name}</p>
                                </div>
                            ))}
                        </section>
                    ))}
                    {/!* Price Breakdown *!/}
                    {sidebar.drive_away_price &&
          <section>
              <div className="col-xs-12">
                  <div className="priceTable border-line">
                      <div className="row">
                          <span className="col-xs-6">Vehicle Price</span>
                          <span className="col-xs-6 price"><strong>${sidebar.drive_away_price.drive_away_price}</strong></span>
                      </div>
                      <div className="row">
                          <span className="col-xs-6">Dealer Delivery</span>
                          <span className="col-xs-6 price"><strong>${sidebar.drive_away_price.dealer_delivery}</strong></span>
                      </div>
                      {sidebar.drive_away_price.government_charges &&
                    <div>
                        <strong><span>Covernment charges:</span></strong>
                        <div className="row">
                            <span className="col-xs-6">Registration</span>
                            <span className="col-xs-6 price"><strong>${sidebar.drive_away_price.government_charges.registration}</strong></span>
                        </div>
                        <div className="row">
                            <span className="col-xs-6">Compulsory Insurance</span>
                            <span className="col-xs-6 price"><strong>${sidebar.drive_away_price.government_charges.compulsory_insurance}</strong></span>
                        </div>
                        <div className="row">
                            <span className="col-xs-6">Stamp duty</span>
                            <span className="col-xs-6 price"><strong>${sidebar.drive_away_price.government_charges.stamp_duty}</strong></span>
                        </div>
                        <div className="row">
                            <p>&nbsp;</p>
                        </div>
                    </div>
                      }
                  </div>
              </div>
              <div className="col-xs-12">
                  <p className="priceDisclaimer">{"Some information presented or used in the Drive-Away Price Calculator is sourced from third parties, and although every effort has been made to ensure that the information is accurate, absolute accuracy cannot be guaranteed. 1) Manufacturer's Retail Price (including GST). Vehicle price does not include Luxury Car Tax (LCT). 2) Dealer delivery charge (including GST) for Dealership specified, or, if no Dealership is specified, the average of dealer delivery charges (including GST) for the State or Territory of the post code entered. Individual Dealerships may charge more or less than the average dealer delivery charge. 3) Registration and/or Compulsory Insurance includes all relevant CTP and/or similar charges. For NSW and Queensland, where CTP varies according to insurer and nature of owner, the amount used for the calculation is based on rates charged by NRMA for a 40 year old male with a good driving record."}</p>
              </div>
          </section>
                    }
                </Panel.Body>
            </Panel>
        </section>
    );
};
*/

export default PanelInstance;
