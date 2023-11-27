import React, { useContext, useEffect } from 'react'
import Products from '../../../Products/Products'
import { Context } from '../../../../utils/context'
import { fetchDataFromApi } from '../../../../utils/api'

const GridView = ({products}) => {
    // const {filterProducts} = useContext(FilterContext)

  return (
    <div className='grid-section'>
        <div>
            <Products headingText="Products" products={products}/>
        </div>
    </div>
  )
}

export default GridView