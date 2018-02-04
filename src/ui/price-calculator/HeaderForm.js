import React from "react";
import {connect} from "react-redux";
import {change, clearFields, Field, getFormValues, reduxForm} from "redux-form";
import {formatPrice} from "./util";
import InfoPanel from "../../components/InfoPanel";
import PropTypes from "prop-types";
import InformationIcon from "../../components/InformationIcon";

const validate = (values) => {

    const errors = {};

    if(!values.model){
        errors.model = "Please select model";
    }
    if(!values.transmission){
        errors.transmission = "Please select transmission";
    }
    if(!values.specification){
        errors.specification = "Please select specification";
    }
    if(!values.color){
        errors.color = "Please select colour and paint";
    }

    if(!values.postcode){
        errors.postcode = "Please enter postcode";
    }
    return errors;
};

const renderField = ({input, type, meta: {touched, error, warning}, placeholder}) => (
    <div>
        <div>
            <input {...input} placeholder={placeholder} type={type} className="form-control"/>
            {touched && ((error && <span className="text-danger error"> {error}</span>) || (warning &&
                <span>{warning}</span>))}
        </div>
    </div>
);

renderField.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string
};

const renderSelectField = ({input, defaultValue, meta: {touched, error, warning}, children, currentColor}) => (
    <div>
        <div>
            <select {...input} className="form-control" style={{color: currentColor}}>
                <option key="Select" value="" disabled="disabled" hidden={true}>Select</option>
                {children}
            </select>
            {touched && ((error && <span className="text-danger error"> {error}</span>) || (warning &&
                <span>{warning}</span>))}
            {defaultValue && !error && <span className="warning">Vehicle only available in {defaultValue}</span>}
        </div>
    </div>
);

renderSelectField.propTypes = {
    type: PropTypes.string,
    defaultValue: PropTypes.bool,
    currentColor: PropTypes.string
};

renderSelectField.defaultProps = {
    currentColor: "#999"
};


const renderSpecificationOptions = (props) => {

    if (props.selection && props.selection.model && props.models[props.selection.model]) {
        return props.models[props.selection.model]["model_configurations"]
            .filter(o => o.transmission === props.selection.transmission)
            .map((option, index) => <option key={index} value={index}>{option["model_name"]}</option>);
    }
    else return [].map((option, index) => <option key={index} value={index}>{index}</option>);
};

const selectionMade = (props) => {
    return props.selection && props.selection.model && props.models[props.selection.model] && props.models[props.selection.model]["model_configurations"][props.selection.specification];
};

const configuration = (props) => {
    if (selectionMade(props))
        return props.models[props.selection.model]["model_configurations"][props.selection.specification]["colors"];
    else
        return [];
};

const renderColorOptions = (props) => {

    if (props.selection && props.selection.model && props.models[props.selection.model] && props.models[props.selection.model]["model_configurations"][props.selection.specification]) {
        const types = props.models[props.selection.model]["model_configurations"][props.selection.specification]["colors"];
        return types.map((o, index) => {
            return <optgroup key={index}
                label={o.type + " " + (parseFloat(o["paint_cost"]) <= 0.0 ? "" : formatPrice(o["paint_cost"], "(+", ")"))}>{
                    o.palette.map((p, i) => <option value={p.name} key={i}>
                        {p.name}
                    </option>)

                }</optgroup>;

        });
    }
    else return [].map((option, index) => <option key={index} value={index}>{index}</option>);
};

renderColorOptions.propTypes = {
    models: PropTypes.shape({}),
    selection: PropTypes.shape({
        model: PropTypes.number,
        specification: PropTypes.number,
    })
};

let rendercount = 0 ;

const DefaultSelect = (props, option, defaultValue) => {
    if(rendercount++ === 0){
        props.dispatch(change("selection" , "transmission" , defaultValue));
    }
    class Renderer extends React.Component {
        render = () => {
            const {input, currentColor} = this.props;
            return (<div>
                <div>
                    <select {...input} disabled="disabled" className="form-control"
                        style={{color: currentColor}}>
                        {option}
                    </select>
                    <span className="warning">Vehicle only available in {defaultValue}</span>
                </div>
            </div>);
        }

    }

    return (
        <Field name="transmission" component={Renderer}
            onChange={() => {
                props.dispatch(change("pricebreakdown", "active", false));
                props.dispatch(change("colorpanel", "active", false));
                props.dispatch(clearFields("selection", false, false, "specification", "color", "priceinfo"));

            }}
            currentColor={props.selection && props.selection.transmission !== undefined ? "#000" : "#575757"}>
        </Field>
    );
};

DefaultSelect.propTypes = {
    selection: PropTypes.shape(
        {
            transmission: PropTypes.string
        }
    ),
    currentColor: PropTypes.string
};

const ListSelect = (props, options) => {
    return (
        <Field name="transmission" component={renderSelectField}
            onChange={() => {
                props.dispatch(change("pricebreakdown", "active", false));
                props.dispatch(change("colorpanel", "active", false));
                props.dispatch(clearFields("selection", false, false, "specification", "color", "priceinfo"));
            }}
            currentColor={props.selection && props.selection.transmission !== undefined ? "#000" : "#575757"}>
            {options}
        </Field>
    );
};

ListSelect.propTypes = {
    selection: PropTypes.shape(
        {
            transmission: PropTypes.string
        }
    ),
};

const renderTransmissionOptions = (props) => {

    if (props.selection && props.selection.model && props.models[props.selection.model] && props.models[props.selection.model]["model_configurations"]) {
        const options = [...new Set(props.models[props.selection.model]["model_configurations"].map(c => {
            return c.transmission;
        }))];
        if (options.length === 1) {
            return DefaultSelect(props, <option value={options[0]}>{options[0]}</option>, options[0]);
        }
        else {
            return ListSelect(props, options.map((option, index) => <option key={index}
                value={option}>{option}</option>));
        }
    }
    else {
        return ListSelect(props, [].map((option, index) => <option key={index} value={option}>{option}</option>));
    }
};

renderTransmissionOptions.propTypes = {
    models: PropTypes.shape(PropTypes.any),
    selection: PropTypes.shape(PropTypes.any)
};


const renderModelOptions = (props) => {
    if (props.models)
        return props.models.map((i, index) => <option key={index} value={index}>{i.model}</option>);
    else
        return [].map((i, index) => <option key={index} value={index}>{i.model}</option>);
};

renderModelOptions.propTypes = {
    models: PropTypes.arrayOf(PropTypes.shape({
        model_configurations: PropTypes.shape({
            transmission: PropTypes.string
        })
    }))
};

let HeaderForm = props => {
    const {handleSubmit} = props;
    return (
        <div className="container">
            <form className="row header-form" onSubmit={handleSubmit}>
                <div className="form-group col-sm-12 autosize-lg">
                    <div style={{width: "190px"}}>
                        <label className="control-label">{"I'm looking for this model"}</label>
                        <Field id={"model"} name="model" onChange={() => {
                            props.dispatch(change("pricebreakdown", "active", false));
                            props.dispatch(change("colorpanel", "active", false));
                            props.dispatch(clearFields("selection", false, false, "specification", "transmission", "color", "priceinfo"));
                            rendercount = 0;
                        }}
                        component={renderSelectField}
                        currentColor={props.selection && props.selection.model !== undefined ? "#000" : "#575757"}>
                            {renderModelOptions(props)}
                        </Field>
                    </div>
                </div>
                <div className="form-group col-sm-12 autosize-lg">
                    <div style={{width: "190px"}}>
                        <label className="control-label">And this transmission</label>
                        {renderTransmissionOptions(props)}
                    </div>
                </div>
                <div className="form-group col-sm-12 autosize-lg">
                    <div style={{width: "242px"}}>
                        <label className="control-label">With this specification</label>
                        <Field name="specification" onChange={() => {
                            props.dispatch(change("pricebreakdown", "active", false));
                            props.dispatch(change("colorpanel", "active", false));
                            props.dispatch(clearFields("selection", false, false, "color", "priceinfo"));

                        }}
                        component={renderSelectField}
                        currentColor={props.selection && props.selection.specification !== undefined ? "#000" : "#575757"}>
                            {renderSpecificationOptions(props)}
                        </Field>
                    </div>
                </div>
                <div className="form-group col-sm-12 autosize-lg color-form-group">
                    <div style={{width: "190px"}}>
                        <label className="control-label">In this colour and paint </label>
                        <InformationIcon onClick={() => {
                            props.dispatch(change("pricebreakdown", "active", false));
                            if (selectionMade(props)) {
                                props.dispatch(change("colorpanel", "active", true));
                            }
                            else {
                                props.dispatch(change("colorpanel", "active", false));
                            }
                        }}/>

                        <Field name="color" component={renderSelectField}
                            currentColor={props.selection && props.selection.color !== undefined ? "#000" : "#575757"}
                            onChange={() => {
                                props.dispatch(change("colorpanel", "active", false));
                                props.dispatch(change("pricebreakdown", "active", false));
                                props.dispatch(clearFields("selection", false, false, "priceinfo"));

                            }}
                        >
                            {renderColorOptions(props)}
                        </Field>
                    </div>
                </div>
                <div className="col col-sm-12 autosize-lg">
                    <div style={{width: "130px"}}>
                        <div className="form-group">
                            <label>My postcode is...</label>
                            <Field name="postcode" component={renderField} placeholder={"e.g. 2000"}
                                onChange={() => {
                                    props.dispatch(clearFields("selection", false, false, "priceinfo"));
                                }}
                                type="text"/>
                        </div>
                    </div>
                </div>
                <div className="col col-xs-2 autosize-lg">
                    <div style={{width: "172px"}}>
                        <button type="submit" className="btn btn-primary btn-block" onClick={() => {
                            props.dispatch(change("colorpanel", "active", false));
                            props.dispatch(change("pricebreakdown", "active", false));
                        }}>
                            Show me my quote
                        </button>
                    </div>
                </div>
            </form>
            <InfoPanel active={props.colorpanel.active} formKey={"colorpanel"}
                title="Color and paint options">
                {configuration(props).map((item, key) => (
                    <section key={key}>
                        <div className="col-sm-12">
                            <div className="color-type-title border-line">
                                <h4>{item.type} {item.paint_cost > 0 && formatPrice(item.paint_cost, "(+", ")")}</h4>
                            </div>
                        </div>
                        {item.palette.map((color, k) => (
                            <div className="col-sm-6" key={k} style={{}}>
                                <div className="color-item" onClick={() => {

                                    props.dispatch(change("selection", "color", color.name));
                                    props.dispatch(change("colorpanel", "active", false));

                                }} style={{"background": color.color, cursor: "pointer"}}/>
                                <p className="color-name text-center">{color.name}</p>
                            </div>
                        ))}
                    </section>
                ))}
            </InfoPanel>
        </div>
    );
};

HeaderForm.propTypes = {
    colorpanel: PropTypes.shape({
        active: PropTypes.bool
    }),
    selection: PropTypes.shape({
        model: PropTypes.string,
        color: PropTypes.any,
        transmission: PropTypes.string,
        specification: PropTypes.string
    })
};

HeaderForm = reduxForm({
    form: "selection",
    validate: validate,
    destroyOnUnmount: false
})(HeaderForm);
HeaderForm = connect(state => {
    return {
        selection: getFormValues("selection")(state),
        colorpanel: getFormValues("colorpanel")(state) || {active: false}
    };
})(HeaderForm);

export default HeaderForm;
