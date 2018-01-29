import React from 'react';
import { connect } from 'react-redux';
import {change, Field, getFormValues, reduxForm} from 'redux-form';
import { formatPrice } from "./util";
import InfoPanel from '../../components/InfoPanel';


const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
    <div>
      <div>
        <input {...input} placeholder='Select' type={type} className="form-control" />
        {touched && ((error && <span className="text-danger error"> {error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
);

const renderSelectField = ({input, label, type, defaultValue, meta: {touched, error, warning}, children}) => (
    <div>
        <div>
            <select {...input} className="form-control" disabled={defaultValue}>
                {!defaultValue && <option key="Select" value="Select">Select</option>}
                {children}
            </select>
            {touched && ((error && <span className="text-danger error"> {error}</span>) || (warning && <span>{warning}</span>))}
            {defaultValue && !error && <span className="warning">Vehicle only available in {defaultValue}</span>}
        </div>
    </div>
);


const renderSpecificationOptions = (props) => {

    if (props.selection && props.selection.model && props.models[props.selection.model]) {
        return props.models[props.selection.model]['model_configurations']
            .map((option, index) => <option key={index} value={index}>{option['model_name']}</option>);
    }
    else return [].map((option, index) => <option key={index} value={index}>{index}</option>)
};

const renderColorOptions = (props) => {

    if (props.selection && props.selection.model && props.models[props.selection.model] && props.models[props.selection.model]['model_configurations'][props.selection.specification]) {
        const types = props.models[props.selection.model]['model_configurations'][props.selection.specification]['colors'];
        return types.map((o, index) => {
            return <optgroup key={index} label={o.type + " " + ( parseFloat(o['paint_cost']) <= 0.0 ? "" : formatPrice(o['paint_cost'])) }>{
                o.palette.map((p, i) => <option value={p.name} key={i}>
                    {p.name}
                </option>)

            }</optgroup>

        })
    }
    else return [].map((option, index) => <option key={index} value={index}>{index}</option>)
};

const renderTransmissionOptions = (props) => {

    if (props.selection && props.selection.model && props.models[props.selection.model] && props.models[props.selection.model]['model_configurations']) {
        if (props.models[props.selection.model]['model_configurations'].transmission === undefined)
            return ['Automatic'].map((option, index) => <option key={index} value={index}>{option}</option>);
        else
            return [props.models[props.selection.model]['model_configurations'].transmission].map((option, index) =>
                <option key={index} value={index}>{option}</option>);
    }
    else {
        return [].map((option, index) => <option key={index} value={index}>{index}</option>);
    }
};

const destroyOptions = (props, options = []) => {
    options.forEach(o => props.dispatch(change('selection', o, [])));
};

const renderModelOptions = (props) => {
    if (props.models)
        return props.models.map((i, index) => <option key={index} value={index}>{i.model}</option>);
    else
        return [].map((i, index) => <option key={index} value={index}>{i.model}</option>);
};

let HeaderForm = props => {
    let sidebarProps = {
        position: 'right',
        isActive: false,
        panelWidth: '420px',
        "colors": [{
            "type": "Solid",
            "paint_cost": "0.0",
            "palette": [
                {
                    "id": 3,
                    "name": "Alfa Red",
                    "color": "#9e3036",
                    /*"url": "http://assets.fcaab.com.au/<something>/giulia-25e59c8c25b768e84eef467cc279a39c.png"*/ // car image url is logically part of this color block, but url not actually needed at this time
                }]
        },
            {
                "type": "Metallic",
                "paint_cost": "500.0",
                "palette": [
                    {
                        "id": 4,
                        "name": "Vulcano Black",
                        "color": "#020304",
                        /*"url": "http://s3-ap-southeast-2.amazonaws.com/assets-public/alfaromeo-com-au_assets/header/cars/giulia-25e59c8c25b768e84eef467cc.png"*/
                    },
                    {
                        "id": 4,
                        "name": "Silverstone Grey",
                        "color": "#8d8e8b",
                        /* "url": "http://s3-ap-southeast-2.amazonaws.com/assets-public/alfaromeo-com-au_assets/header/cars/giulia-25e59c8c25b768e84eef467cc279a39a.png" */
                    },
                    {
                        "id": 11,
                        "name": "Montecarlo Blue",
                        "color": "#15294c",
                        /* "url": "http://s3-ap-southeast-2.amazonaws.com/assets-public/alfaromeo-com-au_assets/header/cars/giulia-25e59c8c25b768e84eef467cc279a39b.png" */
                    },
                    {
                        "id": 11,
                        "name": "Vesuvio Grey",
                        "color": "#4b4a4a",
                        /* "url": "http://s3-ap-southeast-2.amazonaws.com/assets-public/alfaromeo-com-au_assets/header/cars/giulia-25e59c8c25b768e84eef467cc279a39b.png" */
                    }]
            },
            {
                "type": "Tri-Coat",
                "paint_cost": "1000.0",
                "palette": [
                    {
                        "id": 11,
                        "name": "Competizione Red",
                        "color": "#aa2335",
                        /* "url": "http://s3-ap-southeast-2.amazonaws.com/assets-public/alfaromeo-com-au_assets/header/cars/giulia-25e59c8c25b768e84eef467cc279a39b.png" */
                    },
                    {
                        "id": 12,
                        "name": "Trofeo White",
                        "color": "#d9dddf",
                        /* "url": "http://s3-ap-southeast-2.amazonaws.com/assets-public/alfaromeo-com-au_assets/header/cars/giulia-25e59c8c25b768e84eef467cc279a39d.png" */
                    }]
            }]
    };
    const {handleSubmit} = props;

    return (
        <div className="container">
            <form className="row header-form" onSubmit={handleSubmit}>
                <div className="form-group col-sm-12 autosize-lg">
                    <div style={{width: "190px"}}>
                        <label className="control-label">I'm looking for this model</label>
                        <Field name="model" onChange={() => {destroyOptions(props, ['specification', 'transmission', 'color' , 'priceinfo']);}}
                               component={renderSelectField}>
                            {renderModelOptions(props)}
                        </Field>
                    </div>
                </div>
                <div className="form-group col-sm-12 autosize-lg">
                    <div style={{width: "242px"}}>
                        <label className="control-label">With this specification</label>
                        <Field name="specification" onChange={() => {destroyOptions(props, [ 'transmission', 'color' ,'priceinfo'])}}
                               component={renderSelectField}>
                            {renderSpecificationOptions(props)}
                        </Field>
                    </div>
                </div>
                <div className="form-group col-sm-12 autosize-lg">
                    <div style={{width: "190px"}}>
                        <label className="control-label">And this transmission</label>
                        <Field name="transmission" component={renderSelectField}>
                            {renderTransmissionOptions(props)}
                        </Field>
                    </div>
                </div>
                <div className="form-group col-sm-12 autosize-lg color-form-group">
                    <div style={{width: "190px"}}>
                        <label className="control-label">In this colour and paint </label><i className="color-info"/>
                        <Field name="color" component={renderSelectField}>
                            onChange={() => {destroyOptions(props, [ 'priceinfo' ])}}
                            {renderColorOptions(props)}
                        </Field>
                    </div>
                </div>
                <div className="col col-sm-12 autosize-lg">
                    <div style={{width: "130px"}}>
                        <div className="form-group">
                            <label>My postcode is...</label>
                            <Field name="postcode" component={renderField}
                                   onChange={() => {destroyOptions(props, [ 'priceinfo' ])}}
                                   type="Number"/>
                        </div>
                    </div>
                </div>
                <div className="col col-xs-2 autosize-lg">
                    <div style={{width: "172px"}}>
                        <button type="submit" className="btn btn-primary btn-block">
                            Show me my quote
                        </button>
                    </div>
                </div>
            </form>
            <InfoPanel sidebar={sidebarProps} title="Color and paint options" />
        </div>
    )
};

HeaderForm = reduxForm({
    form: 'selection',
    validate: (values, dispatch) => {
        return {}
    },
    destroyOnUnmount: false
})(HeaderForm);
HeaderForm = connect(state => {
    return {
        selection: getFormValues('selection')(state)
    }
})(HeaderForm);

export default HeaderForm;
