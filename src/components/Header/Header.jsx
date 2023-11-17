import { useEffect, useState, useContext } from "react";
import {useNavigate} from 'react-router-dom'
import { BsSuitHeartFill } from "react-icons/bs";
import {HiUser, HiShoppingBag, HiChevronDown, HiChevronUp} from 'react-icons/hi'
import {TbSearch} from 'react-icons/tb'
import { getToken } from "../../utils/helper";

import  Search  from "./Search/Search";
import Cart from '../Cart/Cart'
import "./Header.scss";
import { Context } from "../../utils/context";
import BrandsPopoverMenu from "../Home/BrandsPopoverMenu/BrandsPopoverMenu";
import { fetchDataFromApi } from "../../utils/api";

const Header = () => {
    const [scroll, setScroll] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [showBrandsPopover, setShowBrandsPopover] = useState(false)
    const [brandsAnchorEl, setBrandsAnchorEl] = useState(null)
    const navigate = useNavigate()
    const { cartCount, showCart, setShowCart, brandsPopover, setBrandsPopover } = useContext(Context);

    const handleScroll = () => {
        const offset = window.scrollY;
        if(offset > 200) {
            setScroll(true)
        } else {
            setScroll(false)
        }
    }

    useEffect(() => {
        getBrandsPopover()
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
    }, [])

    const getBrandsPopover = () => {
        fetchDataFromApi("/api/brands?populate=*")
        .then(res => {
            console.log(res);
            setBrandsPopover(res)
        })
    }

    const handleBrandsPopoverOpen = (event) => {
        setBrandsAnchorEl(event.currentTarget)
        setShowBrandsPopover(true)
    }

    const handleBrandsPopoverClose = () => {
        setBrandsAnchorEl(null)
        setShowBrandsPopover(false)
    }

    return <>
    <header className={`main-header ${scroll ? 'sticky-header' : ''}`}>
        <div className="header-content">
            <div className="left">
            <div className="logo" onClick={() => navigate("/")}>BE:BOLD</div>
            <ul>
                <li
                    onMouseEnter={handleBrandsPopoverOpen}
                >
                    <div className="brand-list">
                        Brands
                        <HiChevronDown size={20}/>
                    </div>
                </li>
                <li onClick={() => navigate('/product-page')}>Products</li>
                <li>Best Sellers</li>
            </ul>
            </div>
            <div className="center" onClick={() => setShowSearch(true)}>
                <input placeholder="Search"/>
                <TbSearch/>
            </div>
            <div className="right">
                {getToken() ? 
                    <HiUser className="profile-icon" onClick={() => navigate('/profile')}/> 
                    : <span className="login-text" onClick={() => navigate('/login')}>Log In</span>}
                <span className="wishlist-icon" onClick={() => navigate('/wishlist')}>
                    <BsSuitHeartFill size={20}/>
                </span>
                <span className="cart-icon" onClick={() => setShowCart(true)}>
                    <HiShoppingBag/>
                    {!!cartCount && <span>{cartCount}</span>}
                </span>
            </div>
        </div>
    </header>
    {showCart && <Cart setShowCart={setShowCart}/>}
    {showSearch && <Search setShowSearch={setShowSearch}/>}
    <BrandsPopoverMenu
        brandsPopover={brandsPopover}
        anchorEl = {brandsAnchorEl}
        open = {showBrandsPopover}
        onClose = {handleBrandsPopoverClose}
    />
    </>
};

export default Header;
