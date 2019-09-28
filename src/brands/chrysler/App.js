import React, { Component } from 'react';
import PriceCalculator from '../../ui/price-calculator/PriceCalculator';
import './App.css';
import PropTypes from 'prop-types';

class ChryslerApp extends Component {
    render() {
        return (
            <div className={this.props.brand.value}>
                <PriceCalculator brand={this.props.brand} />
            </div>
        );
    }
}

ChryslerApp.propTypes = {
    brand: PropTypes.objectOf({
        value: PropTypes.string
    })
};

export default ChryslerApp;
