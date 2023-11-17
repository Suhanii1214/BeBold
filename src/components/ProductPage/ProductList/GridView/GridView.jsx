import React, { useContext, useEffect } from 'react'
import Products from '../../../Products/Products'
import { Context } from '../../../../utils/context'
import { fetchDataFromApi } from '../../../../utils/api'
import { FilterContext } from '../../../../utils/filterContext'

const GridView = () => {
    const {filterProducts} = useContext(FilterContext)

  return (
    <div className='grid-section'>
        <div>
            <Products headingText="Products" products={filterProducts}/>
        </div>
    </div>
  )
}

export default GridView