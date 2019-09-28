import React, { Component } from 'react';
import PriceCalculator from '../../ui/price-calculator/PriceCalculator';
import './App.css';
import PropTypes from 'prop-types';

class AlfaRomeoApp extends Component {
    render() {
        return (
            <div className={this.props.brand.value}>
                <PriceCalculator brand={this.props.brand} />
            </div>
        );
    }
}

AlfaRomeoApp.propTypes = {
    brand: PropTypes.shape({
        value: PropTypes.string
    })
};

export default AlfaRomeoApp;
