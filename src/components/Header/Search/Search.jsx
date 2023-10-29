import { MdClose } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from '../../../hooks/useFetch'
import prod from '../../../assets/productImages/conditioner.png'
import "./Search.scss";


const Search = ({setShowSearch}) => {
    const [query, setQuery] = useState("")
    const navigate = useNavigate()


    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    let {data} = useFetch(`/api/products?populate=*&filters[title][$contains]=${query}`);

    if(query.length) {
        data = null;
    }

    return <div className="search-modal">
        <div className="form-field">
            <input
                type="text"
                autoFocus
                value={query}
                onChange={handleChange}
                placeholder="Search for products"
            />
            <MdClose className="close-btn" onClick={() => setShowSearch(false)}/>
        </div>
        <div className="search-result-content">
            <div className="search-results">
            {data?.data?.map((item) => (
                <div key={item.id} className="search-result-item" onClick={() => {
                    navigate("/product/" + item.id)
                    setShowSearch(false)
                }}>
                <div className="img-container">
                    <img src={process.env.REACT_APP_STRIPE_APP_DEV_URL + item.attributes?.prodImage?.data[0]?.attributes.url} alt=""/>
                </div>
                <div className="prod-details">
                    <span className="name">{item.attributes.title}</span>
                    <span className="desc">{item.attributes.description}</span>
                </div>
                </div>
            ))}
            </div>
        </div>
    </div>;
};

export default Search;
