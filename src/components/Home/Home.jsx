import Category from "./Category/Category";
import Products from "../Products/Products";
import Banner from "./Banner/Banner";
import { useEffect, useContext } from "react";
import { fetchDataFromApi } from "../../utils/api";
import {Context} from "../../utils/context";

import "./Home.scss";
import LuxeBrands from "./LuxeBrands/LuxeBrands";
const Home = () => {

    const {categories, setCategories, products, setProducts, luxeBrands, setLuxeBrands} = useContext(Context)

    useEffect(() => {
        getCategories()
        getLuxeBrands()
        getProducts()
    }, [])

    const getCategories = () => {
        fetchDataFromApi("/api/categories?populate=*")
        .then(res => {
            console.log(res)
            setCategories(res)
        })
    }
    
    const getLuxeBrands = () => {
        fetchDataFromApi("/api/luxe-brands?populate=*")
        .then(res => {
            console.log(res)
            setLuxeBrands(res)
        })
    }

    const getProducts = () => {
        fetchDataFromApi("/api/products?populate=*")
        .then(res => {
            console.log(res)
            setProducts(res)
        })
    }

    return <div className="home">
        <Banner/>
        <div className="main-content">
            <div className="layout">
                <Category categories={categories}/>
                <Products products={products} headingText="Popular Products"/>
                <LuxeBrands luxeBrands={luxeBrands}/>
            </div>
        </div>
    </div>;
};

export default Home;
