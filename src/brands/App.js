import React, {Component} from 'react';
import './App.css';
import {Field, reduxForm} from "redux-form";

const brands = {
    options : [
        {value : "alfaromeo" , name : "Alfa Romeo"},
        {value : "fiat" , name : "Fiat"},
        {value : "jeep" , name : "Jeep"},
        {value : "chrysler" , name : "Chrysler"},
    ]
};

const SelectComponent = props => {

    const {input: {onChange}, name} = props;
    return (
        <select id="brand" className="form-control" onChange={onChange} name={name}>
            <option value="select">Select</option>
            {brands.options.map(i => { return <option value={i.value}>{i.name}</option>   } )  }
        </select>
    )
};

let BrandForm = props => {

    const {handleSubmit} = props;

    return (
        <form onSubmit={handleSubmit}>
            <Field component={SelectComponent} name={"brand"}/>
        </form>

    )
};

BrandForm = reduxForm({form: 'brand' , destroyOnUnmount : false })(BrandForm);

class App extends Component {

    render() {
        return (
            <div className="container">
                <div className="text-center">Please choose brand name</div>
                <BrandForm
                    onChange={(values) => {
                        this.props.history.push(`/vpc/${values.brand}`)
                    }}
                />
            </div>
        )
    }
}


export default App;
