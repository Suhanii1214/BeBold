import React from 'react'
import './Category.scss'

const Category = ({handleFiltering}) => {
  return (
    <div className='main-container'>
        <h2 className='title'>Type</h2>

        <div >
            <label className='label-container'>
                <input onChange = {handleFiltering} type='radio' value="" name='test'/>
                <span className='checkmark'></span>
                All
            </label>
            <label className='label-container'>
                <input onChange={handleFiltering} value="mosturizer" type='radio' name='test'/>
                <span className='checkmark'></span>
                Mosturizer
            </label>
            <label className='label-container'>
                <input onChange={handleFiltering} value="serum" type='radio' name='test'/>
                <span className='checkmark'></span>
                Serum
            </label>
            <label className='label-container'>
                <input onChange={handleFiltering} value="shampoo" type='radio' name='test'/>
                <span className='checkmark'></span>
                Shampoo
            </label>
            <label className='label-container'>
                <input onChange={handleFiltering} value="conditioner" type='radio' name='test'/>
                <span className='checkmark'></span>
                Conditioner
            </label>
        </div>
    </div>
  )
}

export default Category