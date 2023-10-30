import { useEffect, useState, useContext } from "react";
import {useNavigate} from 'react-router-dom'
import {HiUser, HiShoppingBag, HiChevronDown, HiChevronUp} from 'react-icons/hi'
import {TbSearch} from 'react-icons/tb'
import { getToken } from "../../utils/helper";

import  Search  from "./Search/Search";
import Cart from '../Cart/Cart'

import "./Header.scss";
import { Context } from "../../utils/context";
const Header = () => {
    const [scroll, setScroll] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const navigate = useNavigate()
    const { cartCount, showCart, setShowCart } = useContext(Context);

    const handleScroll = () => {
        const offset = window.scrollY;
        if(offset > 200) {
            setScroll(true)
        } else {
            setScroll(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
    }, [])

    return <>
    <header className={`main-header ${scroll ? 'sticky-header' : ''}`}>
        <div className="header-content">
            <div className="left">
            <div className="logo" onClick={() => navigate("/")}>BE:BOLD</div>
            <ul>
                <li>Brands</li>
                <li>Category</li>
                <li>Best Sellers</li>
            </ul>
            </div>
            <div className="center" onClick={() => setShowSearch(true)}>
                <input placeholder="Search"/>
                <TbSearch/>
            </div>
            <div className="right">
                <HiUser className="profile-icon" onClick={() => navigate('/login')}/>
                <span className="cart-icon" onClick={() => setShowCart(true)}>
                    <HiShoppingBag/>
                    {!!cartCount && <span>{cartCount}</span>}
                </span>
            </div>
        </div>
    </header>
    {showCart && <Cart setShowCart={setShowCart}/>}
    {showSearch && <Search setShowSearch={setShowSearch}/>}
    </>
};

export default Header;
