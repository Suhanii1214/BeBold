import RelatedProducts from "./RelatedProducts/RelatedProducts";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaPinterest,
    FaCartPlus,
} from "react-icons/fa";
import "./SingleProduct.scss";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../utils/context";

const SingleProduct = () => {
    const [quantity, setQuantity] = useState(1)
    const { id } = useParams()
    const { data } = useFetch(`/api/products?populate=*&[filters][id]=${id}`)
    const product = data?.data?.[0]?.attributes;
    const catName = product?.categories?.data[0]?.attributes?.categoryName
    const catId = product?.categories?.data[0]?.id

    const {handleAddToCart} = useContext(Context)

    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0,0)
    }, [location])

    const increment = () => {
        setQuantity((prevState) => prevState + 1)
    }

    const decrement = () => {
        setQuantity((prevState) => {
            if (prevState === 1) return 1
            return prevState - 1
        })
    }

    if (!data) return null; // Return null or loading indicator until data is available
    
    return (
        <div className="single-product-main-content">
            <div className="layout">
                <div className="single-product-page">
                    <div className="left">
                        <img src={process.env.REACT_APP_DEV_URL +
                            product.prodImage.data[0].attributes.url} />
                    </div>
                    <div className="right">
                        <span className="name">{product.title}</span>
                        <span className="price">&#8377;{product.price}</span>
                        <span className="desc">{product.description}</span>

                        <div className="cart-buttons">
                            <div className="quantity-buttons">
                                <span onClick={decrement}>-</span>
                                <span>{quantity}</span>
                                <span onClick={increment}>+</span>
                            </div>
                            <button className="add-to-cart-button" onClick={() => {
                                handleAddToCart(data?.data?.[0], quantity)
                                setQuantity(1)
                            }}>
                                <FaCartPlus size={20} />
                                ADD TO CART
                            </button>
                        </div>

                        <span className="divider" />

                        <div className="info-item">
                            <span className="text-bold">Category:{" "}
                                <span>{catName}</span>
                            </span>
                            <span className="text-bold">Share:
                                <span>
                                    <FaFacebookF size={16} />
                                    <FaTwitter size={16} />
                                    <FaInstagram size={16} />
                                    <FaLinkedinIn size={16} />
                                    <FaPinterest size={16} />
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                <RelatedProducts productId={id} categoryId={catId} />
            </div>
        </div>
    );
};

export default SingleProduct;
