import React from 'react'
import './LuxeBrands.scss'

const LuxeBrands = ({luxeBrands}) => {

  return (
    <div className='main-container'>
        <h2 className='brand-heading'>Luxe Brands</h2>
            <div className='brands-container'>
            {luxeBrands?.data?.map((item) => (
            <div key={item.id} className='img-container'>
                <img src={process.env.REACT_APP_DEV_URL + item.attributes.luxeImage.data.attributes.url}/>
            </div>
            ))}
        </div>
    </div>
  )
}

export default LuxeBrands