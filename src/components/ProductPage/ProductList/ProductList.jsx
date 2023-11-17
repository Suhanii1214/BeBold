import React, { useContext, useState } from 'react'
import { FilterContext } from '../../../utils/filterContext'
import GridView from './GridView/GridView'
import ListView from './ListView/ListView'

const ProductList = () => {
    const {filterProducts, gridView} = useContext(FilterContext)

  return (
    <div>
        {gridView ? <GridView products={filterProducts}/> : <ListView products={filterProducts}/>}
    </div>
  )
}

export default ProductList