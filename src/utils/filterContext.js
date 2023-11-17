// filterContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { Context } from "./context";
import { fetchDataFromApi } from "./api";

export const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
    const { products, setProducts } = useContext(Context);
    const [filterProducts, setFilterProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [gridView, setGridView] = useState(true);
    const [sortingValue, setSortingValue] = useState("lowest");

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        sortingProducts()
    },[sortingValue, filterProducts])

    const getProducts = () => {
        fetchDataFromApi("/api/products?populate=*").then((res) => {
            console.log(res);
            setProducts(res);
            setFilterProducts(res);
            setAllProducts(res);
        });
    };

    const handleSorting = (event) => {
        const userSortValue = event.target.value
        console.log(userSortValue);
        setSortingValue(userSortValue);
    };

        const sortingProducts = () => {
            if(!filterProducts || !filterProducts.length) {
                return
            }
            let tempSortedData = [...filterProducts]
            let newSortedData;

            const sortingLogic = (a, b) => {
                for(let i=0;i<products.length;i++) {
                    if (sortingValue === "lowest") {
                        return a.data[i].attributes.price - b.data[i].attributes.price;
                    }
                    if (sortingValue === "highest") {
                        return b.data[i].attributes.price - a.data[i].attributes.price;
                    }
                    if (sortingValue === "a-z") {
                        return a.data[i].attributes.title.localeCompare(b.data[i].attributes.title);
                    }
                    if (sortingValue === "z-a") {
                        return b.data[i].attributes.title.localeCompare(a.data[i].attributes.title);
                    }
                }

                newSortedData = tempSortedData.sort(sortingLogic)
                setFilterProducts(newSortedData)
            }
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

