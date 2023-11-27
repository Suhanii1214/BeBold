import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../utils/context';
import { fetchDataFromApi } from '../../utils/api';
import FilterSection from './FilterSection/FilterSection';
import Sort from './Sort/Sort';
import ProductList from './ProductList/ProductList';

import './ProductPage.scss';

const ProductPage = () => {
  const { products, setProducts } = useContext(Context);
  const [filterType, setFilterType] = useState(null);
  const [filterBrand, setFilterBrand] = useState(null);
  const [filterPrice, setFilterPrice] = useState(null);
  const [sortBy, setSortBy] = useState(null)
  const [filteredProducts, setFilteredProducts] = useState();

  const sortingOptions = [
    { value: 'All', label: 'All' },
    { value: 'asc', label: 'Price Low to High'},
    { value: 'desc', label: 'Price High to Low'}
  ]

  const typeOptions = [
    { value: 'All', label: 'All' },
    { value: 'mosturizer', label: 'Mosturizer' },
    { value: 'serum', label: 'Serum' },
    { value: 'shampoo', label: 'Shampoo' },
    { value: 'conditioner', label: 'Conditioner' },
  ];

  const brandOptions = [
    { value: 'All', label: 'All' },
    { value: 'Loreal', label: 'Loreal' },
    { value: 'Dove', label: 'Dove' },
    { value: 'Minimalist', label: 'Minimalist' },
    { value: 'Maybelline', label: 'Maybelline' },
  ];

  const priceOptions = [
    { value: 'All', label: 'All' },
    { value: 499, label: '100-499' },
    { value: 999, label: '500-999' },
    { value: 1499, label: '1000-1499' },
    { value: 1999, label: '1500-1999' },
  ];

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetchDataFromApi('/api/products?populate=*');
        console.log(res);
        setProducts(res);
        setFilteredProducts(res);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getProducts();
  }, []);

  const handleChange = (selectedOption, action) => {
    console.log(action.name);
    console.log(selectedOption.value);
    if (action.name === 'type') {
      setFilterType(selectedOption.value === 'All' ? null : selectedOption.value);
  
      if (selectedOption.value === 'All') {
        fetchDataFromApi('/api/products?populate=*').then((res) => {
          setFilteredProducts(res);
        });
      } else {
        fetchDataFromApi(`/api/products?filters[type][$eq]=${selectedOption.value}&populate=*`).then((res) => {
          setFilteredProducts(res);
        });
      }
    }
  
    if (action.name === 'brand') {
      setFilterBrand(selectedOption.value === 'All' ? null : selectedOption.value);
  
      if (selectedOption.value === 'All') {
        fetchDataFromApi('/api/products?populate=*').then((res) => {
          setFilteredProducts(res);
        });
      } else {
        fetchDataFromApi(`/api/products?filters[brand][$eq]=${selectedOption.value}&populate=*`).then((res) => {
          setFilteredProducts(res);
        });
      }
    }
  
    if (action.name === 'price') {
      setFilterPrice(selectedOption.value === 'All' ? null : selectedOption.value);
  
      if (selectedOption.value === 'All') {
        fetchDataFromApi('/api/products?populate=*').then((res) => {
          setFilteredProducts(res);
        });
      } else {
        fetchDataFromApi(`/api/products?filters[price][$lte]=${selectedOption.value}&populate=*`).then((res) => {
          setFilteredProducts(res);
        });
      }
    }
  };

  const handleSorting = (selectedOption, action) => {
    console.log(action.name);
    console.log(selectedOption.value);
    if (selectedOption.value === 'All') {
      fetchDataFromApi('/api/products?populate=*').then((res) => {
        setFilteredProducts(res);
      });
    } else {
      fetchDataFromApi(`/api/products?sort[0]=price:${selectedOption.value}&populate=*`).then((res) => {
        console.log(res);
        setFilteredProducts(res)
      })
    }
  }
  
  return (
    <div className='wrapper'>
      <div className='filter-section'>
        <h3 className='filter-title'>Filter Menu</h3>
        <FilterSection title='Type' options={typeOptions} selectedOption={filterType} onChange={handleChange} name='type' />
        <FilterSection title='Brand' options={brandOptions} selectedOption={filterBrand} onChange={handleChange} name='brand' />
        <FilterSection title='Price' options={priceOptions} selectedOption={filterPrice} onChange={handleChange} name='price' />
      </div>

      <div className='product-list-section'>
        <div>
          <Sort
            options={sortingOptions}
            selectedOption={sortBy}
            onChange={handleSorting}
            name = "sortBy"
          />
        </div>
        <div>
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
