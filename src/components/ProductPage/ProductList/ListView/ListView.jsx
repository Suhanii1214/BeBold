import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../utils/context'
import Product from '../../../Products/Product/Product'
import { useNavigate } from 'react-router-dom'
import { fetchDataFromApi } from '../../../../utils/api'
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs'

import './ListView.scss'

const ListView = ({products}) => {
    const navigate = useNavigate()
    // const {filterProducts} = useContext(FilterContext)
    const [isInWishlist, setisInWishlist] = useState(false)

    const handleWishlistIcon = (e) => {
        e.stopPropagation();

        setisInWishlist(prev => !prev)
        // onWishlistToggle(id, !isInWishlist, data);
    }

  return (
    <div className='list-container'>
        <div>
            <div className='sec-heading'>Products</div>
            <div className='products'>
                {products?.data?.map(item => (
                    <div key={item.id} className="product-card" onClick={() => navigate("/product/" + item.id)}>
                        <div className='thumbnail'>
                            <img src={process.env.REACT_APP_DEV_URL + item.attributes.prodImage?.data[0]?.attributes.url} alt="product"/>
                        </div>
                        <div className='prod-details'>
                            <span className="name">{item.attributes.title}</span>
                            <div>
                            <span className='price'>&#8377;{item.attributes.price}</span>
                            {isInWishlist ? 
                                <span className="wishlist-filled-icon" onClick={handleWishlistIcon}>
                                    <BsSuitHeartFill size={25} color="#e2067f"/>
                                </span>
                                :
                                <span className="wishlist-icon" onClick={handleWishlistIcon}>
                                    <BsSuitHeart size={25}/>
                                </span>
                            }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ListView