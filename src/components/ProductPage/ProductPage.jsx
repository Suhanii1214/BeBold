import React, { useContext, useEffect } from 'react'
import Products from '../Products/Products'
import { Context } from '../../utils/context'
import { fetchDataFromApi } from '../../utils/api'
import FilterSection from './FilterSection/FilterSection'
import Sort from './Sort/Sort'
import { FilterContext } from '../../utils/filterContext'
import ProductList from './ProductList/ProductList'

import './ProductPage.scss'

const ProductPage = () => {

  return (
    <div className='wrapper'>
        <div className='filter-section'>
            <FilterSection/>
        </div>

        <div className='product-list-section'>
            <div><Sort/></div>
            <div>
                <ProductList/>
            </div>
        </div>   
    </div>
  )
}

export default ProductPage