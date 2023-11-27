import React, { useContext, useState } from 'react'
import GridView from './GridView/GridView'
import ListView from './ListView/ListView'
import { Context } from '../../../utils/context'

const ProductList = ({products}) => {
    const {gridView} = useContext(Context)

  return (
    <div>
        {gridView ? <GridView products={products}/> : <ListView products={products}/>}
    </div>
  )
}

export default ProductList