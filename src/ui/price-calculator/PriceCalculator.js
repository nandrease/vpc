import React from 'react';
import HeaderFrom from './HeaderForm';
import BodyComponent from './BodyComponent';
import './PriceCalculator.css'
import fetch from "isomorphic-fetch"
import {connect} from "react-redux";
import {change, getFormValues} from "redux-form";
import loadPriceResult from "../../resources/example-price-result"
import scrollIntoViewIfNeeded from "scroll-into-view-if-needed/dist/index";
import ReactDOM from "react-dom";

const formatPrice = (amount) => {
    const formatter = Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
        minimumFractionDigits: 2,
    });

    return formatter.format(amount)
}

const styles = {
    center: {
        textAlign: 'center'
    },
    header: {
        backgroundColor: '#000',
        padding: '39px 0 50px',
        color: '#fff'
    }
};

class PriceCalculator extends React.Component {


    loadHTTPData = (brandid) => {
        return fetch(`https://api-dev.fcaab.com.au/vpc/models?brandID=${this.props.brand.id}`)
            .then((response) => {if (response.ok) {return response.json()}}, (error) => {})
    };

    componentDidMount = () => {
        this.loadHTTPData(this.props.brand.id)
            .then(response => {
            const responseModel = response[0].models;
            let keys = Object.keys(responseModel);
            const models = [];
            keys.forEach(k => {
                models.push({
                    model : k,
                    model_configurations : responseModel[k]['model_configurations']
                })
            });
            this.props.dispatch(change('brand' , 'models' , models  ))
        } );

    };

    render() {
        const serverResponse = (this.props.selection && this.props.selection.priceinfo && this.props.selection.priceinfo.loaded)
        return (
            <div className="container-full" style={styles.body}>
                <h1 className="text-center main-header">PRICE CALCULATOR</h1>
                <div className="headerRow container-full" style={styles.header}>
                    <HeaderFrom
                        priceFormater={(e) => formatPrice(e)}
                        onSubmit={(values, dispatch, props) => {
                            const modelId = props.models[props.selection.model]['model_configurations'][props.selection.specification]['model_id'];
                            return loadPriceResult(modelId)
                                .then(result => {dispatch(change('selection' , 'priceinfo' , Object.assign({} , result , { loaded : true })));
                                }, error => {});
                        }}
                        onSubmitFail={(errors, dispatch, submitError, props) => {
                        }}
                        onSubmitSuccess={(values, dispatch, props) => {
                            if(this._sivNode)
                                scrollIntoViewIfNeeded(ReactDOM.findDOMNode(this._sivNode), false , {duration: 150});
                        }}
                        models={this.props.models}/>
                </div>
                <div className="container-full main">
                    {!serverResponse && <h3 className="text-center">CHOOSE YOUR VEHICLE</h3>}
                    {serverResponse && <BodyComponent priceFormater={formatPrice} ref={(node) => { this._sivNode = node}} info={Object.assign({} , this.props.models[this.props.selection.model]['model_configurations'][this.props.selection.specification] , this.props.selection.priceinfo)}/>}
                </div>
            </div>
        );
    }
}

PriceCalculator = connect(state => {
    const brand = getFormValues('brand')(state) || { models : [] };
    return {
        models : brand.models,
        selection : getFormValues('selection')(state)
    }
})(PriceCalculator);

export default PriceCalculator;
