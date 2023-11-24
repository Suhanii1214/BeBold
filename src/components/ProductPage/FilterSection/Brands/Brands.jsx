import React from 'react'
import './Brands.scss'

const Brands = ({handleFiltering}) => {
  return (
    <div className='main-container'>
        <h2 className='title'>Brands</h2>

        <div >
            <label className='label-container'>
                <input onChange={handleFiltering} value="" type='radio' name='test1'/>
                <span className='checkmark'></span>
                All
            </label>
            <label className='label-container'>
                <input onChange={handleFiltering} value="Dove" type='radio' name='test1'/>
                <span className='checkmark'></span>
                Dove
            </label>
            <label className='label-container'>
                <input onChange={handleFiltering} value="Loreal" type='radio' name='test1'/>
                <span className='checkmark'></span>
                Loreal
            </label>
            <label className='label-container'>
                <input onChange={handleFiltering} value="Minimalist" type='radio' name='test1'/>
                <span className='checkmark'></span>
                Minimalist
            </label>
            <label className='label-container'>
                <input onChange={handleFiltering} value="Maybelline" type='radio' name='test1'/>
                <span className='checkmark'></span>
                Maybelline
            </label>
        </div>
    </div>
  )
}

export default Brands