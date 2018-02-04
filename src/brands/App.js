import React, {Component} from "react";
import "./App.css";
import {Field, reduxForm} from "redux-form";
import PropTypes from "prop-types";

const brands = {
    options : [
        {value : "alfaromeo" , name : "Alfa Romeo"},
        {value : "fiat" , name : "Fiat"},
        {value : "jeep" , name : "Jeep"},
        {value : "chrysler" , name : "Chrysler"},
    ]
};

const SelectComponent = ({input: {onChange}, name}) => {

    return (
        <select id="brand" className="form-control" onChange={onChange} name={name}>
            <option value="select">Select</option>
            {brands.options.map((e,i) => { return <option key={i} value={e.value}>{e.name}</option>;   } )  }
        </select>
    );
};

SelectComponent.propTypes = {
    name : PropTypes.string.isRequired
};

let BrandForm = props => {

    const {handleSubmit} = props;

    return (
        <form onSubmit={handleSubmit}>
            <Field component={SelectComponent} name={"brand"}/>
        </form>

    );
};

BrandForm.propTypes = {
};

BrandForm = reduxForm({form: "brand" , destroyOnUnmount : false })(BrandForm);

class App extends Component {

    render() {
        return (
            <div className="container">
                <div className="text-center">Please choose brand name</div>
                <BrandForm
                    onChange={(values) => {
                        this.props.history.push(`/vpc/${values.brand}`);
                    }}
                />
            </div>
        );
    }
}

export default App;
