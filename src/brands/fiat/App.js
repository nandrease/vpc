import React, {Component} from "react";
import PriceCalculator from "../../ui/price-calculator/PriceCalculator";
import "./App.css";
import PropTypes from "prop-types";


class FiatApp extends Component {


    render() {
        return (
            <div className={this.props.brand.value}>
                <PriceCalculator brand={this.props.brand}/>
            </div>
        );
    }
}

FiatApp.propTypes = {
    brand : PropTypes.shape({
        value : PropTypes.arrayOf
    })
};




export default FiatApp;
