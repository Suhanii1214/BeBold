import React, { useContext } from 'react'
import './FilterSection.scss'
import Select from "react-select"

const FilterSection = ({options, selectedOption, onChange, title, name}) => {
  return (
    <div className='main-container'>
      <h4 className='input-title'>{title}</h4>
      <Select
        className='input-container'
        name={name}
        options={options}
        value={selectedOption}
        onChange={onChange}
        isClearable
        getOptionValue={(option) => option.value} // Specify the property used as value
        getOptionLabel={(option) => option.label}
        placeholder="Select.."
      />
    </div>
  )
}

export default FilterSection