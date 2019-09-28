import React from 'react';
import HeaderFrom from './HeaderForm';
import BodyComponent from './BodyComponent';
import './PriceCalculator.css';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { change, getFormValues } from 'redux-form';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-undef
const REACT_APP_API_HOST = process.env.REACT_APP_API_HOST;

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
    loadPriceResult = (modelId, postcode, division) => {
        return fetch(
            encodeURI(`${REACT_APP_API_HOST}/vpc/price?postcode=${postcode}&modelid=${modelId}&divisionid=${division}`),
            {
                method: 'GET',
                headers: Object.assign(
                    {},
                    {
                        Accept: '*/*',
                        'Content-Type': 'application/json'
                    },
                    {}
                )
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return [ {} ];
                }
            })
            .then((json) => {
                return json[0];
            });
    };

    loadHTTPData = () => {
        return fetch(
            encodeURI(`${REACT_APP_API_HOST}/vpc/models?brandid=[${this.props.brand.id}]`)
        ).then((response) => {
            if (response.ok) {
                return response.json();
            }
        });
    };

    componentDidMount = () => {
        this.loadHTTPData(this.props.brand.id).then((response) => {
            const models = [];
            response.forEach((i) => {
                const responseModel = i.models;
                let keys = Object.keys(responseModel);
                keys.forEach((k) => {
                    models.push({
                        model: k,
                        model_configurations: responseModel[k]['model_configurations']
                    });
                });
            });
            this.props.dispatch(change('brand', 'models', models));
        });
    };

    render = () => {
        const serverResponse =
            this.props.selection && this.props.selection.priceinfo && this.props.selection.priceinfo.loaded;
        const division = this.props.brand.division;
        return (
            <div className="container-full" style={{ backgroundColor: '#e7e7e7' }}>
                <h1 className="text-center main-header">PRICE CALCULATOR</h1>
                <div className="headerRow container-full" style={styles.header}>
                    <HeaderFrom
                        onSubmit={(values, dispatch, props) => {
                            const modelId =
                                props.models[props.selection.model]['model_configurations'][
                                    props.selection.specification
                                ]['id'];
                            return this.loadPriceResult(modelId, values.postcode, division).then((result) => {
                                dispatch(change('selection', 'priceinfo', Object.assign({}, result, { loaded: true })));
                            });
                        }}
                        onSubmitFail={() => {}}
                        onSubmitSuccess={() => {
                            if (this._sivNode)
                                scrollIntoViewIfNeeded(ReactDOM.findDOMNode(this._sivNode), false, { duration: 150 });
                        }}
                        models={this.props.models}
                    />
                </div>
                <div className="container-full main">
                    {!serverResponse && <h3 className="text-center">CHOOSE YOUR VEHICLE</h3>}
                    {serverResponse && (
                        <BodyComponent
                            ref={(node) => {
                                this._sivNode = node;
                            }}
                            make={this.props.models[this.props.selection.model].model}
                            info={Object.assign(
                                {},
                                this.props.models[this.props.selection.model]['model_configurations'][
                                    this.props.selection.specification
                                ],
                                this.props.selection.priceinfo
                            )}
                        />
                    )}
                </div>
            </div>
        );
    };
}

PriceCalculator = connect((state) => {
    const brand = getFormValues('brand')(state) || { models: [] };
    return {
        models: brand.models,
        selection: getFormValues('selection')(state) || { model: -1 }
    };
})(PriceCalculator);

PriceCalculator.propTypes = {
    models: PropTypes.arrayOf(PropTypes.any),
    brand: PropTypes.shape({
        division: PropTypes.string,
        id: PropTypes.arrayOf(PropTypes.number),
        models: PropTypes.arrayOf(PropTypes.any)
    }),
    selection: PropTypes.shape({
        model: PropTypes.any,
        specification: PropTypes.any,
        priceinfo: PropTypes.any
    })
};

export default PriceCalculator;
