import { combineReducers } from 'redux'

import {
    SELECT_MAKE,
    REQUEST_JSON,
    RECEIVE_JSON,
} from '../actions'

const selectedMake = (state = 1, action) => {
  console.log('selectedMake', action, state)
    switch (action.type) {
        case SELECT_MAKE:
            return action.make
        default:
            return state
    }
}


const make_json = (state = {
    isFetching: false,
    models: [],
    data: []
}, action) => {
    switch (action.type) {
        case REQUEST_JSON:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_JSON:
            return {
                ...state,
                isFetching: false,
                data: action.data,
                models: action.models
            }
        default:
            return state
    }
}

const postsByMake = (state = {}, action) => {
    console.log('postsByMake', state, action)
    switch (action.type) {
        case RECEIVE_JSON:
        case REQUEST_JSON:
            return {
                ...state,
                [action.make]: make_json(state[action.make], action)
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    postsByMake,
    selectedMake
})

export default rootReducer
