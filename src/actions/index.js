export const SELECT_MAKE = 'SELECT_MODEL'
export const REQUEST_JSON = 'REQUEST_JSON'
export const RECEIVE_JSON = 'RECEIVE_JSON'
export const POPULATE_SPECIFICATION = 'POPULATE_SPECIFICATION'

export const selectMake = make => ({
    type: SELECT_MAKE,
    make
})

export const populateSpecification = specification_items => ({
    type: POPULATE_SPECIFICATION,
    specification_items
})

export const requestJson = make => ({
    type: REQUEST_JSON,
    make
})

export const receiveJson = (make, json) => ({
    type: RECEIVE_JSON,
    make,
    data: json.length ? Object.entries(json[0].models) : [],
    models: json.length ? Object.keys(json[0].models) : []
})

const fetchJson = selectedMake => dispatch => {
  dispatch(requestJson(selectedMake))
  let url = `https://api-test.fcaab.com.au/vpc/models?brandID=${selectedMake}`

  return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(receiveJson(selectedMake, json)))
}

const shouldFetchJson = (state, selectedMake) => {
    const models = state.postsByMake[selectedMake]
    if (!models) {
        return true
    }
    if (models.isFetching) {
        return false
    }
    return models.didInvalidate
}

export const fetchJsonIfNeeded = make => (dispatch, getState) => {
    if (shouldFetchJson(getState(), make)) {
        return dispatch(fetchJson(make))
    }
}
