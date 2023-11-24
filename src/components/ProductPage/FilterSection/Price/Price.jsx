import React from 'react'
import './Price.scss'

const Price = ({handleFiltering}) => {
  return (
    <div className='main-container'>
        <h2 className='title'>Price</h2>

        <div >
            <label className='label-container'>
                <input onChange={handleFiltering} value="" type='radio' name='test2'/>
                <span className='checkmark'></span>
                All
            </label>
            <label className='label-container'>
                <input onChange={handleFiltering} value={499} type='radio' name='test2'/>
                <span className='checkmark'></span>
                &#8377;100-&#8377;499
            </label>
            <label className='label-container'>
                <input onChange={handleFiltering} value={999} type='radio' name='test2'/>
                <span className='checkmark'></span>
                &#8377;500-&#8377;999
            </label>
            <label className='label-container'>
                <input onChange={handleFiltering} value={1499} type='radio' name='test2'/>
                <span className='checkmark'></span>
                &#8377;1000-&#8377;1499
            </label>
            <label className='label-container'>
                <input onChange={handleFiltering} value={1999} type='radio' name='test2'/>
                <span className='checkmark'></span>
                &#8377;1500-&#8377;1999
            </label>
            <label className='label-container'>
                <input onChange={handleFiltering} value={2499} type='radio' name='test2'/>
                <span className='checkmark'></span>
                &#8377;2000-&#8377;2499
            </label>
        </div>
    </div>
  )
}

export default Price