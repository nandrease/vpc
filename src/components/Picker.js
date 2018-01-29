import React from 'react'
import PropTypes from 'prop-types'

const Picker = ({value, onChange, options}) => (
    <span>
    <select onChange={e => onChange(e.target.value)}
            value={value}
            className="form-control">
      {options.map(option =>
          <option value={option} key={option}>
              {option}
          </option>)
      }
    </select>
  </span>
)

Picker.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default Picker
