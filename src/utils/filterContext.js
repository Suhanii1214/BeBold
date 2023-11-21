// filterContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { Context } from "./context";
import { fetchDataFromApi } from "./api";

export const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
    const { setProducts } = useContext(Context);
    const [filterProducts, setFilterProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [gridView, setGridView] = useState(true);
    const [sortingValue, setSortingValue] = useState("lowest");

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        sortingProducts();
    }, [sortingValue, filterProducts]);

    const getProducts = () => {
        fetchDataFromApi("/api/products?populate=*").then((res) => {
            console.log(res);
            setProducts(res);
            setFilterProducts(res);
            setAllProducts(res);
        });
    };

    const handleSorting = (event) => {
        const order = event.target.value;
        console.log(order);
        setSortingValue(order);
    };

    const sortingProducts = () => {
        if (!filterProducts || !filterProducts.length) {
            return;
        }

        let newSortedData;

        const sortingLogic = (a, b) => {
            if (sortingValue === "lowest") {
                return a.attributes.price - b.attributes.price;
            }
            if (sortingValue === "highest") {
                return b.attributes.price - a.attributes.price;
            }
            if (sortingValue === "a-z") {
                return a.attributes.title.localeCompare(b.attributes.title);
            }
            if (sortingValue === "z-a") {
                return b.attributes.title.localeCompare(a.attributes.title);
            }
        };

        newSortedData = [...filterProducts].sort(sortingLogic);
        setFilterProducts(newSortedData);
    };

    return (
        <FilterContext.Provider
            value={{
                filterProducts,
                allProducts,
                gridView,
                sortingValue,
                setGridView: () => setGridView(true),
                setListView: () => setGridView(false),
                handleSorting,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};
