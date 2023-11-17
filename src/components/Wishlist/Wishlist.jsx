import React, { useState } from 'react'
import Product from '../Products/Product/Product'

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([])

    const handleWishlistToggle = (productId, isInWishlist, productData) => {
        if(isInWishlist) {
            setWishlist((prevList) => prevList.filter((item) => item.id !== productId))
        } else {
            setWishlist((prevList) => [...prevList, {id: productId, data: productData}])
        }
    }

  return (
    <div>
        <h2>Your Wishlist</h2>
        {wishlist.length === 0 ?(
            <p>Your wishlist is empty</p>
           ) : (
            <ul>
                {wishlist.map((item) => (
                    <li>
                        <Product id={item.id} data={item.data} onWishlistToggle = {handleWishlistToggle}/>
                    </li>
                ))}
            </ul>
           )
        }
    </div>
  )
}

export default Wishlist