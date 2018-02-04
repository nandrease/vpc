import React from "react";
import ReactDOM from "react-dom";
import {combineReducers, createStore} from "redux";
import {HashRouter, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import App from "./brands/App";
import AlfaRomeoApp from "./brands/alfa-romeo/App";
import FiatApp from "./brands/fiat/App";
import JeepApp from "./brands/jeep/App";
import ChryslerApp from "./brands/chrysler/App";
import {reducer as formReducer} from "redux-form";

const rootReducer = combineReducers({
    form : formReducer,
});


const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

);

window.store = store;

const brands = {
    alfa: {
        value: "alfaromeo",
        id: [7],
        division : "7"
    },
    chrysler: {
        value: "chrysler",
        id: [3],
        division : "9"
    },
    fiat: {
        value: "fiat",
        id: [8],
        division : "2"
    },
    jeep: {
        value: "jeep",
        id: [1],
        division : "1"
    }
};

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/vpc/alfaromeo' render={() => <AlfaRomeoApp brand={brands.alfa}/> } site="vpc"/>
                <Route path='/vpc/fiat' render={() => <FiatApp brand={brands.fiat}/> }/>
                <Route path='/vpc/chrysler' render={() => <ChryslerApp brand={brands.chrysler}/>}/>
                <Route path='/vpc/jeep' render={() => <JeepApp brand={brands.jeep}/> }/>
                <Route path="*" component={App} />
            </Switch>
        </HashRouter>
    </Provider>
    , document.getElementById("root"));
registerServiceWorker();
