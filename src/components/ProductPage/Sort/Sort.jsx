// Sort.js
import React, { useContext } from 'react'
import { BsFillGridFill, BsList } from 'react-icons/bs'

import './Sort.scss'
import { FilterContext } from '../../../utils/filterContext'

const Sort = () => {
    const { filterProducts, gridView, setGridView, setListView, handleSorting } = useContext(FilterContext);

    return (
        <div className='sort-section'>
            <div className='button-section'>
                <span
                    className={gridView ? "active layout-buttons" : "layout-buttons"}
                    onClick={setGridView}
                >
                    <BsFillGridFill />
                </span>
                <span
                    className={!gridView ? "active layout-buttons" : "layout-buttons"}
                    onClick={setListView}
                >
                    <BsList />
                </span>
            </div>
            <div className='product-data'>{`${filterProducts.length} Products Available`}</div>
            <div className='sorting-bar'>
                <form>
                    <label htmlFor='sort'></label>
                    <select name='sort' id='sort' onChange={handleSorting}>
                        <option value="lowest">Price Lowest to Highest</option>
                        <option value="#" disabled></option>
                        <option value="highest">Price Highest to Lowest</option>
                        <option value="#" disabled></option>
                        <option value="a-z">Price A-Z</option>
                        <option value="#" disabled></option>
                        <option value="z-a">Price Z-A</option>
                        <option value="#" disabled></option>
                    </select>
                </form>
            </div>
        </div>
    )
}

export default Sort;
