import "./Product.scss";
import { useNavigate } from "react-router-dom";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { useState } from "react";

const Product = ({id, data, onWishlistToggle}) => {
    const [isInWishlist, setisInWishlist] = useState(false)
    const navigate = useNavigate()

    const handleWishlistIcon = (e) => {
        e.stopPropagation();

        setisInWishlist(prev => !prev)
        onWishlistToggle(id, !isInWishlist, data);
    }

    return <div className="product-card" onClick={() => navigate("/product/" + id)}>
        <div className="thumbnail">
            <img src={process.env.REACT_APP_DEV_URL + data.prodImage.data[0].attributes.url} alt="product"/>
        </div>
        <div className="prod-details">
            <span className="name">{data.title}</span>
            <div className="price-wishlist">
                <span className="price">&#8377;{data.price}</span>
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
    </div>;
};

export default Product;
