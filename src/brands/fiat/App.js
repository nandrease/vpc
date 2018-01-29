import React, {Component} from 'react';
import PriceCalculator from '../../ui/price-calculator/PriceCalculator';
import './App.css';


class FiatApp extends Component {


    render() {
        return (
                <div className={this.props.brand.value}>
                    <PriceCalculator brand={this.props.brand}/>
                </div>
        )
    }
}


export default FiatApp;
