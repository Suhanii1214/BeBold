import React, { useContext } from 'react'
import { FilterContext } from '../../../utils/filterContext'
import Category from './Category/Category'
import Brands from './Brands/Brands'
import Price from './Price/Price'

const FilterSection = () => {

  const {handleFiltering} = useContext(FilterContext)

  return (
    <div>
        <Category handleFiltering = {handleFiltering}/>
        <Brands handleFiltering = {handleFiltering}/>
        <Price handleFiltering = {handleFiltering}/>
    </div>
  )
}

export default FilterSection